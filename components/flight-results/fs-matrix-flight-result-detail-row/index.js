import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import assignIconFromProperty from '../../shared/buildIcon';
import buildIcon from '../../shared/buildIcon';
import '../../generics/airline-helper/index.js'; // eslint-disable-line no-unused-vars
import '../../generics/airport-helper/index.js';
import '@alaskaairux/auro-popover/dist/auro-popover';
import '@alaskaairux/auro-button';
import '../../flight-search/fs-amenity-ife/index.js';
import '../../flight-search/fs-amenity-wifi/index.js';
import '../../flight-search/fs-amenity-power/index.js';

class FSMatrixFlightResultDetailRow extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      Carrier: {type: String},
      FlightNumber: {type: Number},
      Amenities: {type: Array},
      DepartureStation: {type: String},
      ArrivalStation: {type: String},
      wifiIcon: {type: String},
      powerIcon: {type: String},
      ifeIcon: {type: String},
      DepartureTime: {type: String},
      ArrivalTime: {type: String},
      Wifi: {type: Boolean},
      Power: {type: Boolean},
      IFE: {type: Boolean},
      NextDayDeparture: {type: Boolean},
      NextDayArrival: {type: Boolean},
      index: {type: String},
      FirstClassUpgradeAvailable: {type: Boolean},
      FirstClassUpgradeUnavailable: {type: Boolean},
      FirstClassUpgradeAvailableIcon: {type: String},
      FirstClassUpgradeUnavailableIcon: {type: String},
    };
  }

  async firstUpdated() {
    // lazy load icons
    this.wifiIcon = await assignIconFromProperty(this.closeIcon, 'wifi');
    this.powerIcon = await assignIconFromProperty(this.closeIcon, 'plug');
    this.ifeIcon = await assignIconFromProperty(
        this.closeIcon,
        'entertainment',
    );
    this.FirstClassUpgradeAvailableIcon = await buildIcon(
        'fc-upgrade-available',
    );
    this.FirstClassUpgradeUnavailableIcon = await buildIcon(
        'fc-upgrade-notAvailable',
    );

    this.wifiPopoverRef = this.shadowRoot.querySelector(
        '#' + this.index + '-wifi',
    );
    this.powerPopoverRef = this.shadowRoot.querySelector(
        '#' + this.index + '-power',
    );
    this.ifePopoverRef = this.shadowRoot.querySelector(
        '#' + this.index + '-ife',
    );
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--auro-font-family-default);
      }
      .airline-logo {
        padding-right: var(--auro-size-md);
      }
      .detail-spacing {
        display: inline-block;
        text-align: right;
        min-width: 85px;
        color: var(--auro-color-text-primary-on-light);
        padding-left: var(--auro-size-xxs);
        padding-right: var(--auro-size-sm);
      }
      .station-detail-spacing {
        display: inline-block;
        text-align: right;
        min-width: 45px;
        color: var(--auro-color-text-primary-on-light);
        padding-left: var(--auro-size-xxs);
        padding-right: var(--auro-size-xxs);
      }
      .flight-number {
        display: inline-block;
        min-width: 45px;
        padding-left: 4px;
        color: var(--auro-color-text-secondary-on-light);
      }
      .amenity svg {
        height: 16px !important;
        margin-top: -2px;
        vertical-align: middle;
        width: 16px !important;
      }
      .nextDay {
        color: var(--auro-color-brand-canyon-500);
        font-style: italic;
      }
      .result-top-row {
        display: flex;
        line-height: 20px;
      }
      .ammenities {
        min-width: 58px;
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

  render() {
    return html`
      ${isIE11() ?
        html`<style>
            ${unsafeCSS(this.styles)}
          </style>` :
        ``}
      <div class="auro matrixHeader" id="${this.index}">
        <div class="result-top-row">
          <airline-helper iata="${this.Carrier}" image long></airline-helper>
          <span class="auro util_body--sm flight-number" id="flight-number"
            >${this.FlightNumber}</span
          >
          <div class="ammenities" id="ammenities">
            ${this.Amenities && this.Amenities.includes('wifi') ?
              html`
                  <auro-popover
                    for="${this.index + '-wifi'}"
                    placement="bottom"
                  >
                    <fs-amenity-wifi></fs-amenity-wifi>
                    <span
                      class="amenity"
                      id="${this.index}-wifi"
                      slot="trigger"
                    >
                      ${this.wifiIcon}
                    </span>
                  </auro-popover>
                ` :
              ``}
            ${this.Amenities && this.Amenities.includes('power') ?
              html`
                  <auro-popover
                    for="${this.index + '-power'}"
                    placement="bottom"
                  >
                    <fs-amenity-power></fs-amenity-power>
                    <span
                      class="amenity"
                      id="${this.index}-power"
                      slot="trigger"
                    >
                      ${this.powerIcon}
                    </span>
                  </auro-popover>
                ` : // eslint-disable-line
              ``}
            ${this.Amenities && this.Amenities.includes('ife') ?
              html`
                  <auro-popover for="${this.index + '-ife'}" placement="bottom">
                    <fs-amenity-ife></fs-amenity-ife>
                    <span class="amenity" id="${this.index}-ife" slot="trigger">
                      ${this.ifeIcon}
                    </span>
                  </auro-popover>
                ` :
              ``}
          </div>

          <span
            class="auro util_body--sm station-detail-spacing"
            id="departure-station"
          >
            <airport-helper
              iata="${this.DepartureStation}"
              index="${this.index + 'dep'}"
            ></airport-helper
          ></span>
          <span
            class="auro util_body--sm detail-spacing ${this.NextDayDeparture ?
              'nextDay' :
              ''}"
            id="departure-time"
            >${this.DepartureTime}</span
          >
          <span
            class="auro util_body--sm station-detail-spacing"
            id="arrival-station"
          >
            <airport-helper
              iata="${this.ArrivalStation}"
              index="${this.index + 'arr'}"
            ></airport-helper
          ></span>
          <span
            class="auro util_body--sm detail-spacing ${this.NextDayArrival ?
              'nextDay' :
              ''}"
            id="arrival-time"
            >${this.ArrivalTime}</span
          >
          ${this.FirstClassUpgradeAvailable ?
            html`<span>${this.FirstClassUpgradeAvailableIcon}</span>` :
            html``}
          ${this.FirstClassUpgradeUnavailable ?
            html`<span>${this.FirstClassUpgradeUnavailableIcon}</span>` :
            html``}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('fs-matrix-flight-result-detail-row')) {
  customElements.define(
      'fs-matrix-flight-result-detail-row',
      FSMatrixFlightResultDetailRow,
  );
}
