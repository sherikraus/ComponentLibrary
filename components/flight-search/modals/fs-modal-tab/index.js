import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../../shared/utility';
import styles from './styles-css';

class FsModalTab extends LitElement {
  static get properties() {
    return {
      label: {type: String},
      selected: {type: Boolean},
      large: {type: Boolean},
    };
  }

  static get styles() {
    return css`
    ${styles}
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
            ${isIE11() ? html`<style>${unsafeCSS(FsModalTab.styles)}</style>` : ''}
            <button class="${this.selected ? 'selected' : ''} ${this.large ? 'large' : ''}">${this.label}</button>
        `;
  }
}

if (!customElements.get('fs-modal-tab')) {
  customElements.define('fs-modal-tab', FsModalTab);
}
