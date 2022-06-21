import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../fs-matrix-flight-result-detail-row/index.js'; // eslint-disable-line no-unused-vars
import '@alaskaairux/auro-hyperlink';
import '../../flight-search/fs-drawer/index.js';
import '../../generics/import-auro-components';
import '@alaskaairux/auro-flight';
import '@alaskaairux/auro-flightline';
import '../fs-matrix-flight-details';
import '@alaskaairux/auro-icon';

class FSMatrixFlightResult extends LitElement {
  static get properties() {
    return {
      FlightLoadStatus: {type: Object},
      Duration: {type: String},
      daysChanged: {type: Number},
      TotalDurationMinutes: {type: Number},
      Segments: {type: Array},
      Footnotes: {type: Array},
      UpgradeInfo: {type: Array},
      index: {type: String},
      open: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-size: 16px;
        font-family: var(--auro-font-family-default);
      }
      .cell-container {
        display: inline-block;
        text-align: left;
        min-height: 110px;
        width: 100%;
      }
      .segment-container {
        vertical-align: top;
      }
      .result-bottom-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: var(--auro-text-body-default-weight);
        font-size: 14px;
        line-height: var(--auro-text-body-height-sm);
        padding-top: var(--auro-size-xxs);
        padding-bottom: var(--auro-size-xxs);
        vertical-align: bottom;
      }
      .duration {
        border: 1px solid var(--auro-color-border-disabled-on-light);
        color: var(--auro-color-text-primary-on-light);
        border-style: none solid none none;
        padding-left: var(--auro-size-xxs);
        padding-right: var(--auro-size-xs);
      }
      .modal-text {
        padding-right: var(--auro-size-xxs);
      }
      .details {
        color: var(--auro-color-text-link-on-light);
        text-decoration: none;
        cursor: pointer;
        padding-right: var(--auro-size-md);
      }
      .details:hover {
        color: var(--auro-color-ui-hover-on-light);
        text-decoration: underline;
      }
      .seat-preview {
        padding: var(--auro-size-none) var(--auro-size-xxs);
      }
      .footnote {
        margin: 0;
        color: var(--auro-color-text-secondary-on-light);
      }
      .footer-container {
        list-style: none;
        padding-inline-start: unset;
        margin-block-start: unset;
        margin-block-end: unset;
      }
      .footer-container li {
        display: flex;
      }
      .vertical-line {
        border-left: 1px solid var(--auro-color-border-divider-on-light);
        height: 24px;
        margin: auto 0px;
      }
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

  fireDemo(evt) {
    evt.stopPropagation();
    const dialog = document.querySelector('auro-drawer');
    try {
      dialog.removeChild(dialog.querySelector('[slot="content"]'));
      dialog.removeChild(dialog.querySelector('[slot="header"]'));
    } catch (e) {

    }
    const heading = document.createElement('span');
    heading.innerHTML = 'Preview seat map';
    heading.setAttribute('slot', 'header');
    dialog.appendChild(heading);

    this.parseUrl(evt);

    dialog.setAttribute('open', true);

    // create my seat map
  }

  fireDetailsModal(evt) {
    const dialog = document.querySelector('auro-dialog');
    try {
      dialog.removeChild(dialog.querySelector('[slot="content"]'));
      dialog.removeChild(dialog.querySelector('[slot="header"]'));
      dialog.removeAttribute('sm');
      dialog.removeAttribute('md');
    } catch (e) {

    }

    dialog.setAttribute('lg', true);

    const heading = document.createElement('span');
    heading.innerHTML = 'Flight details';
    heading.setAttribute('slot', 'header');
    dialog.appendChild(heading);

    const content = document.createElement('fs-matrix-flight-details');
    content.setAttribute('slot', 'content');
    content.setAttribute('Segments', JSON.stringify(this.Segments));
    content.setAttribute('Duration', JSON.stringify(this.Duration));

    dialog.appendChild(content);
    dialog.setAttribute('open', true);
  }

