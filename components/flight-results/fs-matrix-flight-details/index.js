import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '@alaskaairux/auro-hyperlink';
import '../../generics/airline-helper/index.js';
import '../../generics/airport-helper/index.js';
import '../../generics/equipment-helper/index.js';
import '@alaskaairux/auro-icon';
import '@alaskaairux/auro-hyperlink';
import assignIconFromProperty from '../../shared/buildIcon.js';
import moment from 'moment/dist/moment';

import styles from './styles-css';

class FSMatrixFlightDetails extends LitElement {
  constructor() {
    super();
    this.collapsed = false;
    this.a11yText = '';
  }

  static get properties() {
    return {
      Segments: {type: Array},
      Duration: {type: String},
      formattedDuration: {type: String},
      accordionIcon: {type: String},
      collapsed: {type: Boolean},
    };
  }

  toggleAccordion() {
    this.collapsed = !this.collapsed;
  }

  getBlueLineHeight() {
    // Getting the size of the flight amenities container
    const mobile = this.shadowRoot.querySelector('#mobile-only').offsetHeight;

    // Adding the size of the change planes container
    const trueHeight = mobile + 86;
    const blueLines = this.shadowRoot.querySelectorAll('.blue-line');

      mobile > 0 ?
        // Add and remove height accordingly
        blueLines.forEach((el) => {
          el.setAttribute('style', `min-height:${trueHeight}px`);
        }) :
        blueLines.forEach((el) => {
          el.removeAttribute('style', `min-height:${trueHeight}px`);
        });
  }

  async firstUpdated() {
    // from microsite adapter
    this.Segments = this.formatSegments(this.Segments);
    this.formattedDuration = this.formatDuration(this.Duration);

    // Getting the size of the flight amenities container
    const mobile = this.shadowRoot.querySelector('#mobile-only').offsetHeight;
    // Adding the size of the change planes container
    const trueHeight = mobile + 186;

    const blueLines = this.shadowRoot.querySelectorAll('.blue-line');

    // on first load in Mobile view we need to size the blue line correctly
    if (window.innerWidth < 660 || screen.width < 660) {
      blueLines.forEach((el) => {
        el.setAttribute('style', `min-height:${trueHeight}px`);
      });
    }

    // When we resize the screen the blue line will also need to resize
    window.addEventListener('resize', this.getBlueLineHeight);
    // When you change screen orientation the blue line needs to resixe
    window.addEventListener('orientationchange', this.getBlueLineHeight );
    window.addEventListener('fullscreenchange', this.getBlueLineHeight );

    this.accordionIcon = await assignIconFromProperty(this.accordionIcon, 'chevron-down');
    this.a11yText = this.generateA11YText();
  }

  formatSegments(segments) {
    const newSegments = [];
    segments.forEach((seg) => {
      // if you're reading this, I'm sorry
      if (typeof seg.StopoverInformation != 'string') {
        seg.StopoverInformation = seg.StopoverInformation.join('');
      }
      newSegments.push({
        ...seg,
        DepartureDay: seg.DepartureDayFormatted,
        ArrivalDay: seg.ArrivalDayFormatted,
        StopoverInformation: seg.StopoverInformation.split(' '),
      });
    });
    return newSegments;
  }

