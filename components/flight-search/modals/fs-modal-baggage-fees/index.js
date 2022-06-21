import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../../shared/utility';
import '@alaskaairux/auro-hyperlink';
import '@alaskaairux/auro-interruption/dist/auro-dialog';

class FSModalBaggageFees extends LitElement {
  static get styles() {
    return css`
      .message {
        color: var(--auro-color-text-secondary-on-light);
        font-size: var(--auro-text-heading-300-px);
      }

      .border {
        max-width: 600px;
        padding: var(--auro-size-xxxl);
      }

      .modal-hyperlink-text {
        color: var(--auro-color-text-link-on-light);
        text-decoration: none;
        cursor: pointer;
      }

      .modal-hyperlink-text:hover {
        color: var(--auro-color-ui-hover-on-light);
        text-decoration: underline;
      }

      .modal-text {
        color: var(--auro-color-text-secondary-on-light);
        margin: 0;
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
            ${isIE11() ? html`<style>${unsafeCSS(AboutBaggageFees.styles)}</style>` : ''}
            <auro-dialog id="baggage-fee-modal" md>
              <span slot="header">About baggage fees</span>
              <aside slot="content">
                <p class="message">
                When traveling on Alaska Airlines flights, Alaska Airlines checked baggage fees may apply.
                See <auro-hyperlink href="/bagrules">alaskaair.com/bagrules</auro-hyperlink> for our rules.
                For itineraries that include other airlines,
                their checked baggage fees may apply, as displayed on their websites.
                </p>
                
                <p class="message">
                Baggage rules and fees will be based on the specific itinerary chosen.
                The applicable first and second bag fees will be displayed after you 
                have added flights to the cart.
                </p>
              </aside>
            </auro-dialog>
            <p class="modal-text">
              <auro-hyperlink class="modal-hyperlink-text" tabindex="0"
              @click=${(event) => this.showModal('#baggage-fee-modal', event)}>
              Baggage fees may apply</auro-hyperlink>
            </p>
        `;
  }
}

if (!customElements.get('fs-modal-baggage-fees')) {
  customElements.define('fs-modal-baggage-fees', FSModalBaggageFees);
}
