/* eslint-disable linebreak-style */
import {css, html, LitElement} from 'lit-element';
import {isIE11} from '../../shared/utility';
import styles from './styles-css';
import '@alaskaairux/auro-flight';
import '@alaskaairux/auro-hyperlink';
import '@alaskaairux/auro-accordion';
import '../../generics/import-auro-components';
import '../../generics/airline-helper';

class StatusFlightContainer extends LitElement {
  static get properties() {
    return {
      slice: {type: Array},
      flights: {type: Array},
      departureTime: {type: String},
      arrivalTime: {type: String},
      departureStation: {type: String},
      arrivalStation: {type: String},
    };
  }

  constructor() {
    super();
  }
  async firstUpdated() {
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
    let totalFlights = 0;

    this.slice.map((seg) => {
      seg.legs.map((leg) => {
        totalFlights++;
      });
    });

    return html`
      <div class="flight-container">
        <auro-flight
        flights=${this.flights}
        duration=" "
        departureTime=${this.departureTime}
        arrivalTime=${this.arrivalTime}
        departureStation=${this.departureStation}
        arrivalStation=${this.arrivalStation}
        >
        <auro-flightline>
          ${this.slice.length > 1 || (this.slice.length === 1 && this.slice[0].legs.length > 1) ? html`
            ${this.slice.map((seg, index) => html`
            ${index !== 0 ? html`
            ${seg.legs.map((leg, idx) => html`
                ${seg.legs.length > 1 && idx !== seg.legs.length - 1 && idx === 0?
                  html`` :
                  html`<auro-flight-segment 
                  iata=${leg.DepartureAirportCode}
                  ?stopover=${seg.legs.length > 1}
                ></auro-flight-segment>`}
              `)
              }
            ` : html``}
              `)}
          ` : html``}

          </auro-flightline>
          <ul class="footer-container" slot="footer">
            ${this.slice.map((seg) => html`
               <li>
                    <airline-helper iata=${seg.carrier} code image tail imageMd>                    </airline-helper>

                      <span style="margin-left:8px;display:flex;align-items:center;">
                        <airline-helper iata="${seg.carrier}" long></airline-helper>

                        <span style="margin-top:-4px;">${seg.flightNumber}&ndash;Operated by</span>
                        <airline-helper iata="${seg.carrier}" full></airline-helper>
                        <span class="closer">: 
                        ${seg.departureStation} to ${seg.arrivalStation}</span>
                      </span>
                  </li>
                
              `)}
          </ul>

        </auro-flight>
          <div class="selection-container">
            ${totalFlights > 1 ? html`
            <auro-accordion noProfile lowProfile justifyLeft>
              <span class="blue" slot="trigger">Expanded view</span>
              ${this.slice.map((seg, idx) => html`
                <div class="flight-list">
                  <auro-flight
                    flights=${JSON.stringify([`${seg.carrier} ${seg.flightNumber}`])}
                    duration=${seg.duration}
                    departureTime=${seg.departureDate}
                    arrivalTime=${seg.arrivalDate}
                    departureStation=${seg.departureStation}
                    arrivalStation=${seg.arrivalStation}
                  >
                    <auro-flightline>
                      
                      ${seg.legs.length > 1 ? html`
                        ${seg.legs.map((leg, idx) => html`
                          ${idx !== seg.legs.length - 1 && idx !== 0 ? html`
                          <auro-flight-segment
                            iata=${leg.ArrivalAirportCode}
                            stopover
                          >

                          </auro-flight-segment>
                          ` : html``}

                        `)}
                      ` : html``}
                    </auro-flightline>
                    <ul class="footer-container" slot="footer">
                        <li>
                              <airline-helper iata=${seg.carrier} code image tail imageMd></airline-helper>

                                <span style="font-size:16px;margin-left:8px;display:flex;align-items:center;">
                                  <airline-helper iata="${seg.carrier}" long></airline-helper>

                                  <span style="">${seg.flightNumber}&ndash;Operated by</span>
                                  <airline-helper iata="${seg.carrier}" full></airline-helper>
                                  <span class="closer">: 
                                  ${seg.departureStation} to ${seg.arrivalStation}</span>
                                </span>
                            </li>
                    </ul>
                  </auro-flight>
                  <div class="action-container">
                    ${seg.carrier === 'AS' ? html`
                    <auro-hyperlink cta secondary href="${`https://www.alaskaair.com/status/${seg.flightNumber}/${seg.departureDay}`}"
                    >Details</auro-hyperlink>
                    ` : html``}
                    ${seg.carrier === 'QF' ? html`
                    <auro-hyperlink cta secondary  target="_blank" href="${`https://www.qantas.com/us/en/travel-info/flight-status.html?flight-status__type=departing&flight-status__selected-airline=QF&flight-status-number=${seg.flightNumber}&flight-status__date-field=${seg.departureDay.split('-')[2]}${seg.departureDay.split('-')[1]}${seg.departureDay.split('-')[0]}&flight-status__time-field=00%3A00-23%3A59&flight-status.search=true`}"
                    >Details</auro-hyperlink>
                    ` : html``}
                    ${seg.carrier === 'AA' ? html`
                    <auro-hyperlink cta secondary target="_blank" href="${`https://www.aa.com/travelInformation/flights/status/detail?search=AA|${seg.flightNumber}||${seg.arrivalStation}|${seg.departureDay.replace(/-/g, ',')}&ref=status-alaska`}"
                    >Details</auro-hyperlink>
                    ` : html``}
                  </div>

                </div>
                ${idx !== this.slice.length - 1 ? html`
                <hr />

                ` : html``}
              `)}
            </auro-accordion>
            ` : html`
            <auro-hyperlink cta secondary href="${`https://www.alaskaair.com/status/${this.slice[0].flightNumber}/${this.slice[0].departureDay}`}"
            >Details</auro-hyperlink>
            `}
          </div>
      </div>

    `;
  }
}

if (!customElements.get('status-flight-container')) {
  customElements.define('status-flight-container', StatusFlightContainer);
}
