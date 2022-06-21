/* eslint-disable linebreak-style */
import {css, html, LitElement} from 'lit-element';
import {isIE11} from '../../shared/utility';
import styles from './styles-css';
import '../status-flight-container';
import '@alaskaairux/auro-button';

class StatusAScomAdapter extends LitElement {
  static get properties() {
    return {
      model: {type: Object},
      minifiedModel: {type: Object},
    };
  }

  constructor() {
    super();
  }
  async firstUpdated() {
    this.unMarshal();
  }


  unMarshal() {
    this.minifiedModel = [];
    this.model.JourneyOptions.map((leg) => {
      const sliceList = [];

      leg.Slices[0].Segments.forEach((seg) => {
        sliceList.push({
          flightNumber: seg.DisplayFlightNumber,
          carrier: seg.DisplayCarrierInfo.Code,
          duration: this.formatDuration(seg.Duration),
          departureDay: this.formatDay(seg.DepartureDateTime),
          arrivalDay: this.formatDay(seg.DepartureDateTime),
          departureDate: this.formatDate(seg.DepartureDateTime),
          arrivalDate: this.formatDate(seg.ArrivalDateTime),
          departureStation: seg.DepartureStation.Code,
          arrivalStation: seg.ArrivalStation.Code,
          legs: seg.Legs,
        });
      });
      this.minifiedModel.push(sliceList);
    });
  }

  formatDay(str) {
    const day = str.split('T')[0];
    return day;
  }

  formatDate(str) {
    const time = str.split('T')[1].split(':');
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }

  formatDuration(duration) {
    const dur = duration.split(':');
    if (dur[0].split('.').length > 1) {
      return (
        parseInt(dur[0].split('.')[0]) * 24 +
        parseInt(dur[0].split('.')[1]) +
        'h ' +
        dur[1] +
        'm'
      );
    } else {
      if (dur[0] + 'h' === '00h') {
        return dur[1] + 'm';
      } else if (dur[0][0] === '0') {
        return dur[0][1] + 'h ' + dur[1] + 'm';
      }
      return dur[0] + 'h ' + dur[1] + 'm';
    }
  }

  static get styles() {
    return css`
        ${styles}
    `;
  }

  createRenderRoot() {
    if (isIE11()) {
      /**
       * Render template without shadow DOM for IE. Note that shadow DOM features like
       * encapsulated CSS and slots are unavailable.
       */
      return this;
    }
    return super.createRenderRoot();
  }

  render() {
    return html`
        ${this.minifiedModel? this.minifiedModel.map((flight) => html`
            <status-flight-container 
                flights=${flight.length > 1 ? ['1', '2'] : [`AS ${flight[0].flightNumber}`]}
                slice=${JSON.stringify(flight)}
                duration=${' '}
                departureStation=${flight[0].departureStation}
                arrivalStation=${flight[flight.length - 1].arrivalStation}
                departureTime=${flight[0].departureDate}
                arrivalTime=${flight[flight.length - 1].arrivalDate}
            ></status-flight-container>
        `) : html``}
    `;
  }
}

if (!customElements.get('status-ascom-adapter')) {
  customElements.define('status-ascom-adapter', StatusAScomAdapter);
}
