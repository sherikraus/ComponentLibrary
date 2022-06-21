import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class FSAmenityWifi extends LitElement {
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
            ${unsafeCSS(FSAmenityWifi.styles)}
          </style>` :
        ``}
      <div class="tooltipContainer">
        <h1 class="auro auro_heading auro_heading--400 header">
          Wi-Fi Available for Purchase
        </h1>
        <p class="auro auro_heading auro_util_body--sm subtext">
          Stay connected while you fly with inflight wireless internet.<br /><br />
          Inflight Wi-Fi availability is subject to change without notice and
          will not be available when flying over Latin America, the Pacific
          Ocean and portions of Canada and Alaska.
        </p>
      </div>
    `;
  }
}

if (!customElements.get('fs-amenity-wifi')) {
  customElements.define('fs-amenity-wifi', FSAmenityWifi);
}
