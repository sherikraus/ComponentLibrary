import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../../generics/import-auro-components';
import stylesCss from './styles-css';
import '@alaskaairux/auro-popover';
import '@alaskaairux/auro-hyperlink';

class FsPopoverNonCombinability extends LitElement {
  static get properties() {
    return {
      isCool: {type: Boolean},
      clearHandler: {type: String},
      learnMoreUrl: {type: String},
    };
  }

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

  render() {
    const learnMoreUrl = !!this.learnMoreUrl ? this.learnMoreUrl : '#';
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(FsPopoverNonCombinability.styles)}</style>` : ''}
            <auro-popover for="mouseover-target" class="tooltip" sm>
              <header class="auro_heading--400">
                Saver cannot be combined with other fare types.
              </header>
              <main>
                Choose a different fare type, or clear your current selections and pick other options.
              </main>
              <auro-hyperlink href=${learnMoreUrl}>Learn more</auro-hyperlink> about fare types.
              <hr>
              <footer>
                <auro-button id="clear-selections" secondary>Clear all selections </auro-button>
              </footer>

              <auro-button id="mouseover-target" slot="trigger">Show popover</auro-button>
            </auro-popover>
        `;
  }
}

if (!customElements.get('fs-popover-non-combinability')) {
  customElements.define('fs-popover-non-combinability', FsPopoverNonCombinability);
}
