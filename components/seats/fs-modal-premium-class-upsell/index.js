import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import {buildArbitraryHTML} from '../../shared/buildIcon';
import '../../flight-search/modals/fs-modal-tab';
import '../../flight-search/modals/fs-modal-compare-fares-table';
import '@alaskaairux/auro-icon';
import '@alaskaairux/auro-button';
import '@alaskaairux/auro-hyperlink';
import styles from './styles-css';

class FsModalPremiumClassModal extends LitElement {
  static get properties() {
    return {
      cabin: {type: String},
      notabs: {type: Boolean},
      pcImg4: {type: String},
    };
  }

  async firstUpdated() {
    this.pcImg4 = await buildArbitraryHTML('https://p2pcontentstorprod.blob.core.windows.net/icons/flight_changes.svg');
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
            <img src="${image}"/>
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
      case 'Main':
        return 'Get comfortable and stay connected in our Main Cabin.';
      case 'Premium Class':
        return 'Extra legroom for more personal space.';
      default:
        return html`&nbsp;`;
    }
  }

  renderBody() {
    switch (this.cabin) {
      case 'Main':
        return html`
          <span class="content-heading">
            Traveling in Main
          </span>
        <div class="class-product-containers">
          ${this.renderClassProduct('in-flight', 'seat',
      'Seating', 'More seating options than with Saver - including comfy new leather seats on select flights.')}
          ${this.renderClassProduct('terminal', 'plane-diag-stroke',
      'Inflight experience', 'Limited food and drink service available on trips over 350 miles.')}
          ${this.renderClassProduct('terminal', 'flight-changes',
      'Changes and cancellations', 'No change fees. Ever. Fare differences may apply.')}
        </div>
        `;
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
      ${this.renderPCClassProduct(
      'Priority boarding', 'Board early, access overhead bin space and be among the first to deplane.', 'https://p2pcontent-fd-prod.azurefd.net/icons/priority_boarding.png')}  
      </div>
        <div class="pcNoChanges">
          ${this.pcImg4}
          <span>No change fees. Ever. Fare differences may apply.</span>
        </div>
        `;
    }
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(FsModalPremiumClassModal.styles)}</style>` : ''}
            <div class="modal-container">
              <div class="imageCallout ${this.cabin}">
                <div class="modal-header-container">
                  <div class="modal-header">
                    ${this.cabin}
                  </div>
                  <div class="modal-subheader">
                    ${this.getClassTagline()}
                  </div>
                  <div class="tab-group">
                    ${this.notabs ? html`
                    ` : html`
                    <fs-modal-tab label="Main" ?selected=${this.cabin === 'Main'}
                      @click=${(evt) => this.clickClass(evt)}></fs-modal-tab>
                      <fs-modal-tab label="Premium Class" ?selected=${this.cabin === 'Premium Class'}
                        @click=${(evt) => this.clickClass(evt)}></fs-modal-tab>
                    `}
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

if (!customElements.get('fs-modal-premium-class-upsell')) {
  customElements.define('fs-modal-premium-class-upsell', FsModalPremiumClassModal);
}
