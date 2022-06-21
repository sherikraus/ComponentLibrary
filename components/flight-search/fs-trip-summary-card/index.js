import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../../generics/import-auro-components';
import '../../flight-results/fs-matrix-flight-result';
import {classMap} from 'lit-html/directives/class-map';
import style from './styles-css';
import '../../generics/airport-helper';
import '../../generics/airport-avatar';

export class FSTripSummaryCard extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      badge: {type: String},
      index: {type: Number},
      price: {type: Number},
      miles: {type: Number},
      option: {type: Object, reflect: true},
      origin: {type: String},
      destination: {type: String},
      departureDate: {type: String},
      classOfService: {type: String},
      isAwardFlight: {type: Boolean},
      selectedFlights: {type: Array},
    };
    // beta: {type: Boolean},
  }

  static get styles() {
    return css`
            ${style}
        `;
  }

  generatePricingInfo() {
    if (this.isAwardFlight && !this.noAvailableFlight) {
      const awardContentClass = {'award-content': true};
      const awardMileContentClass = {'award-mile-content': true};
      const awardPriceContentClass = {'award-price-content': true};

      return html`
            <div 
                class="${classMap(awardContentClass)}">
              <div class="${classMap(awardMileContentClass)}">
                <slot name="miles"></slot>
              </div>
              <span class="${classMap(awardPriceContentClass)}">
              + $<slot name="price"></slot>
              </span>
            </div>
          `;
    }

    const currencySignClass = {'currency-sign': true};
    const priceAmountClass = {'price-amount': true};
    const priceContainerClass = {'price-container': true};

    return html`
          <span class="${classMap(priceContainerClass)}">
            <span class="${classMap(currencySignClass)}">
            $</span><slot 
              class="${classMap(priceAmountClass)}" 
              name="price"></slot>
          </span>
        `;
  }

  generateClassOfService() {
    const classOfServiceContainerClass = {'class-of-service-container': true};

    return html`
      <div 
        class="${classMap(classOfServiceContainerClass)}">
        <slot name="class-of-service"></slot>
      </div>
    `;
  }

  generateTileData(trip) {
    const tileData = [];

    const cabinMap = {
      'F': 'First',
      'C': 'Main',
    };

    trip.forEach((segment, idx) =>
      tileData.push({
        origin: segment.origin,
        destination: segment.destination,
        full: {},
        classOfService: cabinMap[segment.cabin],
      }),
    );
    return tileData;
  }

  generateAdvisory() {
    const adjustAdvisoryPositionDownClass = {
      'adjust-advisory-position-down': true,
      'advisory-text': true,
    };
    const thisTrip = this.selectedFlights[this.index];
    const isSameCabins = thisTrip.map((s) => s.cabin).every((val, _, arr) => val === arr[0]);

    const tiledata = this.generateTileData(thisTrip);

    return !isSameCabins ? html`
      <div class="${classMap(adjustAdvisoryPositionDownClass)}">
        <ch-legend tile slot ismixedcabinitinerary tiledata=${JSON.stringify(tiledata)}></ch-legend>
      </div>
    ` : ``;
  }

  formatDate() {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    function getOrdinalNum(n) {
      return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    const date = new Date(`${this.option.Segments[0].DepartureDay}T00:00:00`);
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${getOrdinalNum(date.getDate())}`;
  }

  generateStationCell() {
    const avatarContainerClass = {'avatar-container': true};
    const stationsContainerClass = {'stations-container': true};
    const stationsTextClass = {'stations-text': true};
    const departureDateClass = {'departure-date': true};

    return html`
      <td class="station-cell">
      ${this.badge ?
        html`
          <auro-badge pill>
            ${this.badge}
          </auro-badge>` :
        ''}
        <div class="${classMap(avatarContainerClass)}">
          <airport-avatar iata="${this.destination}"></airport-avatar>
        </div>
        <div class="station-text-container">
          <div class="${classMap(stationsContainerClass)}">
            <airport-helper iata="${this.origin}" full={true} code={true} large={true}></airport-helper>
            <span class="${classMap(stationsTextClass)}">to</span>
          </div>
          <div class="${classMap(stationsContainerClass)}">
          <airport-helper iata="${this.destination}" full={true} code={true}
              large={true}></airport-helper>
              <div class="${classMap(departureDateClass)}">
            ${this.formatDate()}
          </div>
          </div>
        </div>
      </td>
    `;
  }

  generateFlightInfoCell(option) {
    return html`
      <fs-matrix-flight-result
        Duration=${this.option.Duration}
        Segments=${this.option.Segments ? JSON.stringify(this.option.Segments) : '[]'}
        Footnotes=${this.option.Footnotes ? JSON.stringify(this.option.Footnotes) : '[]'}
        UpgradeInfo=${this.option?.UpgradeInfo ? this.option?.UpgradeInfo : '[]'}
        daysChanged=${this.option.daysChanged ? this.option.daysChanged : ''}
        SeatMapURL=${this.option.SeatMapURL ? this.option.SeatMapURL : ''}
        index=${'FS' + this.index + '_' + '0'}
      ></fs-matrix-flight-result>
    `;
  }

  render() {
    return html`
            ${isIE11() ?
                html`
                    <style>
                        ${unsafeCSS(FSTripSummaryCard.styles)}
                    </style>
                ` : ``
}
          ${this.option ? html`
            <table class="trip-summary-card">
                <tbody>
                    <tr class="summary-card-row">
                          ${this.generateStationCell()}
                        <td class="flight-info-cell">
                          ${this.generateFlightInfoCell(this.option)}
                        </td>
                        <td class="price-info-cell">                         
                          ${this.generateClassOfService()}
                          ${this.generatePricingInfo()}
                          ${this.generateAdvisory()}
                        </td>
                    </tr>
                </tbody>
            </table>` : '' }
            `;
  }
}

if (!customElements.get('fs-trip-summary-card')) {
  customElements.define('fs-trip-summary-card', FSTripSummaryCard);
}
