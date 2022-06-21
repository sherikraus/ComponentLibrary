import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../../shared/utility';
import styles from './styles-css';
import '@alaskaairux/auro-hyperlink';
import '../../../flight-results/fs-matrix-faretype-cell';
import '../fs-modal-compare-fares-tabbed';
import '../fs-modal-compare-fares-table';
import '@alaskaairux/auro-interruption/dist/auro-dialog';
import '@alaskaairux/auro-icon';

class FSModalCompareFares extends LitElement {
  static get properties() {
    return {
      mow: {type: Boolean},
      test: {type: Boolean},
      firstRender: {type: Boolean},
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

  showModal(elName, event) {
    if (!this.firstRender) {
      this.firstRender = true;
      return;
    }
    const upsell = this.shadowRoot.querySelector(elName);
    event.stopPropagation();
    upsell.removeAttribute('open');
    upsell.setAttribute('open', '');
  }
  showModalBasic() {
    const upsell = this.shadowRoot.querySelector('auro-dialog');
    upsell.removeAttribute('open');
    upsell.setAttribute('open', '');
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(FSModalCompareFares.styles)}</style>` : ''}
            ${this.firstRender ? html`
              ${this.test ? html`
                <auro-dialog id="compare-fares-modal" unformatted md lg ondark open>
                  <fs-modal-compare-fares-tabbed slot="content" class="Compare fares"></fs-modal-compare-fares-tabbed>
                </auro-dialog>
              ` : html`
                <auro-dialog id="compare-fares-modal" open>
                  <span slot="header">Compare Fares</span>
                  <fs-modal-compare-fares-table slot="content"></fs-modal-compare-fares-table>
                </auro-dialog>
              `}
            ` : html``}
            ${!this.mow ? html`<auro-hyperlink role="button" href="#" tabindex="0"
            @click=${(event) => this.showModal('#compare-fares-modal', event)}>
            Compare fare types</auro-hyperlink>` : html``}
            
        `;
  }
}

if (!customElements.get('fs-modal-compare-fares')) {
  customElements.define('fs-modal-compare-fares', FSModalCompareFares);
}
