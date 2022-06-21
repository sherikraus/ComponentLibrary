import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class FSMatrixPriceCell extends LitElement {
  static get properties() {
    return {
      price: {type: Number},
      mixedCabin: {type: Boolean},
      lowestPrice: {type: Boolean},
      fareType: {type: String},
      companionPrice: {type: Number},
      infantPrice: {type: Number},
      seatsRemaining: {type: String},
      selected: {type: Boolean},
      fareIndex: {type: String},
      onClick: {type: String},
      MixedCabinImage: {type: Boolean},
      DiscountFareImage: {type: Boolean},
      MixedCabinIcon: {type: String},
      DiscountIcon: {type: String},
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-size: 16px;
      }
      .cell-container {
        border: 1px solid var(--auro-color-border-disabled-on-light);
        border-bottom-width: var(--auro-size-xxs);
        text-align: center;
        width: 100%;
        min-height: 116px;
        max-height: 150px;
      }
      .flight-cell-price {
        display: block;
        color: var(--auro-color-text-primary-on-light);
        font-size: 18px !important;
        margin: 0 !important;
        padding-bottom: var(--auro-size-sm);
      }
      .fare-saver {
        border-bottom-color: #48a9c5;
      }
      .fare-saver.selected {
        background-color: #48a9c5;
      }
      .fare-main {
        border-bottom-color: #2774ae;
      }
      .fare-main.selected {
        background-color: #2774ae;
        color: white;
      }
      .fare-first {
        border-bottom-color: #01426a;
      }
      .fare-first.selected {
        background-color: #01426a;
        color: white;
      }
      .few-seats-remaining {
        vertical-align: middle;
        padding-bottom: var(--auro-size-xs);
        font-size: 14px !important;
        color: var(--auro-color-text-secondary-on-light);
      }
      .ondark-secondary {
        color: white;
      }
      .ondark-primary {
        color: var(--auro-color-text-primary-on-dark);
      }
      .content-container {
        padding-top: var(--auro-size-lg);
      }
      .none {
        padding-bottom: 12px;
      }
    `;
  }

  toggleSelected() {
    this.selected = !this.selected;
    const dialog = document.querySelector('auro-dialog');

    dialog.addEventListener('clearFares', (evt) => {
      this.selected = false;
    });
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

  clickHandler() {
    this.dispatchEvent(new CustomEvent('fareClick', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  render() {
    this.MixedCabinIcon =
      'https://p2pcontent-fd-prod.azurefd.net/icons/mixedCabin.png';
    this.DiscountIcon =
      'https://p2pcontent-fd-prod.azurefd.net/icons/discount.png';
    return html`
      ${isIE11() ?
        html`<style>
            ${unsafeCSS(this.styles)}
          </style>` :
        ``}
      <div
        id="fare-container"
        class="auro cell-container fare-${this.fareType}  ${this.selected ?
          'selected' :
          ''}"
        onclick=${this.onClick}
        @click=${this.clickHandler}
      >
        <div class="content-container">
          ${this.price > 0 ?
            html` ${this.seatsRemaining ?
                  html` <span
                      class="
                  ${this.selected &&
                      (this.fareType === 'main' || this.fareType === 'first') ?
                        'ondark-secondary' :
                        ''} few-seats-remaining "
                      id="seats-remaining"
                    >
                      ${this.seatsRemaining ? this.seatsRemaining : ''}
                    </span>` :
                  ``}
                <span
                  id="price"
                  class="auro_heading auro_heading--300 heading--300
                ${this.selected &&
                  (this.fareType === 'main' || this.fareType === 'first') ?
                    'ondark-primary' :
                    ''} 
                flight-cell-price "
                >
                  $${this.price.toFixed(0)}
                  ${this.MixedCabinImage ?
                    html`<span><img src=${this.MixedCabinIcon} /></span>` :
                    ``}
                  ${this.DiscountFareImage ?
                    html`<span><img src=${this.DiscountIcon} /></span>` :
                    ``}
                </span>

                <input type="radio" @click=${this.toggleSelected} />` :
            html`<span class="few-seats-remaining none" id="no-seats"
                >N/A</span
              >`}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('fs-matrix-price-cell')) {
  customElements.define('fs-matrix-price-cell', FSMatrixPriceCell);
}
