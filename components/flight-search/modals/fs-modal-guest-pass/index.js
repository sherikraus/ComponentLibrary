import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../../shared/utility';
import '@alaskaairux/auro-hyperlink';
import '@alaskaairux/auro-interruption/dist/auro-dialog';

class FSModalGuestPass extends LitElement {
  static get properties() {
    return {
    };
  }

  static get styles() {
    return css`
      .message {
        color: var(--auro-color-text-secondary-on-light);
        font-family: var(--auro-font-family-default);
        font-size: var(--auro-text-heading-300-px);
      }

      .border {
        max-width: 600px;
        padding: var(--auro-size-xxxl);
      }
      .disclosure {
        padding-top: var(--auro-size-md);
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

  showModal(elName, event) {
    const upsell = this.shadowRoot.querySelector(elName);
    event.stopPropagation();
    upsell.removeAttribute('open');
    upsell.setAttribute('open', '');
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(FSModalGuestPass.styles)}</style>` : ''}
            <auro-dialog id="guest-pass-modal" md>
              <span slot="header">Guest pass</span>
              <div slot="content" class="message">
                <li>Travel is on a standby basis only</li>
                <li>Travel must be completed within 90 days</li>
                <li>Fully refundable</li>
                <li>No change fees</li>
                <li>Valid for coach fares only</li>
                <li>Upgrades are not allowed</li>
                <li>Unaccompanied minors under 13 years cannot use this fare</li>
                <div class="disclosure">
                Guest Pass fares offer tremendous savings on routes flown by Alaska Airlines and Horizon Air.
                </div>
              </div>
            </auro-dialog>
            <auro-hyperlink role="button" href="#" @click=${(event) => this.showModal('#guest-pass-modal', event)}>
            About Guest Passes</auro-hyperlink>
        `;
  }
}

if (!customElements.get('fs-modal-guest-pass')) {
  customElements.define('fs-modal-guest-pass', FSModalGuestPass);
}
