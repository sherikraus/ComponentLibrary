import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class FSTimeRangeRow extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      departureTimeMatch: {type: Boolean},
      previousTimeMatch: {type: Boolean},
      flight: {type: Number},
    };
  }

  static get styles() {
    return css`
      :host {
        font-size: 16px;
      }
      .timeRangeRow {
        font-family: var(--auro-font-family-default);
        font-size: 0.875em;
        color: var(--auro-color-border-focus-on-light);
      }
      .timeRange {
        background-color: var(--auro-color-base-gray-100);
        border: 1px solid var(--auro-color-base-gray-200);
        border-radius: 8px;
        padding: 8px;
        padding-left: 20px;
      }
    `;
  }

  timeRangeRow() {
    if (this.flight == 1) {
      if (this.departureTimeMatch) {
        return html` <div class="timeRange">Preferred times</div>`;
      } else {
        return html`
          <div class="timeRange">
            Preferred times are not available. All flight times are shown below.
          </div>
        `;
      }
    } else if (this.departureTimeMatch != this.previousTimeMatch) {
      return html` <div class="timeRange">Additional times</div>`;
    }
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
        ''}
      <div class="timeRangeRow">${this.timeRangeRow()}</div>
    `;
  }
}

if (!customElements.get('fs-time-range-row')) {
  customElements.define('fs-time-range-row', FSTimeRangeRow);
}
