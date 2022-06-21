import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import airports from '../../../hooks/airports-data';

class Airport extends LitElement {
  static get properties() {
    return {
      iata: {type: String, reflect: true},
      code: {type: Boolean},
      long: {type: Boolean},
      full: {type: Boolean},
      large: {type: Boolean},
      heading: {type: Boolean},
      secondary: {type: Boolean},
      index: {type: String},
    };
  }

  airport = null;

  static get styles() {
    return css`
      :host {
        font-size: 16px;
        font-family: var(--auro-font-family-default);
        color: var(--auro-color-text-primary-on-light);
      }
      .airport {
        display: inline-block;
      }
      .airport-name {
        min-width: 27px;
      }
      .airport-name.secondary {
        color: var(--auro-color-text-secondary-on-light);
        font-size: 18px;
        padding-left: unset;
      }

      .airport-name.large {
        font-size: 24px;
        line-height: 32px;
        font-weight: 500;
      }

      .airport-name.heading {
        font-size: 36px;
        font-weight: 400;
        line-height: 44px;
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
    let displayName = '';
    let longName = '';
    this.airport = airports.find((airport) => airport.code === this.iata.trim().toUpperCase());
    const displayCode = !isNaN(this.iata.substring(2, 3)) ? 'All Airports': this.iata;
    this.airport = airports.find((airport) => airport.code == this.iata);
    if (this.airport) {
      if (this.long) {
        displayName = this.airport.itmName;
      } else if (this.full) {
        displayName = this.airport.name;
        if (this.code) {
          displayName += ' (' + displayCode + ')';
        }
      } else {
        displayName = this.airport.code;
      }
      longName = this.airport.name;
    } else {
      console.error('Error fetching airport ', this.iata);
    }
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(Airport.styles)}</style>` : ''}
            <div class="airport" id="${this.index}">
              <div class="auro util_body--sm airport-name ${this.large ? 'large':``}
               ${this.secondary ? 'secondary' : ``} 
               ${this.heading ? 'heading':``}" title="${longName}">
                ${displayName}
              </div>
            </div>
        `;
  }
}
if (!customElements.get('airport-helper')) {
  customElements.define('airport-helper', Airport);
}
