import {css, html, LitElement} from 'lit-element';
import stylesCss from './styles-css.js';
import '@alaskaairux/auro-icon';

class fareUpsellSuccess extends LitElement {
  static get properties() {
    return {
      slim: {type: Boolean},
    };
  }

  static get styles() {
    return css`${stylesCss}`;
  }

  render() {
    return html`
      <div class="main">
        <p class="header"><span class="stronger">Excellent!</span> <slot name="header">You've been upgraded!</slot></p>
        ${!this.slim ? html`
          <div class="content-container">
            <div class="icon-container">
              <slot name="iconA">
                <auro-icon slot="iconA" class="icon--large" category="in-flight" name="luggage" customSize></auro-icon>
              </slot>
            </div>
            <div class="icon-container">
              <slot name="iconB">
                <auro-icon class="icon--large" category="terminal" name="flight-changes" customSize></auro-icon>
              </slot>
            </div>
            <div class="icon-container">
              <slot name="iconC">
                <auro-icon class="icon--large" category="terminal" name="lounge" customSize></auro-icon>
              </slot>
            </div>
            <div class="details-container">
              <p><strong>Now you’ll enjoy:</strong></p>
              <ul>
                <slot name="perk">
                  <li>Earlier Boarding</li>
                  <li>More Flexibility</li>
                  <li>Better Seats</li>
                </slot>
              </ul>
            </div>
          </div>
        ` : null}
      </div>
    `;
  }
}

if (!customElements.get('fare-upsell-success')) {
  customElements.define('fare-upsell-success', fareUpsellSuccess);
}
