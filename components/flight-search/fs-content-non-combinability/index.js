import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../../generics/import-auro-components';
import stylesCss from './styles-css';
import '@alaskaairux/auro-popover';
import '@alaskaairux/auro-hyperlink';
import '../modals/fs-modal-compare-fares';

class FsContentNonCombinability extends LitElement {
  static get styles() {
    return css`
      ${stylesCss}
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

  clearSelectionsHandler() {
    /*eslint-disable*/
    ClearAllSelections();
    /* eslint-enable*/
  }

  launchCompareFares() {
    document.querySelector('#NoCombinedModal').style.display = 'none';
    document.querySelector('fs-modal-compare-fares').showModalBasic();
  }

  render() {
    return html`
      ${isIE11() ? html`<style>${unsafeCSS(FsContentNonCombinability.styles)}</style>` : ''}
      <div class="tooltip">
        <header class="auro_heading--400">
          Saver cannot be combined with other fare types.
        </header>
        <main>
          Choose a different fare type, or clear your current selections and pick other options.
        </main>
        <auro-hyperlink role="button" @click=${() => this.launchCompareFares()}>
          Learn more about fare types.
        </auro-hyperlink>
        <hr>
        <footer>
          <auro-button id="clear-selections" secondary @click=${() => this.clearSelectionsHandler()}>
            Clear all selections 
          </auro-button>
        </footer>
      </div>
        `;
  }
}

if (!customElements.get('fs-content-non-combinability')) {
  customElements.define('fs-content-non-combinability', FsContentNonCombinability);
}
