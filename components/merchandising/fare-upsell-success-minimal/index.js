import {css, html, LitElement} from 'lit-element';
import stylesCss from './styles-css.js';
import '@alaskaairux/auro-icon';

class FareUpsellSuccessMinimal extends LitElement {
  static get properties() {
    return {
      fare: {type: String},
    };
  }

  static get styles() {
    return css`${stylesCss}`;
  }

  render() {
    return html`
      <div class="success-container">
        <span class="title">
          ${this.fare ?
            `Excellent! You've been upgraded to ${this.fare}. Enjoy your trip!` :
            'Excellent! You\'ve been upgraded. Enjoy your trip!'}
        </span>
        <span class="subtitle">
          <auro-icon class="success-icon" category="interface" name="check-filled" customColor></auro-icon>
          Upgraded
        </span>
      </div>
    `;
  }
}

if (!customElements.get('fare-upsell-success-minimal')) {
  customElements.define('fare-upsell-success-minimal', FareUpsellSuccessMinimal);
}
