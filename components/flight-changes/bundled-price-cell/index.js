import {html, css, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import stylesCss from './styles-css.js';
import '@alaskaairux/auro-button';

class BundledPriceCell extends LitElement {
  static get properties() {
    return {
      pcAvailabilityCheck: {type: Boolean},
      companionFare: {type: Boolean},
      disabled: {type: Boolean},
      index: {type: Number},
      priceDifference: {type: Number},
      milesDifference: {type: Number},
      formOfPayment: {type: String},
    };
  }

  static get styles() {
    return css`${stylesCss}`;
  }

  constructor() {
    super();
    this.milesDifference = this.milesDifference === undefined ? 0 : this.milesDifference;
  }

  getMilesBody() {
    if (this.milesDifference !== 0) {
      return html`
        <!-- Miles -->
        <div class="primaryText">
          <span>${Math.abs(this.milesDifference).toLocaleString()} ${this.getMilesLabel()}</span>
        </div>
        <div>+</div>
        `;
    }
    return;
  }

  getMilesLabel() {
    if (this.milesDifference < 0) {
      return 'miles redeposit';
    } else if (this.milesDifference > 0 && this.priceDifference > 0) {
      return 'miles';
    } else {
      return 'miles due';
    }
  }

  getPriceLabel() {
    if (this.milesDifference > 0 && this.priceDifference > 0) {
      return '';
    } else if (this.priceDifference < 0 && this.formOfPayment && this.formOfPayment.toLowerCase() === 'refund') {
      return 'refund';
    } else if (this.priceDifference < 0) {
      return 'credit';
    } else if (this.priceDifference > 0 && this.milesDifference !== 0) {
      return 'due';
    }
    return '';
  }

  getButton() {
    if (isIE11()) {
      return html`
        <button id="SelectButton${this.index}" @click="${this.submit}"
          ?disabled="${this.disabled ? true : false}">Select</button>
      `;
    } else {
      return html`
        <div class="buttonContainer">
          <auro-button id="SelectButton${this.index}" 
            @click=${this.submit} 
            ?disabled="${this.disabled ? true : false}" fluid
            secondary>Select</auro-button>
        </div>
      `;
    }
  }

  submit() {
    addFlightsToReissue(this, `SelectButton${this.index}`, this.index, !!this.pcAvailabilityCheck);
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
      ${isIE11() ? html`<style>${unsafeCSS(BundledPriceCell.styles)}</style>` : ''}
      <div class="priceContainer">
        <slot name="fareImages"></slot>
        ${this.getMilesBody()}
        <!-- Money -->
        <div class="primaryText">
          <span>
            ${Math.abs(this.priceDifference).toLocaleString({}, {style: 'currency', currency: 'USD'})}
            ${this.getPriceLabel()}
          </span>
        </div>
        <div class="secondaryText">
          <span>${this.companionFare ? 'total' : 'per person'}</span>
        </div>
        ${this.getButton()}
      </div>
    `;
  }
}
if (!customElements.get('bundled-price-cell')) {
  customElements.define('bundled-price-cell', BundledPriceCell);
}
