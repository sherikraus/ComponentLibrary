import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../../shared/utility';
import '@alaskaairux/auro-button';
import '../../../generics/airline-helper/index.js';
import '../../../generics/airport-helper/index.js';
import '@alaskaairux/auro-interruption/dist/auro-dialog';

class fsModalMixedCabin extends LitElement {
  static get properties() {
    return {
      Segments: {type: Array},
      Class: {type: String},
      Cabins: {type: Array},
      acceptHandler: {type: String},
    };
  }

  static get styles() {
    return css`
    :host {
      font-family: var(--auro-font-family-default);
    }
      .segment {
        display: flex;
      }
      .buttons {
        padding-top: var(--auro-size-xl);
        text-align: right;
      }
      .childText {
        padding: var(--auro-size-xxs);
        color: var(--auro-color-text-primary-on-light);
        min-width: 45px;
        text-align: left;
      }
      .childText.flight {
        color: var(--auro-color-text-secondary-on-light);
        min-width: 38px;
      }
      .customElement {
        padding-top: 4px;
        min-width: 50px;
        text-align: left;
      }
      .customElement.logo{
        min-width: 120px;
      }
      .customElement.right {
        text-align: right;
        padding-right: var(--auro-size-sm);
      }
      .to {
        padding: var(--auro-size-xxs) var(--auro-size-xs);
        color: var(--auro-color-text-primary-on-light);
        text-align: left;
      }
      .content-heading{
        font-weight: var(--auro-text-body-default-weight);
        font-size: 18px;
        color: var(--auro-color-text-secondary-on-light);
      }
      .button {
        padding-right: var(--auro-size-md);
      }
    `;
  }

  cancelHandler() {
    document.querySelector('auro-dialog').removeAttribute('open');
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
            ${isIE11() ? html`<style>${unsafeCSS(fsModalMixedCabin.styles)}</style>` : ''}
            <p class="content-heading">This itinerary is not entirely in ${this.Class}.</p>
            ${this.Segments.map((seg, idx) =>
    html`
              <div class="segment">
                <airline-helper  class="customElement logo" iata="${seg.Carrier}" image long>
                  <span class="auro util_body--sm childText flight" id="flight-number">${seg.FlightNumber}</span>
                </airline-helper>
                <airport-helper class="customElement" iata="${seg.DepartureStation}" code></airport-helper>
                <span class="to">to</span>
                <airport-helper class="customElement right" iata="${seg.ArrivalStation}" code></airport-helper>
                <span class="childText">${this.Cabins[idx]}</span>
              </div>

              `,
  )}
            <div class="buttons">
              <auro-button secondary class="button" @click="${this.cancelHandler}" >Cancel</auro-button>
              <auro-button onclick="${this.acceptHandler}">Continue</auro-button>
            </div>
        `;
  }
}

if (!customElements.get('fs-modal-mixed-cabin')) {
  customElements.define('fs-modal-mixed-cabin', fsModalMixedCabin);
}
