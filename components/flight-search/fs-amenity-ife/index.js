import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class FSAmenityIfe extends LitElement {
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
            ${unsafeCSS(FSAmenityIfe.styles)}
          </style>` :
        ``}
      <div class="tooltipContainer">
        <h1 class="auro auro_heading auro_heading--400 header">
          Entertainment
        </h1>
        <p class="auro auro_heading auro_util_body--sm subtext">
          Free on-demand movies & TV shows streamed to your device. Over 200
          titles to choose from.
        </p>
      </div>
    `;
  }
}

if (!customElements.get('fs-amenity-ife')) {
  customElements.define('fs-amenity-ife', FSAmenityIfe);
}
