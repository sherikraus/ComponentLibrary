import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../fs-matrix-flight-result-detail-row/index.js'; // eslint-disable-line no-unused-vars
import '@alaskaairux/auro-hyperlink';
import '../../flight-search/fs-drawer/index.js';
import '../../generics/import-auro-components';
import styles from './styles-css';

class ASFlightResult extends LitElement {
  static get properties() {
    return {
      Duration: {type: String},
      Segments: {type: Array},
      SeatMapURL: {type: String},
      index: {type: String, property: false},
      open: {type: Boolean, property: false},
    };
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

  // fires the seat map in a DOM level drawer
  fireDemo(evt) {
    evt.stopPropagation();
    const dialog = document.querySelector('auro-drawer');
    // clear the drawer, otherwise we'd be concatenating
    try {
      dialog.removeChild(dialog.querySelector('[slot="content"]'));
      dialog.removeChild(dialog.querySelector('[slot="header"]'));
    } catch (e) {

    }
    const heading = document.createElement('span');
    heading.innerHTML = 'Preview seat map';
    heading.setAttribute('slot', 'header');
    dialog.appendChild(heading);

    // initializes SeatsUI
    this.parseUrl(evt);
    dialog.setAttribute('open', true);
  }

  fireDetailsModal(evt) {
    const dialog = document.querySelector('auro-dialog');
    // clear the drawer, otherwise we'd be concatenating
    try {
      dialog.removeChild(dialog.querySelector('[slot="content"]'));
      dialog.removeChild(dialog.querySelector('[slot="header"]'));
    } catch (e) {

    }

    dialog.setAttribute('lg', true);

    const heading = document.createElement('span');
    heading.innerHTML = 'Details for flight';
    heading.setAttribute('slot', 'header');
    dialog.appendChild(heading);

    // hydrate the UI
    const content = document.createElement('fs-matrix-flight-details');
    content.setAttribute('slot', 'content');
    content.setAttribute('segments', JSON.stringify(this.Segments));
    content.setAttribute('duration', JSON.stringify(this.Duration));

    dialog.appendChild(content);
    dialog.setAttribute('open', true);
  }

  // parses seatMapURL's pipe structure, initializes SeatsUI
  parseUrl(evt) {
    try {
      evt.preventDefault();
      const url = this.SeatMapURL;
      const showSaver = url.toLowerCase().indexOf('showsaver') != -1;
      const queriesRegex = /^.*\?u=(\w)&segs=((?:[^\|]+\|)+)$/i;
      const queries = queriesRegex.exec(url);
      const isUmnr = queries[1] === 't';
      const segmentStrings = queries[2]
          .split('|') // segments separated by pipes
          .slice(0, -1) // last pipe doesnt have a segment after it
          .map(function(segment) {
            const segmentAndLegs = segment.split('$'); // segment and legs are split by dollar sign
            return segmentAndLegs[0]; // first element is segment, the rest are legs
          });
      const segments = segmentStrings
          .map(function(segment, i) {
            const segmentFields = segment.split(',');
            return {
              operatingCarrier: segmentFields[0],
              marketingCarrier: segmentFields[1],
              flightNumber: parseInt(segmentFields[2], 10),
              origin: segmentFields[4],
              departureDateTime: segmentFields[5],
              destination: segmentFields[6],
              equipmentCode: segmentFields[8],
              travelDurationMinutes: parseInt(segmentFields[9]),
              id: '' + i,
            };
          });
      const request = {
        isUmnr: isUmnr,
        segments: segments,
        showSaver: showSaver,
        isAlaskaStockTicket: true,
        preview: true,
        passengers: [],
        passengersSegments: [],
      };
      /* function attachError() {
          let template = $('#preview-seat-map-error-template');
          $('.drawerContent-dynamic').append($(template.html()));
      }
      attachError();*/
      const dialog = document.querySelector('auro-drawer');

      const ascomSeats = document.createElement('div');
      ascomSeats.setAttribute('slot', 'content');
      ascomSeats.setAttribute('id', 'ascom-seats');
      dialog.appendChild(ascomSeats);
      SeatsUI.initializeSeatMap('ascom-seats', request);
    } catch (err) {
      console.log(err);
      // displayError(err);
    }
  }


  render() {
    return html`
      ${isIE11() ?
        html`<style>
            ${unsafeCSS(this.styles)}
          </style>` :
        ``}
      <div class="cell-container auro" id="${this.index}">
        <div id="segmentContainer">
          ${this.Segments ?
            this.Segments.map(
                (seg, idx) => html` <fs-matrix-flight-result-detail-row
                  Carrier=${seg.Carrier}
                  FlightNumber=${seg.FlightNumber}
                  DepartureStation=${seg.DepartureStation}
                  ArrivalStation=${seg.ArrivalStation}
                  DepartureTime=${seg.DepartureTime}
                  ArrivalTime=${seg.ArrivalTime}
                  Amenities=${JSON.stringify(seg.Amenities)}
                  ?NextDayDeparture=${seg.NextDayDeparture}
                  ?NextDayArrival=${seg.NextDayArrival}
                  index=${this.index + '_' + idx}
                  ?FirstClassUpgradeAvailable=${seg.FirstClassUpgradeAvailable}
                  ?FirstClassUpgradeUnavailable=${seg.FirstClassUpgradeUnavailable}
                />`,
            ) :
            ``}
        </div>

        <div class="result-bottom-row">
          <span class="duration" id="duration">${this.Duration}</span>
          <auro-hyperlink class="details stops" id="details"
          role="button"
          @click="${(evt) => this.fireDetailsModal(evt)}"
            >${this.Segments && this.Segments.length > 0 ?
              this.Segments.length + ' stops' :
              'Nonstop'}</auro-hyperlink
          >
          <auro-hyperlink
            class="seat-preview"
            role="button"
            @click="${(evt) => this.fireDemo(evt)}"
            id="seatmap"
          >
            Preview seat map
          </auro-hyperlink>
        </div>
        <fs-drawer>
          <!-- ${this.SeatMapURL} -->
        </fs-drawer>
        <div class="result-footnote-row" id="footnotes">
          ${this.Footnotes ?
            this.Footnotes.map(
                (footnote) => html` <p class="footnote">${footnote}</p> `,
            ) :
            ``}
            <slot></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('as-flight-result')) {
  customElements.define('as-flight-result', ASFlightResult);
}
