import {css, html, LitElement, unsafeCSS} from 'lit-element';

import {isIE11} from '../../shared/utility';
import cacheFetch from '../../shared/cacheFetch';

class FlightAware extends LitElement {
  static get properties() {
    return {
      flightNumber: {type: String},
      departureDate: {type: String},
      status: {type: Object},
    };
  }

  static get styles() {
    return css`
      :host {
        font-size: 16px;
        font-family: var(--auro-font-family-default);
        color: var(--auro-color-text-secondary-on-light);
      }
      .equipment {
        display: inline-block;
      }
      .equipment-name {
        padding-left: var(--auro-size-xxs);
        min-width: 27px;
        text-align: right;
      }
      
    `;
  }

  async firstUpdated() {
    try {
      const statusJson = await cacheFetch(`https://www.alaskaair.com/statusbff/${this.flightNumber}/${this.departureDate}`, {responseParser: ((res) => res.json() )});
      this.status = statusJson;
    } catch (err) {
      console.error('Error fetching status ', err);
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
            ${isIE11() ? html`<style>${unsafeCSS(FlightAware.styles)}</style>` : ''}
              ${this.status && this.status.search && this.status.search.flights &&
                this.status.search.flights[0].flightAware ? html`
                <iframe src="${this.status.search.flights[0].flightAware}" noborder="0"></iframe>
              ` : html``}
        `;
  }
}

if (!customElements.get('flight-aware')) {
  customElements.define('flight-aware', FlightAware);
}
