import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class fsMatrixHeader extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      matrixLabel: {type: String},
      displayTrips: {type: Array},
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        font-size: 16px;
      }
      .matrixHeader {
        font-family: var(--auro-font-family-default);
      }
      .itinerary {
        font-size: 0.875em;
        font-weight: var(--auro-text-body-default-weight);
        color: var(--auro-color-text-body-on-light);
        margin-bottom: var(--auro-size-xxxs);
      }
      .chooseHeader {
        font-size: 1.25em;
        font-weight: var(--auro-text-heading-default-weight);
        color: var(--auro-color-text-primary-on-light);
        margin-bottom: 8px;
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
      <div class="auro matrixHeader">
        <div class="chooseHeader" id="choose-header">
          Choose ${this.matrixLabel.toLowerCase()}:
        </div>
        ${this.displayTrips.map(
      (trip) => html` <div id="itinerary-header" class="itinerary">
            ${trip}
          </div>`,
  )}
      </div>
    `;
  }
}

if (!customElements.get('fs-matrix-header')) {
  customElements.define('fs-matrix-header', fsMatrixHeader);
}
