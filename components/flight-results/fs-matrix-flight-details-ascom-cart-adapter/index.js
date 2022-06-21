import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../fs-matrix-flight-details';
import '@alaskaairux/auro-interruption/dist/auro-dialog';
/**
 * Takes the outModel from the FlightsController and marshalls it into something reasonable
 */
class FSMatrixFlightDetailsASComCartAdapter extends LitElement {
  static get properties() {
    return {
      model: {type: Object},
      minifiedModel: {type: Array, reflect: true},
    };
  }

  static get styles() {
    return css`
      :host {
        font-size: 16px;
      }
    `;
  }
  async firstUpdated() {
    this.unMarshal();
  }

  unMarshal() {
    this.minifiedModel = [];
    this.minifiedModel = this.formatSegments(this.model);
  }

  formatSegments(segment) {
    const result = [
      {
        Carrier: segment.DisplayCarrierInfo.Code,
        FlightNumber: segment.DisplayFlightNumber,
        DepartureStation: segment.DepartureStation.Code,
        ArrivalStation: segment.ArrivalStation.Code,
        Duration: this.formatDuration(segment.Duration),
        Distance: segment.Distance,
        DepartureTime: this.formatDate(segment.DepartureDateTime),
        ArrivalTime: this.formatDate(segment.ArrivalDateTime),
        DepartureDay: this.formatDay(segment.DepartureDateTime),
        ArrivalDay: this.formatDay(segment.ArrivalDateTime),
        NextDayArrival: segment.IsNextDayArrival,
        NextDayDeparture: segment.IsNextDayDeparture,
        Performance: segment.Legs,
        SubjectToGovernmentApproval: Boolean(segment.SubjectToGovernmentApproval),
        StopoverInformation: this.formatStopoverInformation(segment.StopOverInformation),
        OperationalDisclosures: [segment.OperatedByInformation.replaceAll(/<!--(.*?)-->/gm, '')],
        Equipment: segment.Legs[0].EquipmentCode,
        FirstClassUpgradeAvailable: Boolean(
            segment.Upgrades.find(
                (upgrade) =>
                  (upgrade.UpgradeTier == 1 ||
                upgrade.UpgradeTier == 'FirstClass') &&
              (upgrade.Eligible == 2 || upgrade.Eligible == 'Yes') &&
              (upgrade.Available == 2 || upgrade.Available == 'Yes'),
            ),
        ),
        FirstClassUpgradeUnavailable: Boolean(
            segment.Upgrades.find(
                (upgrade) =>
                  (upgrade.UpgradeTier == 1 ||
                upgrade.UpgradeTier == 'FirstClass') &&
              (upgrade.Eligible == 2 || upgrade.Eligible == 'Yes') &&
              (upgrade.Available == 1 || upgrade.Available == 'No'),
            ),
        ),
        Amenities: this.formatAmenities(
            segment.WifiImage,
            segment.InSeatPowerImage,
            segment.InFlightEntertainmentImage,
        ),
      },
    ];
    return result;
  }

  formatAmenities(wifi, power, ife) {
    const result = [];
    if (wifi.FullName !== 'onsite/icons/.ashx') {
      result.push('wifi');
    }
    if (power.FullName !== 'onsite/icons/.ashx') {
      result.push('power');
    }
    if (ife.FullName !== 'onsite/icons/.ashx') {
      result.push('ife');
    }
    return result;
  }

  formatOperationalDisclosures(segment, footnotes) {
    const test = /\d{3,4}/g;
    const flightNumber = segment.DisplayFlightNumber;
    const returns = [];
    footnotes.forEach((footnote) => {
      const results = footnote.Item1.match(test);
      results.map((result) => {
        if (result == flightNumber) {
          returns.push('Operated by ' + footnote.Item2);
        }
      });
    });
    return returns;
  }

  formatStopoverInformation(str) {
    const test = /([0-9])\w+/g;
    const result = [];
    for (const str of str.matchAll(test)) {
      result.push(str[0]);
    }
    return result;
  }

  formatDuration(duration) {
    let chunkDuration = '';
    if (duration.Hours == '0') {
      chunkDuration += '00h';
    } else {
      if (duration.Hours < 10) {
        chunkDuration += '0';
      }
      chunkDuration += duration.Hours + 'h';
    }
    chunkDuration += ' ' + duration.Minutes + 'm';

    return chunkDuration;
  }

  formatDate(str) {
    const time = new Date(parseInt(str.substring(6, str.length - 2)));
    return time.toLocaleTimeString('en-US', {timeZone: 'America/Los_Angeles', timeStyle: 'short'});
  }

  formatDay(str) {
    const date = new Date(parseInt(str.substring(6, str.length - 2)));
    const days = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayDate = date.getDate();
    return day + ', ' + month + ' ' + dayDate;
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
      ${isIE11() ?
        html`<style>
            ${unsafeCSS(this.styles)}
          </style>` :
        ``}
      <div>
        ${this.minifiedModel ?
          html`
          <fs-matrix-flight-details Segments=${JSON.stringify(this.minifiedModel)}></fs-matrix-flight-details>
            ` :
          ``}
      </div>
    `;
  }
}

if (!customElements.get('fs-matrix-flight-details-ascom-cart-adapter')) {
  customElements.define('fs-matrix-flight-details-ascom-cart-adapter', FSMatrixFlightDetailsASComCartAdapter);
}
