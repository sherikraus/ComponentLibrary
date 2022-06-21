import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class FSAmenityPower extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        font-size: 16px;
        font-family: "AS Circular";
      }
      .tooltipContainer {
        max-width: 384px;
        min-width: 384px;
      }
      .header {
        color: var(--auro-color-text-primary-on-light);
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-top: 0px;
        margin-bottom: 12px;
      }
      .subtext {
        color: var(--auro-color-text-secondary-on-light);
        font-size: 14px;
        line-height: 20px;
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
            ${unsafeCSS(FSAmenityPower.styles)}
          </style>` :
        ``}
      <div class="tooltipContainer">
        <h1 class="auro auro_heading auro_heading--400 header">
          110V Power at Your Seat
        </h1>
        <p class="auro auro_heading auro_util_body--sm subtext">
          Keep your devices fully charged with 110V power at your seat.
          <br /><br />
          Availability may vary by cabin or seat assignment and is subject to
          change without notice. Please check with the operating carrier for
          details.
        </p>
      </div>
    `;
  }
}

if (!customElements.get('fs-amenity-power')) {
  customElements.define('fs-amenity-power', FSAmenityPower);
}
