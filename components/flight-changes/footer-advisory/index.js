import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class FooterAdvisory extends LitElement {
  static get properties() {
    return {
      footerAdvisories: {type: Array},
      messagesFromProps: {type: String},
    };
  }

  async firstUpdated() {
    if (this.footerAdvisories) {
      this.messagesFromProps = this.footerAdvisories.map((advisory, idx) => html`
        <div class="message" id="item-${idx+1}">
          ${advisory}
        </div>
      `);
    } else {
      this.messagesFromProps = '';
    }
  }

  static get styles() {
    return css`
      :host {
        font-family: 'ASCircular-Book';
      }
      
      .footerContainer {
        color: var(--auro-color-text-secondary-on-light);
        font-size: 12px;
        font-weight: 300;
        line-height: 16px;
        padding: 1rem 0 1rem 0;
        width: 100%;
      }
      
      ::slotted(*), .message {
        padding: 0.5rem 0 !important;
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
      ${isIE11() ? html`<style>${unsafeCSS(FooterAdvisory.styles)}</style>` : ''}
      <div class="footerContainer">
        <slot name="message">
          ${this.messagesFromProps}
        </slot>
      </div>
    `;
  }
}

if (!customElements.get('footer-advisory')) {
  customElements.define('footer-advisory', FooterAdvisory);
}
