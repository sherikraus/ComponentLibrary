import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import {buildArbitraryHTML} from '../../shared/buildIcon';
import '../../flight-search/modals/fs-modal-tab';
import '../../flight-search/modals/fs-modal-compare-fares-table';
import '@alaskaairux/auro-icon';
import '@alaskaairux/auro-button';
import '@alaskaairux/auro-hyperlink';
import styles from './styles-css';

class FsModalPremiumClassSeatSelectionModal extends LitElement {
  static get properties() {
    return {
      heading: {type: String},
      beta: {type: Boolean},
      perGuest: {type: Boolean},
      disabilities: {type: Boolean},
      pcImg3: {type: String},
      pcImg4: {type: String},
    };
  }

  async firstUpdated() {
    this.pcImg3 = await buildArbitraryHTML('https://p2pcontentstorprod.blob.core.windows.net/icons/accessibility.svg');
    this.pcImg4 = await buildArbitraryHTML('https://p2pcontentstorprod.blob.core.windows.net/icons/flight_changes.svg');
    this.cabin = 'Premium Class';
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

  clickClass(evt) {
    const name = evt.target.getAttribute('label');
    this.cabin = name.split('focus-visible')[0];
  }

  renderClassProduct(iconCategory, iconName, heading, body) {
    return html`
      <div class="class-product-container">
      <auro-icon category="${iconCategory}" name="${iconName}"></auro-icon>
        <div class="class-product-details">
          <span class="class-product-heading">
            ${heading}
          </span>
          <span class="class-product-description">
            ${body}
          </span>
        </div>
      </div>
    `;
  }

  renderPCClassProduct(heading, body, image) {
    return html`
      <div class="class-product-container pc">

          <div class="class-product-heading-container">
            <span class="class-product-heading">
              ${heading}
            </span>
            <img class="${heading === 'No change fees' ? 'svg' : ''}" src="${image}"/>
          </div>

          <span class="class-product-description">
            ${body}
          </span>
        </div>
      </div>
    `;
  }

  getClassTagline() {
    switch (this.cabin) {
      case 'Premium Class':
        return 'Extra legroom for more personal space.';
      default:
        return html`&nbsp;`;
    }
  }

  renderBody() {
    switch (this.cabin) {
      case 'Premium Class':
        return html`
          <span class="content-heading">
            Benefits of Premium Class
          </span>
        <div class="class-product-containers">
          ${this.renderPCClassProduct(
      'More legroom', '4 inches more than standard Main Cabin seats.', 'https://p2pcontent-fd-prod.azurefd.net/icons/leg_room.png')}
          ${this.renderPCClassProduct(
      'Drinks', 'Enjoy free beer, wine and cocktails on flights over 350 miles.', 'https://p2pcontent-fd-prod.azurefd.net/icons/free_drink.png')}
                ${this.beta ? this.renderPCClassProduct(
    'No change fees', 'No change fees. Ever. Fare differences may apply.', 'https://p2pcontent-fd-test.azurefd.net/icons/flight_changes.svg') : html``}
      ${this.renderPCClassProduct(
      'Priority boarding', 'Board early, access overhead bin space and be among the first to deplane.', 'https://p2pcontent-fd-prod.azurefd.net/icons/priority_boarding.png')}   
      </div>
        ${this.beta ? html`` : html`
        <div class="pcDisclaimers">
          <div class="disclaimer">          
            ${this.pcImg4}
            <span>No change fees. Ever. Fare differences may apply.</span>
          </div>
          <div class="disclaimer">
            ${this.pcImg3}
            <span>This seat is designated for guests with disabilities. 
              You may be reassigned to a different seat at the crew's discretion.</span>
          </div>
        </div>
        `}

        `;
    }
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(FsModalPremiumClassSeatSelectionModal.styles)}</style>` : ''}
            <div class="modal-container">
              <div class="imageCallout ${this.cabin}">
                <div class="modal-header-container">
                  <div class="modal-header">
                    ${this.heading}
                    ${this.perGuest? html`
                      <span class="perGuest">per guest</span>
                    `: html``}
                  </div>
                  <div class="modal-subheader">
                    ${this.getClassTagline()}
                  </div>
                </div>
              </div>
              <div class="modal-body">
              ${this.renderBody()}
              </div>
            </div>
        `;
  }
}

if (!customElements.get('fs-modal-premium-class-seat-selection')) {
  customElements.define('fs-modal-premium-class-seat-selection', FsModalPremiumClassSeatSelectionModal);
}
