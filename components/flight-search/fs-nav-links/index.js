import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class FSNavLinks extends LitElement {
  static get properties() {
    return {
      ChangeAvailSearch: {type: String},
      ClearAllSelections: {type: String},
    };
  }

  constructor() {
    super();
    this.ChangeAvailSearch = 'javascript:ChangeAvailSearch();';
    this.ClearAllSelections = 'javascript:ClearAllSelections();';
  }

  clickHandler() {
    const dialog = document.querySelector('auro-dialog');

    dialog.dispatchEvent(new CustomEvent('clearFares', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  static get styles() {
    return css`
      .navLinks {
        text-align: right;
        display: inline;
      }
      a,
      a.visited {
        display: block;
        margin-bottom: var(--auro-size-sm);
        margin-top: var(--auro-size-sm);
        color: var(--auro-color-text-link-on-light);
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
      <div class="navLinks">
        <a href=${this.ChangeAvailSearch}>Change search</a>
        <a href=${this.ClearAllSelections} @click=${this.clickHandler}>Clear all selections</a>
      </div>
    `;
  }
}

if (!customElements.get('fs-nav-links')) {
  customElements.define('fs-nav-links', FSNavLinks);
}
