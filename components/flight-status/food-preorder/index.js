import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '@alaskaairux/auro-interruption/dist/auro-dialog';
import '../food-menu';
import styles from './styles-css';

class FoodPreorder extends LitElement {
  static get properties() {
    return {
      preOrderEligible: {type: Boolean},
      pnr: {type: String},
      lastName: {type: String},
      menuEligible: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      ${styles}

    `;
  }

  handleMenu() {
    this.dispatchEvent(new CustomEvent('menuClicked', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
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
            ${isIE11() ? html`<style>${unsafeCSS(FoodPreorder.styles)}</style>` : ''}
            <div class="upsellContainer">
              <div class="imageContainer">
                <img src="https://www.alaskaair.com/-/media/E9359AA3A3364E2C96F7A9AABA5C6BF4"></img>
              </div>
              <div class="contentContainer">
                <h3>Our kind of meal prep</h3>
                <p>Great trips call for great planning! Pre-order your
                  snacks beforehand on the 
                  <auro-hyperlink href="https://www.alaskaair.com/content/mobile/mobile-apps"> 
                  Alaska app </auro-hyperlink> or at <auro-hyperlink href="https://www.alaskaair.com">
                  alaskaair.com</auro-hyperlink>.
                  <br /><br />
                  <strong>Note:</strong> Pre-ordering ends 20 hours before your flight.
                </p>
                ${this.preOrderEligible ? html`
                  ${this.pnr && this.lastName ? html `
                    <auro-hyperlink cta 
                    href="
            ${`https://www.alaskaair.com/preorderfood?lastName=${this.lastName}&pnr=${this.pnr}&src=flightstatus`}">
            Place an order</auro-hyperlink>
                  ` : html`
                  <auro-hyperlink cta role="button" href="#" @click=${this.handleMenu}>
                  Preview full menu</auro-hyperlink>
                  `}
                ` : html`
                <auro-hyperlink cta role="button" href="#" @click=${this.handleMenu}>
                  Preview full menu</auro-hyperlink>
                `}

              </div>
            </div>
        `;
  }
}

if (!customElements.get('food-preorder')) {
  customElements.define('food-preorder', FoodPreorder);
}