  firstUpdated() {
    this.dispatchEvent(new CustomEvent('flightResultVisible', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  parseUrl(evt) {
    try {
      evt.preventDefault();
      const totalDurationMinutes = this.TotalDurationMinutes;
      const showSaver = true;
      const isUmnr = false;
      const segments = this.Segments
          .map(function(segment, i) {
            return {
              OperatingCarrier: segment.OperatingCarrier ? segment.OperatingCarrier : seg.PublishingCarrier,
              MarketingCarrier: segment.PublishingCarrier,
              FlightNumber: segment.FlightNumber,
              OperatingFlightNumber: segment.OperatingFlightNumber != 0 ?
                                     segment.OperatingFlightNumber :
                                     segment.PublishingFlightNumber,
              Origin: segment.DepartureStation,
              DepartureDateTime: segment.Performance[0].origin.dateTime,
              Destination: segment.ArrivalStation,
              TravelDurationMinutes: totalDurationMinutes,
              Id: '' + i,
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

  parseFlights(segments) {
    const flightNumbers = [];
    segments.forEach((seg) => {
      flightNumbers.push(`${seg.Carrier} ${seg.FlightNumber}`);
    });
    return flightNumbers;
  }

  showColonInAirlineHelper(footnote) {
    if (this.Footnotes.length > 1) {
      if (footnote.airline === 'AS' && (footnote.operator === 'QX' || footnote.operator === 'OO')) {
        return false;
      }
      if (footnote.airline === 'AA' && footnote.operator === 'OO') {
        return false;
      }
      return true;
    }
    return false;
  }

  constructUpgradeText(text, upgrade) {
    return `${text}${upgrade.ApplicableAirports ?
      `: ${upgrade.ApplicableAirports.join('; ')}` : ``}`;
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
          ${this.Segments ? html`
            <auro-flight
              flights=${JSON.stringify(this.parseFlights(this.Segments))}
              duration=${this.Duration}
              departureTime=${this.Segments[0].DepartureTime}
              departureStation=${this.Segments[0].DepartureStation}
              arrivalTime=${this.Segments[this.Segments.length - 1].ArrivalTime}
              arrivalStation=${this.Segments[this.Segments.length - 1].ArrivalStation}
              daysChanged=${this.daysChanged}
            >
              <auro-flightline>
                ${this.Segments.map((segment, idx) => html`
                  ${segment.Performance && segment.Performance.map((seg, idx) => html`
                    ${idx !== segment.Performance.length - 1 ? html`
                      <auro-flight-segment iata="${seg.ArrivalAirportCode}" stopover ></auro-flight-segment>

                    ` : ``}
                  `)}
                  ${this.Segments.length - 1 !== idx ? html`
                  <auro-flight-segment iata="${segment.ArrivalStation}" 
                  duration="${segment.StopoverInformation}"></auro-flight-segment>

                  ` : ``} 
                `)}
              </auro-flightline>
              <ul class="footer-container" slot="footer">
                ${this.Footnotes && this.Footnotes.length > 0 ? html`
                  ${this.Footnotes.map((footnote) => html`
                    <li>
                      <airline-helper iata=${footnote.airline} image tail imageMd></airline-helper>
                      <span style="margin-left:8px; width:100%;">
                        <span>${footnote.content}</span>
                        <airline-helper style="margin-left: -4px;margin-right: -4px;"
                          iata=${footnote.operator} 
                          ?colon="${this.showColonInAirlineHelper(footnote)}" 
                          full sm></airline-helper>
                        <span style="margin-left: 2px; margin-right: -3px;">
                          ${footnote.airline === 'AS' && footnote.operator === 'QX' ?
                            ` as AlaskaHorizon${this.Footnotes.length > 1 ? ':' : ''}` : ``}
                          ${footnote.airline === 'AS' && footnote.operator === 'OO' ?
                            ` as AlaskaSkyWest${this.Footnotes.length > 1 ? ':' : ''}` : ``}
                          ${footnote.airline === 'AA' && footnote.operator === 'OO' ?
                            ` as American Eagle${this.Footnotes.length > 1 ? ':' : ''}` : ``}
                        </span>
                        ${this.Footnotes.length === 1 ? `` : html`&nbsp;${footnote.routes}`}
                      </span>
                    </li>
                  `)}
                ` : ``}
                ${this.UpgradeInfo ? html`
                  ${this.UpgradeInfo.map((upgrade) => html`
                    <li>
                      ${upgrade.FirstClassAvailable ? html`
                        <auro-icon category='interface' name='first-class-upgrade-available' customColor
                          style="color: var(--auro-color-brand-midnight-400)"></auro-icon>
                        <span style="margin-left:8px; margin-right: 0px;">
                          ${this.constructUpgradeText(`First Class upgrade available`, upgrade)}
                        </span>
                      ` : html`
                        <auro-icon category='interface' name='first-class-upgrade-waitlist' customColor
                          style="color: var(--auro-color-brand-goldcoast-400)"></auro-icon>
                        <span style="margin-left:8px; margin-right: 0px;">
                          ${this.constructUpgradeText(`First Class upgrade waitlist`, upgrade)}
                        </span>
                      `}
                    </li>
                  `)}
                ` : ``}
              </ul>
            </auro-flight>
          ` : ``}
        </div>

        <div class="result-bottom-row" aria-label="Option ${this.index}, 
        departing ${this.Segments[0].DepartureStation} at 
        ${this.Segments[0].DepartureTime}, arriving in 
        ${this.Segments[this.Segments.length - 1].ArrivalStation} at 
        ${this.Segments[this.Segments.length - 1].ArrivalTime}">

          <div class="modal-text">
            <auro-hyperlink class="details stops" id="details"
              @click="${(evt) => this.fireDetailsModal(evt)}"
            >
              Details
            </auro-hyperlink>
          </div>
          <div class="vertical-line"></div>
          <auro-hyperlink
            class="seat-preview"
            role="button"
            @click="${(evt) => this.fireDemo(evt)}"
            id="seatmap"
          >
            Preview seats
          </auro-hyperlink>
        </div>
        <fs-drawer>
          <!-- ${this.SeatMapURL} -->
        </fs-drawer>
      </div>
    `;
  }
}

if (!customElements.get('fs-matrix-flight-result')) {
  customElements.define('fs-matrix-flight-result', FSMatrixFlightResult);
}
