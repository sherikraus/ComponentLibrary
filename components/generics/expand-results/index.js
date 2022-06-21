import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import assignIconFromProperty from '../../shared/buildIcon';
import '@alaskaairux/auro-button';

class ExpandResults extends LitElement {
  static get properties() {
    return {
      shown: {type: Number, reflect: true},
      total: {type: Number, reflect: true},
      min: {type: Number, attribute: false},
      plusIcon: {type: String, attribute: false},
      minusIcon: {type: String, attribute: false},
      icon: {type: String, attribute: false},
      text: {type: String, attribute: false},
      showingAll: {type: Boolean, attribute: false},
    };
  }

  constructor() {
    super();
    this.showingAll = false;
    this.buttonText = 'Show more results';
  }

  async firstUpdated() {
    this.plusIcon = await assignIconFromProperty(this.plusLg, 'plus-lg');
    this.minusIcon = await assignIconFromProperty(this.minusLg, 'minus-lg');
    this.icon = this.plusIcon;
  }

  static get styles() {
    return css`
      .icon {
        display: inline-block;
        vertical-align: middle;
        height: 26px !important;
        width: 26px !important;
      }

      .icon svg path {
        fill: var(--auro-color-icon-accent-on-light);
      }

      .subtext {
        text-align: center;
        font-family: var(--auro-font-family-default);
        color: var(--auro-color-text-secondary-on-light);
        font-size: 12px;
      }

      .container {
        display: flex;
        align-items: center;
      }

      .button {
        display: inline-block;
      }

      .line {
        display: inline-block;
        flex: 1;
        background-color: var(--auro-color-border-disabled-on-light);
        height: var(--auro-border-width-thick);
      }
    `;
  }

  toggleResults() {
    if (this.showingAll === true) {
      this.icon = this.plusIcon;
      this.buttonText = 'Show more results';
      this.shown = this.min;
      if (typeof showFewerResults !== 'undefined') {
        showFewerResults();
      }
    } else {
      this.icon = this.minusIcon;
      this.buttonText = 'Show fewer results';
      this.min = this.shown;
      this.shown = this.total;
      if (typeof showMoreResults !== 'undefined') {
        showMoreResults();
      }
    }
    this.showingAll = !this.showingAll;
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
      ${isIE11() ? html`<style>${unsafeCSS(ExpandResults.styles)}</style>` : ''}
      <div class="container">
        <div class="line"></div>
        <auro-button class="button" tertiary @click=${this.toggleResults} title="${this.buttonText}">
          <div class="icon">${this.icon ? this.icon : ``}</div>
          ${this.buttonText}
        </auro-button>
        <div class="line"></div>
      </div>
      <div class="subtext">Showing ${this.shown} of ${this.total}</div>
    `;
  }
}

if (!customElements.get('expand-results')) {
  customElements.define('expand-results', ExpandResults);
}
