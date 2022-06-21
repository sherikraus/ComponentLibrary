import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11, wrapWithSlot} from '../../shared/utility';
import '@alaskaairux/auro-alerts';
import '@alaskaairux/auro-hyperlink';


class QuarantineMessageBanner extends LitElement {
  static get styles() {
    return css`
      .quarantine-message-component-container {
        font-family: var(--auro-font-family-default);
        font-size: 16px;
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
            ${isIE11() ? html`<style>${unsafeCSS(QuarantineMessageBanner.styles)}</style>` : ''}
            <div class='quarantine-message-component-container'>
              <auro-alerts fixed information>
                ${wrapWithSlot('message', html`
                  <strong>Hawaii travelers: </strong>
                  <span>
                    Starting October 15, 2020 Hawaii's pre-travel testing program exempts guests from the 14-day 
                    quarantine with proof of a negative COVID-19 test that has been collected within 72 hours before 
                    departure. 
                  </span>
                  <auro-hyperlink href='https://www.alaskaair.com/content/advisories/travel-advisories#hawaii' target='_blank'>Learn more</auro-hyperlink>
                `)}
              </auro-alerts>
            </div>
        `;
  }
}
if (!customElements.get('quarantine-message-banner')) {
  customElements.define('quarantine-message-banner', QuarantineMessageBanner);
}
