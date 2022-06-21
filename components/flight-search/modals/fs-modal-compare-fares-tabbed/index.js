import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../../shared/utility';
import assignIconFromProperty from '../../../shared/buildIcon';
import '../fs-modal-tab';
import '../fs-modal-compare-fares-table';
import '../../../flight-changes/footer-advisory';
import '@alaskaairux/auro-icon';
import '@alaskaairux/auro-button';
import styles from './styles-css';

class FsModalCompareFaresTabbed extends LitElement {
  constructor() {
    super();
    this.collapsed = true;
  }
  static get properties() {
    return {
      class: {type: String},
      collapsed: {type: Boolean},
      accordionIcon: {type: String},
    };
  }

  toggleAccordion() {
    this.collapsed = !this.collapsed;
  }

  async firstUpdated() {
    this.accordionIcon = await assignIconFromProperty(this.accordionIcon, 'chevron-down');
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
    this.class = evt.target.getAttribute('label');
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

  getClassTagline() {
    switch (this.class) {
      case 'Saver':
        return 'Fly our basic economy experience (restrictions apply.)';
      case 'Main':
        return 'Get comfortable and stay connected in our Main Cabin.';
      case 'Premium Class':
        return 'Stretch out and enjoy some space in our Premium Class.';
      case 'First Class':
        return 'Expect a gracious and welcoming experience every step (and mile) of the way.';
      default:
        return html`&nbsp;`;
    }
  }

  renderBody() {
    const footnotes = ['1. Seats unavailable during purchase will be assigned in the main cabin at the gate.' +
    ' This option is not recommended to parties of two or more.', '2. Guests traveling on Saver fares board ' +
     'last, but Elite Mileage Plan members may board with their group. Overhead bin space is on a first-come' +
      ', first-served basis. Guests are allowed one carry-on + one personal item.', '3. Our 24-hour cancella' +
       'tion policy applies to all fares, including Saver fares. Changes are not otherwise permitted for Sav' +
        'er fares.'];
    switch (this.class) {
      case 'Saver':
        return html`
          <span class="content-heading">
            Traveling in Saver
          </span>
          <div class="class-product-containers">
            ${this.renderClassProduct('in-flight', 'seat',
      'Seating', 'Limited seat selection when you purchase, seats assigned at check-in.')}
            ${this.renderClassProduct('terminal', 'plane-diag-stroke',
      'Inflight experience', 'Beverage service, with beer and wine available for purchase.')}
            ${this.renderClassProduct('terminal', 'flight-changes',
      'Changes and cancellations',
      'No changes allowed. Saver fares may be canceled within the first 24 hours for a full refund.')}
          </div>
          <div class="footnotes-container">
          <slot name="title" class="${this.collapsed ? 'closed' : 'open'}" @click=${this.toggleAccordion}>
           Saver restrictions 
          </slot>
            <slot name="accordion-icon" class="${this.collapsed ? 'closed' : 'open'}" @click=${this.toggleAccordion}>
              ${this.accordionIcon}
            </slot>

            <div class="collapsed-content-container ${this.collapsed ? 'closed' : 'open'}">
            <slot name="collapsed-content">
            <!-- eslint-disable-next-line -->
            <footer-advisory footerAdvisories='${JSON.stringify(footnotes)}'>
            </footer-advisory>
            </slot>
          </div>

        `;
      case 'Main':
        return html`
                  <span class="content-heading">
            Traveling in Main
          </span>
          <div class="class-product-containers">
            ${this.renderClassProduct('in-flight', 'seat',
      'Seating', 'More seating options than with Saver - including comfy new leather seats on select flights.')}
            ${this.renderClassProduct('terminal', 'plane-diag-stroke',
      'Inflight experience', 'Beverage service, with beer and wine available for purchase.')}
            ${this.renderClassProduct('terminal', 'flight-changes',
      'Changes and cancellations', 'No change fees. Ever. Fare differences may apply.')}
          </div>
          `;
      case 'Premium Class':
        return html`<span>mcmansion class</span>'`;
      case 'First Class':
        return html`
                  <span class="content-heading">
            Traveling in First Class
          </span>
                  <div class="class-product-containers">
            ${this.renderClassProduct('in-flight', 'seat',
      'Relax', 'Settle into spacious, custom-designed seats with generous legroom and recline.')}
            ${this.renderClassProduct('in-flight', 'food-and-drink',
      'Dig in', 'Savor complimentary West Coast-inspired snacks.')}
            ${this.renderClassProduct('terminal', 'flight-changes',
      'Stay flexible', 'No change fees. Ever. Fare differences may apply.')}
          </div>
          <div class="class-product-containers">
            ${this.renderClassProduct('in-flight', 'luggage',
      'Bring your stuff', 'Check your first two bags for free.')}
            ${this.renderClassProduct('terminal', 'lounge',
      'Lounge about', 'Enjoy free Alaska Lounge access.')}
            ${this.renderClassProduct('terminal', 'plane-diag-stroke',
      'Earn more', '75% more Mileage Plan bonus miles accrued.')}
          </div>
        `;
      case 'Compare fares':
        return html`<fs-modal-compare-fares-table></fs-modal-compare-fares-table>`;
    }
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(FsModalCompareFaresTabbed.styles)}</style>` : ''}
            <div class="modal-container">
              <div class="imageCallout ${this.class}">
                <div class="modal-header-container">
                  <div class="modal-header">
                    ${this.class}
                  </div>
                  <div class="modal-subheader">
                    ${this.getClassTagline()}
                  </div>
                  <div class="tab-group">
                    <fs-modal-tab label="Saver" ?selected=${this.class === 'Saver'}
                    @click=${(evt) => this.clickClass(evt)}></fs-modal-tab>
                    <fs-modal-tab label="Main" ?selected=${this.class === 'Main'}
                    @click=${(evt) => this.clickClass(evt)}></fs-modal-tab>
                    <fs-modal-tab label="First Class" ?selected=${this.class === 'First Class'}
                      @click=${(evt) => this.clickClass(evt)}></fs-modal-tab>
                    <fs-modal-tab label="Compare fares" ?selected=${this.class === 'Compare fares'}
                      @click=${(evt) => this.clickClass(evt)}></fs-modal-tab>
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

if (!customElements.get('fs-modal-compare-fares-tabbed')) {
  customElements.define('fs-modal-compare-fares-tabbed', FsModalCompareFaresTabbed);
}