  formatDuration(duration) {
    return 'Total Duration: ' + duration.replaceAll('"', '');
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

  generateA11YText() {
    let phrase = '';

    phrase += `This journey from ${this.Segments[0].DepartureStation} `;
    phrase += `to ${this.Segments[this.Segments.length - 1].ArrivalStation} `;
    phrase += `is ${this.Duration.replaceAll('"', '')} long `;
    if (this.Segments.length > 1) {
      phrase += 'and contains';
      this.Segments.forEach((seg, index) => {
        seg.Performance.forEach((leg, idx) => {
          if (!((index === this.Segments.length - 1) && (idx === seg.Performance.length - 1))) {
            if (seg.Performance.length > 1 && seg.Performance.length !== idx) {
              phrase += ` a stopover in ${leg.ArrivalAirportCode}`;
            } else if (seg.Performance.length === idx || seg.Performance.length === 1) {
              phrase += ` a layover in ${leg.ArrivalAirportCode}`;
            }
          }
        });
      });
      phrase += '. ';
    } else {
      phrase += 'and is nonstop. ';
    }

    this.Segments.forEach((seg, index) => {
      phrase += `The flight from ${seg.DepartureStation} to ${seg.ArrivalStation} is `;
      phrase += `${seg.Carrier} ${seg.FlightNumber}, flying for a duration of ${seg.Duration}`;
      if (seg.Performance.length > 1) {
        seg.Performance.forEach((leg, idx) => {
          if (seg.Performance.length > 1 && seg.Performance.length !== idx + 1) {
            phrase += ` with a stopover in ${leg.ArrivalAirportCode} `;
          }
        });
      }
      phrase += `, departing at ${seg.DepartureTime} ${seg.DepartureDay} and arriving at `;
      phrase += `${seg.ArrivalTime} ${seg.ArrivalDay}. `;

      if (seg.Amenities.length === 0) {
        phrase += `There are no amenities on this flight, operated on a ${leg.Equipment}. `;
      } else {
        phrase += `The amenities available on this flight are: `;
        seg.Amenities.forEach((amenity, idx) => {
          phrase += `${amenity}`;
          if (idx !== seg.Amenities.length - 1) phrase += ', ';
          else phrase += '. ';
        });
      }
      if (this.Segments.length !== index + 1) {
        phrase += `There is a ${seg.StopoverInformation[0]} ${seg.StopoverInformation[1]} `;
        phrase += `layover in ${seg.ArrivalStation}. `;
      }
    });
    console.log(phrase);
    return phrase;
  }

  createFlightAmenitiesContext(seg) {
    return html`
      <div class="airline-name">
        <div class="carrierLogo">
         <airline-helper iata="${seg.Carrier}" image imageXl tail></airline-helper>
        </div>
        <div class="carrierText">
          <airline-helper primary iata="${seg.Carrier}" full>${seg.FlightNumber}</airline-helper>
        </div>

      </div>

      <div class="equipment-spacer">
        ${seg.OperationalDisclosures && seg.OperationalDisclosures[0]}
      </div>
      ${seg.SubjectToGovernmentApproval === true ? html`
      <div class="goverment-approval-container">
        <auro-icon customColor class="goverment-approval-icon" category="interface" name="gov-approval"></auro-icon>
        <div class="goverment-approval-text-container">
        Route pending government approval 
          </div>  
      </div>
    `:html``}
      <div class="equipment-spacer">
        <equipment-helper code="${seg.Equipment}"></equipment-helper>
      </div>

      ${seg.Amenities && seg.Amenities.includes('wifi') || seg.Amenities.includes('Wi-Fi') ? html`
        <div class="depart-plane-amenities-container">
          <auro-icon category="in-flight" name="wifi"></auro-icon> Wifi 
        </div>
        ` : ``}

      ${seg.Amenities && seg.Amenities.includes('power') || seg.Amenities.includes('In-seat power source') ? html`
        <div class="depart-plane-amenities-container">
          <auro-icon category="in-flight" name="plug"></auro-icon> Power 
        </div>
      ` : ``}

      ${seg.Amenities && seg.Amenities.includes('ife') || seg.Amenities.includes('Entertainment on demand') ? html`
        <div class="depart-plane-amenities-container">
        <auro-icon category="in-flight" name="entertainment"></auro-icon> Entertainment 
        </div>
      ` : ``}

        <div class="horizontal-line">
          <div class="total-flight-duration-container"> Duration: ${seg.Duration}</div>
        </div>
      </div>
      `;
  }

  getStopoverDetails(segment) {
    return segment.Performance.length > 1 ?
      segment.Performance.map((stopover, idx) => idx !== segment.Performance.length - 1 ? html`
      <div class="list-wrapper-stop">
        <div class="list-bullet-hollow"></div>
        <div class="list-item">
            <div class="list-title"> Stop </div>
            <div class="flight-stop-over-container">
              <airport-helper secondary iata="${stopover.ArrivalAirportCode}" full code></airport-helper> 
            </div>
        </div>
      </div>
    `: '') :
    html`<div class="segmentment-container primary mdSpacer"></div>`;
  }

  getChangeOfPlaneDetails(segment, index) {
    return index < this.Segments.length - 1 ? html`
      <div class="list-wrapper-top">
        <div class="list-wrapper">
          <div class="blue-line"></div>
            <div class="list-wrapper-change-planes">
              <div class="list-item">
                <div class="change-planes-list-title"> 
                  <div class="list-bullet"></div>
                  <div class="layover-container">
                    <div class="change-planes-icon">
                      <img alt="Change planes icon" src="https://p2pcontent-fd-prod.azurefd.net/icons/change-planes.svg"/>
                    </div>
                    <div>
                      <div class="layover-location-container">
                        Change planes in  <airport-helper iata="${segment.ArrivalStation}" full code></airport-helper>
                      </div>
                      <div class="layover-time-container">
                        ${segment.StopoverInformation[0]} ${segment.StopoverInformation[1]} layover       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    ` : '';
  }

  getFlightStatistics() {
    return this.Segments.map((segment) => html`
      ${segment.Performance.map((leg) => html`
        <div class="flight-satistics-airport-code">
          <span>${leg.DepartureAirportCode} to ${leg.ArrivalAirportCode}</span>
        </div>
        <div class="flight-statistics-container">
          <span class="flight-satistics-percent-label-container">% On-time</span>
          <span class="flight-satistics-percent-container">
            ${leg.PercentOntime == '0' && leg.PercentLate30Plus == '0' &&
            leg.CanceledPercentage == '0' ? 'Not Available' : leg.PercentOntime + '%' }
          </span>
        </div>
        <div class="flight-statistics-container">
          <span class="flight-satistics-percent-label-container">% Late 30+ min</span>
          <span class="flight-satistics-percent-container">
            ${leg.PercentOntime == '0' && leg.PercentLate30Plus == '0' &&
            leg.CanceledPercentage == '0' ? 'Not Available' : leg.PercentLate30Plus + '%' }
          </span>
        </div>
        <div class="flight-statistics-container">
          <span class="flight-satistics-percent-label-container">% Cancelled</span>
          <span class="flight-satistics-percent-container">
            ${leg.PercentOntime == '0' && leg.PercentLate30Plus == '0' &&
            leg.CanceledPercentage == '0' ? 'Not Available' : leg.CanceledPercentage + '%' }
          </span>
        </div>
      `)}
    `);
  }

  getFlightInformationContainer() {
    return this.Segments ? this.Segments.map((segment, idx) =>
      html`
        <div class="flex-container">
          <div class="column">
              ${idx === 0 ? html`
                <div class="depart-origin-container">DEPART ORIGIN</div>` :
              html`<div class="depart-origin-container"></div>`
              }
              <div class="flight-time-container">${segment.DepartureTime}</div>
              ${segment.NextDayDeparture && idx > 0 ? html` 
                <div class="flight-date-container-next-day"> ${segment.DepartureDay}</div>` :
                html`<div class="flight-date-container">${segment.DepartureDay}</div>`
              }
                <airport-helper secondary iata="${segment.DepartureStation}" code full></airport-helper>
            <div class="list-wrapper-stops">
              <div class="blue-line-hollow"></div>
              <div class="list-wrapper">
                ${this.getStopoverDetails(segment)}
              </div>
            </div>
              ${this.Segments.length - 1 === idx ? html`
                <div class="arrive-origin-container">ARRIVE DESTINATION</div>` :
                html`<div class="depart-origin-container"></div>`
              }
              <div class="flight-time-container">${segment.ArrivalTime}</div>
              <div class="flight-date-container">${segment.ArrivalDay}</div>
              <airport-helper secondary iata="${segment.ArrivalStation}" full code>A</airport-helper>
              <div id="mobile-only"> ${this.createFlightAmenitiesContext(segment)} </div>  
          </div>
          <div class="column bg-alt">
            <div class="full-screen-only"> ${this.createFlightAmenitiesContext(segment)} </div>
          </div>
        </div>
        ${this.getChangeOfPlaneDetails(segment, idx)}
    `) : '';
  }

  getTotalDuration() {
    const departureDay = moment(this.Segments[0].DepartureDay).startOf('day');
    const arrivalDay = moment(this.Segments[this.Segments.length - 1].ArrivalDay).startOf('day');
    const daysChanged = arrivalDay.diff(departureDay, 'days');
    return this.Duration ? html`
      <div class="total-duration-container">
        ${this.formattedDuration}
        ${daysChanged > 0 ? html`
          ${daysChanged > 1 ? html`
            <div class="next-day-container auro_heading auro_heading--400">  +${daysChanged} Days </div>
          ` :
          html`
            <div class="next-day-container auro_heading auro_heading--400">  +${daysChanged} Day </div>
          `}
        ` : ''}
      </div>
    ` : '';
  }

  render() {
    return html`
      ${isIE11() ? html`<style>${unsafeCSS(FSMatrixFlightDetails.styles)}</style>` : ''}
      <div class="displayHidden">
        <span>${this.a11yText}</span>
      </div>
      ${this.getTotalDuration()}
      ${this.getFlightInformationContainer()}
      <div class="flight-satistics-drop-down-line" >
        <slot name="title" class="${this.collapsed ? 'closed' : 'open'}" @click=${this.toggleAccordion}>
          Flight Performance 
        </slot>
        <slot name="accordion-icon" class="${this.collapsed ? 'closed' : 'open'}" @click=${this.toggleAccordion}>
          ${this.accordionIcon}
        </slot>
        <div class="collapsed-content-container ${this.collapsed ? 'closed' : 'open'}">
          <slot name="collapsed-content">
            ${this.getFlightStatistics()}
              <div class="disclaimer-container">
                <div class="info-icon-container" style="{width: 16px; height: 16px;}">
                  <auro-icon class="customSize" category="alert" name="information-stroke">
                  </auro-icon>
                </div>
                <div class="disclaimer-text-container">
                  Performance data is based on previous month
                </div>
              </div>
            </div>
          </slot>
      </div>
    </div>
    `;
  }
}

if (!customElements.get('fs-matrix-flight-details')) {
  customElements.define('fs-matrix-flight-details', FSMatrixFlightDetails);
}
