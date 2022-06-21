import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import {buildIcon} from '../../shared/buildIcon';
import airlines from '../../../hooks/airlines-data';

class Airline extends LitElement {
  static get properties() {
    return {
      iata: {type: String},
      long: {type: Boolean},
      short: {type: Boolean},
      full: {type: Boolean},
      tail: {type: Boolean},
      image: {type: Boolean},
      imageMd: {type: Boolean},
      imageLg: {type: Boolean},
      imageXl: {type: Boolean},
      airlines: {type: Array},
      img: {type: String},
      primary: {type: Boolean},
      sm: {type: Boolean},
      airlineName: {type: String},
      colon: {type: Boolean},
    };
  }

  airline = null;

  static get styles() {
    return css`
      :host {
        font-size: 16px;
        font-family: var(--auro-font-family-default);
        color: var(--auro-color-text-secondary-on-light);
      }
      .primary {
        font-size: 18px;
        color: var(--auro-color-text-primary-on-light);
      }
      .airline {
        display: inline-flex;
        align-items:center;
      }
      .airline svg{
        height: 20px !important;
        width: unset!important;
        max-width: 40px;
        min-width: 40px;
      }
      .imageMd svg{
        height: 24px !important;
        width: 24px !important;
        max-width: unset;
        min-width: unset;
      }
      .imageLg svg{
        height: 28px !important;
        width: 28px !important;
        max-width: unset;
        min-width: unset;
      }
      .imageXl svg{
        height: 48px !important;
        width: 48px !important;
        max-width: unset;
        min-width: unset;
      }
      
      .airline-name {
        padding-left: var(--auro-size-xxs);
        min-width: 27px;
      }
      .sm {
        font-size: 16px;
        line-height: 24px;
      }
    `;
  }

  async firstUpdated() {
    // optimize to load simultaneously
    if (this.tail) {
      this.img = await buildIcon('tail-' + this.iata);
      if (this.img.nodeName === 'ERROR') {
        this.img = await buildIcon('logos/logo-' + this.iata);
      }
    } else {
      this.img = await buildIcon('logos/logo-' + this.iata);
    }
    if (this.img.nodeName === 'ERROR') {
      this.img = null;
    }
    this.airline = airlines.find((airline) => airline.code == this.iata.trim().toUpperCase());
    this.airlineName = '';
    if (this.airline) {
      if (this.long) {
        this.airlineName = this.airline.code;
      } else if (this.full) {
        this.airlineName = this.airline.name;
      } else if (this.short) {
        this.airlineName = this.airline.shortName;
      }
    } else {
      console.error('Error fetching airline ', this.iata);
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
        ${isIE11() ? html`<style>${unsafeCSS(Airline.styles)}</style>` : ''}
        <div class="airline ${this.imageMd ? 'imageMd' : ``} ${this.imageLg ? 'imageLg' : ``} 
        ${this.imageXl ? 'imageXl' : ``} 
        ${this.primary ? 'primary' : ``}
        ${this.sm ? 'textSm' : ``}">
          ${this.image? this.img : ``}
          ${this.airlineName ? html`
          <div class="auro util_body--sm airline-name">
            ${this.airlineName}${this.colon ? ':' : ''} <slot></slot>
          </div>
          ` : html``}

        </div>
    `;
  }
}

if (!customElements.get('airline-helper')) {
  customElements.define('airline-helper', Airline);
}
