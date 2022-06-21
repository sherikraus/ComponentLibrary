import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class FSAvailabilityHeader extends LitElement {
  static get properties() {
    return {
      headerText: {type: String},
    };
  }

  static get styles() {
    return css`
      :host {
        font-size: 16px;
      }
      .header {
        display: inline;
        font-family: "AS Circular";
        font-weight: 300;
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
      <h1 class="auro auro_heading auro_heading--700 header">
        ${this.headerText}
      </h1>
    `;
  }
}

if (!customElements.get('fs-availability-header')) {
  customElements.define('fs-availability-header', FSAvailabilityHeader);
}
