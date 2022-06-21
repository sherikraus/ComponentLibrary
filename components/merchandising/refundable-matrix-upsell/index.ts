import { css, html, LitElement, property } from 'lit-element';
import stylesCss from './styles-css.js';
import '@alaskaairux/auro-button';
import '@alaskaairux/auro-icon';

class RefundableMatrixUpsell extends LitElement {
  @property({ type: Number })
  priceDifference: Number | undefined = undefined;

  @property({ type: Number })
  maxBonusMiles: Number | undefined = undefined;

  @property({ type: Object })
  reset: boolean = false;

  @property({ type: Boolean, attribute: false })
  upgraded: boolean = false;

  constructor() {
    super();
    this.upgraded = false;
  }

  static override styles = css`${stylesCss}`;

  onUpgradeOrRevert() {
    const eventToDispatch = this.upgraded ? new Event('onRevert') : new Event('onUpgrade');
    this.upgraded = !this.upgraded;
    this.dispatchEvent(eventToDispatch);
  }

  showPricing = (price: Number) => html`
      <div class="price-container">
        <div class="total-price">+$${price} USD</div>
        <div class="text-secondary">Refundable itinerary</div>
      </div>
      `;

  refundStatus = () => html`
      <div class="price-container">
        <auro-icon class="check-icon" category="interface" name="check-filled" customColor>
        </auro-icon>
        <div class="text-secondary">Full itinerary is now refundable!</div>
      </div>
      `;

  mileagePlanText = () => this.maxBonusMiles ? html`<p>Mileage Plan members get up to 
  ${this.maxBonusMiles}% bonus on base <span class="no-break">miles earned.</span></p>`
  : html`<p>You must change or cancel your reservation before your 
    flight <span class="no-break">departs for refund.</span></p>`;

  resetComponent() {
    this.upgraded = this.reset = false;
    }
  
  render() {
    this.reset && this.resetComponent();
    const buttonText: string = (this.upgraded) ? 'Remove' : 'Make refundable';

    return html`
      <div class="container">
        <div class="text-section">
          <div class="header">
            <slot name="title">
              Make your complete itinerary refundable
            </slot>
          </div>
          <div>
            <div class="content">
              <slot name="sub-title">
                <p>Get all your money back if you change <span class="no-break">your mind</span></p>
              </slot>
              <div class="content-items">
                <div class="content-details">
                  <auro-icon class="icon green-icon" category="payment" name="credit-card" customColor>
                  </auro-icon>
                  <p>Fares are fully refundable to your original <span class="no-break">form of payment.</span></p>
                </div>
                <div class="content-details">
                  <auro-icon class="icon green-icon" category="terminal" name="plane-diag-fill" customColor>
                  </auro-icon>
                    ${this.mileagePlanText()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="refundable">
          ${(this.upgraded) ? this.refundStatus() : this.showPricing(this.priceDifference)}
          <auro-button responsive secondary @click="${this.onUpgradeOrRevert}">
            ${buttonText}
          </auro-button>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('refundable-matrix-upsell')) {
  customElements.define('refundable-matrix-upsell', RefundableMatrixUpsell);
}

declare global {
  interface HTMLElementTagNameMap {
    'refundable-matrix-upsell': RefundableMatrixUpsell;
  }
}
