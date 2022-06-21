import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import assignIconFromProperty from '../../shared/buildIcon';
import '@alaskaairux/auro-icon';
import styles from './styles-css';
import '../import-auro-components';

class Legend extends LitElement {
  constructor() {
    super();
    this.collapsed = true;
  }

  static get properties() {
    return {
      tile: {type: Boolean},
      table: {type: Boolean},
      ondark: {
        type: Boolean,
        reflect: true,
      },
      tileData: {type: Array},
      legendItems: {type: Array},
      collapsed: {type: Boolean},
      accordionIcon: {type: String},
      DiscountCodeApplied: {type: Boolean},
      RoutePendingGovernmentApproval: {type: Boolean},
      FreeSameDayChange: {type: Boolean},
      GuestPassMonitor: {type: Boolean},
      GuestPassRecommended: {type: Boolean},
      GuestPassNotRecommended: {type: Boolean},
      IsMixedCabinItinerary: {type: Boolean},
      HasNextDayArrival: {type: Boolean},
      HasContractFare: {type: Boolean},
      HasContractMixFare: {type: Boolean},
      HasGovernmentFare: {type: Boolean},
      HasGovernmentMatchFare: {type: Boolean},
      HasGovernmentMixFare: {type: Boolean},
      FirstClassUpgradeAvailable: {type: Boolean},
      FirstClassUpgradeUnavailable: {type: Boolean},
      PremiumClassUpgradeAvailable: {type: Boolean},
      PremiumClassUpgradeUnavailable: {type: Boolean},
    };
  }

  static get styles() {
    return css`${styles}`;
  }

  toggleAccordion() {
    this.collapsed = !this.collapsed;
  }

  async firstUpdated() {
    this.accordionIcon = await assignIconFromProperty(this.accordionIcon, 'chevron-down');
    this.addEventListener('mouseenter', this.handleFocus);
  }

  handleTermsClick() {
    const modal = document.querySelector('auro-dialog');
    try {
      modal.removeChild(modal.querySelector('[slot="content"]'));
      modal.removeChild(modal.querySelector('[slot="header"]'));
    } catch (e) {
    }

    modal.setAttribute('md', true);
    const termsIframe = document.createElement('iframe');
    termsIframe.setAttribute('slot', 'content');
    termsIframe.setAttribute('src', 'https://easybiz.alaskaair.com/ContractFareInfo?section=popup&lightbox=true');
    termsIframe.setAttribute('width', '100%');
    termsIframe.setAttribute('height', '100%');
    termsIframe.setAttribute('style', 'min-height: 400px;');

    const heading = document.createElement('span');
    heading.innerHTML = 'EasyBiz Contract Fare Info';
    heading.setAttribute('slot', 'header');
    modal.appendChild(heading);
    modal.appendChild(termsIframe);
    modal.setAttribute('open', true);
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

  capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static get LegacyIcon() {
    return {
      GuestPassMonitorIcon: html`<img class="legend-icon" src="https://www.alaskaair.com/-/media/032023583B49477F9006109BAA0C2665"></img>`,
      GuestPassRecommendedIcon: html`<img class="legend-icon" src="https://www.alaskaair.com/-/media/A717584C297147458366D363B6105562"></img>`,
      GuestPassNotRecommendedIcon: html`<img class="legend-icon" src="https://www.alaskaair.com/-/media/1387361C853041048F7454D963901C1E"></img>`,
      HasGovernmentFareIcon: html`<img class="legend-icon" src="https://resource.alaskaair.net/-/media/images/onsite/icons/icon_govtFare.ashx"></img>`,
      HasGovernmentMatchFareIcon: html`<img class="legend-icon" src="https://resource.alaskaair.net/-/media/images/onsite/icons/icon_matchingFare.ashx"></img>`,
      HasGovernmentMixFareIcon: html`<img class="legend-icon" src="https://resource.alaskaair.net/-/media/images/onsite/icons/icon_MixedFare.ashx"></img>`,
      HasContractFareIcon: html`<img class="legend-icon" src="https://resource.alaskaair.net/-/media/images/onsite/icons/contract_fare_icon.ashx"></img>`,
      HasContractMixFareIcon: html`<img class="legend-icon" src="https://resource.alaskaair.net/-/media/images/onsite/icons/icon_CCF_MixedFare.ashx"></img>`,
      FirstClassUpgradeAvailableIcon: html`<img class="legend-icon" src="https://p2pcontent-fd-prod.azurefd.net/icons/fc-upgrade-available.svg"></img>`,
      FirstClassUpgradeWaitlistIcon: html`<img class="legend-icon" src="https://p2pcontent-fd-prod.azurefd.net/icons/fc-upgrade-notAvailable.svg"></img>`,
      PremiumClassUpgradeAvailableIcon: html`<img class="legend-icon" src="https://www.alaskaair.com/img/upgrades/pc-upgrade-available.svg"></img>`,
      PremiumClassUpgradeWaitlistIcon: html`<img class="legend-icon" src="https://www.alaskaair.com/img/upgrades/pc-upgrade-notAvailable.svg"></img>`,
      IsMixedCabinIcon: html`<img class="legend-icon" src="https://resource.alaskaair.net/-/media/images/onsite/icons/icon_multi-cabin.ashx"></img>`,
      RoutePendingGovernmentApprovalIcon: html`<span class="legend-icon" id="legacy-route-pending">∞</span>`,
    };
  }

  static get TableIcon() {
    return {
      FreeSameDayChangeIcon: html`<auro-icon 
        class="icon default-desktop-width alert-on-success-dark" 
        category="interface" 
        customColor
        customSize 
        name="free-same-day-change"></auro-icon>`,
      RoutePendingGovernmentApprovalIcon: html`<auro-icon 
        class="icon default-desktop-width goldcoast-500"
        category="interface" 
        customColor
        customSize 
        name="route-pending-government-approval"></auro-icon>`,
      GuestPassMonitorIcon: html`<auro-icon 
        class="icon default-desktop-width goldcoast-400"
        category="interface"
        customColor
        customSize  
        name="recommended-for-standby-travel-but-monitor"></auro-icon>`,
      GuestPassRecommendedIcon: html`<auro-icon 
        class="icon default-desktop-width alert-on-success-dark"
        category="interface"
        customColor
        customSize  
        name="recommended-for-standby"></auro-icon>`,
      GuestPassNotRecommendedIcon: html`<auro-icon 
        class="icon default-desktop-width text-error-on-light"
        category="interface" 
        customColor
        customSize 
        name="not-recommended-for-standby"></auro-icon>`,
      FirstClassUpgradeAvailableIcon: html`<auro-icon 
        class="icon default-desktop-width fc-upgrade"
        category="interface" 
        customColor
        customSize 
        name="first-class-upgrade-available"></auro-icon>`,
      FirstClassUpgradeWaitlistIcon: html`<auro-icon 
        class="icon default-desktop-width goldcoast-400"
        category="interface"
        customColor
        customSize 
        name="first-class-upgrade-waitlist"></auro-icon>`,
      PremiumClassUpgradeAvailableIcon: html`<auro-icon 
        class="icon default-desktop-width pc-upgrade"
        category="interface"
        customColor
        customSize  
        name="premium-class-upgrade-available"></auro-icon>`,
      PremiumClassUpgradeWaitlistIcon: html`<auro-icon 
        class="icon default-desktop-width goldcoast-400"
        category="interface"
        customColor
        customSize 
        name="premium-class-upgrade-waitlist"></auro-icon>`,
    };
  }

  static get TileIcon() {
    return {
      DiscountCodeAppliedIcon: html`<auro-icon 
        class="icon default-width alert-on-success-dark" 
        category="interface"
        customColor
        customSize 
        name="discount-code-applied"></auro-icon>`,
      HasGovernmentFareIcon: html`<auro-icon 
        class="icon default-width atlas" 
        category="interface"
        customColor
        customSize 
        name="government-fare"></auro-icon>`,
      HasGovernmentMixFareIcon: html`<auro-icon 
        class="icon default-width goldcoast-400" 
        category="interface"
        customColor
        customSize
        name="government-mixed-fare"></auro-icon>`,
      HasContractFareIcon: html`<auro-icon 
        class="icon default-width atlas" 
        category="interface"
        customColor
        customSize 
        name="contract-fare"></auro-icon>`,
      HasContractMixFareIcon: html`<auro-icon 
        class="icon default-width goldcoast-400" 
        category="interface"
        customColor
        customSize
        name="contract-mixed-fare"></auro-icon>`,
      IsMixedCabinIcon: html`<auro-icon 
        class="icon mixed-cabin atlas" 
        category="interface"
        customColor
        customSize 
        name="mixed-cabin-itinerary"></auro-icon>`,
    };
  }

  getLegendItem(icon, legendDescription) {
    if (Boolean(this.tileData) && this.IsMixedCabinItinerary) {
      return html`
        <div class="tile">
          <span class="mixed-cabin-advisory-title">${icon} Mixed itinerary:</span>  
          <div class="description"> 
              ${this.tileData.map((segment) => html`
                <div>
                  ${segment.origin.toUpperCase()} to 
                  ${segment.destination.toUpperCase()}&ndash;${this.capitalize(segment.classOfService)}
                </div>
              `)
}
          </div>
        </div>
      `;
    }

    return html`
      <div class="${this.tile ? 'tile' : ''} ${this.table ? 'table' : ''} center-advisory-content">
        ${icon}<span class="description">${legendDescription}</span>
      </div>
    `;
  }

  generateLegacyLegendItem(icon, legendDescription) {
    return html`
      <div class="legend-advisory">
        ${icon}${legendDescription}
      <div>
    `;
  }

  generateLegacyLegend() {
    return html`
    <div>
      <slot name="title" class="${this.collapsed ? 'closed' : 'open'}" @click=${this.toggleAccordion}>
          Legend
      </slot>
      <slot name="accordion-icon" class="${this.collapsed ? 'closed' : 'open'}" @click=${this.toggleAccordion}>
          ${this.accordionIcon}
      </slot>

      <div class="collapsed-content-container ${this.collapsed ? 'closed' : 'open'}">
        <slot name="collapsed-content">
          ${this.HasGovernmentFare ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.HasGovernmentFareIcon,
                'Government fare') : '' }
          ${this.HasGovernmentMatchFare ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.HasGovernmentMatchFareIcon,
                'Government match fare') : '' }
          ${this.HasGovernmentMixFare ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.HasGovernmentMixFareIcon,
                'Government mix fare') : '' }
          ${this.FirstClassUpgradeAvailable ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.FirstClassUpgradeAvailableIcon,
                'First Class upgrade available') : '' }                
          ${this.FirstClassUpgradeUnavailable ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.FirstClassUpgradeWaitlistIcon,
                'First Class upgrade waitlist') : '' }
          ${this.PremiumClassUpgradeAvailable ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.PremiumClassUpgradeAvailableIcon,
                'Premium Class upgrade available') : '' }
          ${this.PremiumClassUpgradeUnavailable ?
            this.generateLegacyLegendItem(
                Legend.LegacyIcon.PremiumClassUpgradeWaitlistIcon,
                'Premium Class upgrade waitlist') : '' }
          ${this.GuestPassMonitor ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.GuestPassMonitorIcon,
                'Recommended for standby, but watch') : '' }
          ${this.GuestPassRecommended ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.GuestPassRecommendedIcon,
                'Recommended for standby') : '' }
          ${this.GuestPassNotRecommended ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.GuestPassNotRecommendedIcon,
                'Not recommended for standby') : '' }
          ${this.IsMixedCabinItinerary ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.IsMixedCabinIcon,
                'Mixed-cabin itinerary (select for details)') : '' }
          ${this.HasContractFare ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.HasContractFareIcon,
                html`Contract fare 
                <span id="terms-link" 
                  @click=${this.handleTermsClick} 
                  title="View contract fare terms">terms</span>
                  `,
            ) : '' }
          ${this.RoutePendingGovernmentApproval ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.RoutePendingGovernmentApprovalIcon,
                'Route pending government approval') : '' }
          ${Boolean(this.HasContractMixFare) ?
            this.generateLegacyLegendItem(Legend.LegacyIcon.HasContractMixFareIcon,
                'Contract mix fare') : '' }
        </slot>
      </div>
    </div>`;
  }

  generateTileAdvisories() {
    return html`
      <div>
        ${this.IsMixedCabinItinerary ?
          this.getLegendItem(Legend.TileIcon.IsMixedCabinIcon) : ''}
        ${this.DiscountCodeApplied ?
          this.getLegendItem(Legend.TileIcon.DiscountCodeAppliedIcon, 'Discount code applied') : ''}
        ${this.HasGovernmentFare || this.HasGovernmentMatchFare ?
          this.getLegendItem(Legend.TileIcon.HasGovernmentFareIcon,
              'Government fare') : '' }
        ${this.HasGovernmentMixFare ?
          this.getLegendItem(Legend.TileIcon.HasGovernmentMixFareIcon,
              'Mixed fare') : '' }
        ${this.HasContractFare ?
          this.getLegendItem(Legend.TileIcon.HasContractFareIcon,
              'Contract fare') : ''}
        ${this.HasContractMixFare ?
          this.getLegendItem(Legend.TileIcon.HasContractMixFareIcon,
              'Mixed fare') : '' }
      </div>      
  `;
  }

  generateFlightInfoTableAdvisories() {
    return html`
      <div>
        ${this.FirstClassUpgradeAvailable ?
          this.getLegendItem(Legend.TableIcon.FirstClassUpgradeAvailableIcon,
              'First Class upgrade available') : '' }              
        ${this.FirstClassUpgradeUnavailable ?
          this.getLegendItem(Legend.TableIcon.FirstClassUpgradeWaitlistIcon,
              'First Class upgrade waitlist') : '' }
        ${this.PremiumClassUpgradeAvailable ?
          this.getLegendItem(Legend.TableIcon.PremiumClassUpgradeAvailableIcon,
              'Premium Class upgrade available') : '' }
        ${this.PremiumClassUpgradeUnavailable ?
          this.getLegendItem(Legend.TableIcon.PremiumClassUpgradeWaitlistIcon,
              'Premium Class upgrade waitlist') : '' }
        ${this.GuestPassMonitor ?
          this.getLegendItem(Legend.TableIcon.GuestPassMonitorIcon,
              'Recommended for standby, but watch') : '' }
        ${this.GuestPassRecommended ?
          this.getLegendItem(Legend.TableIcon.GuestPassRecommendedIcon,
              'Recommended for standby') : '' }
        ${this.GuestPassNotRecommended ?
          this.getLegendItem(Legend.TableIcon.GuestPassNotRecommendedIcon,
              'Not recommended for standby') : '' }
        ${this.RoutePendingGovernmentApproval ?
          this.getLegendItem(Legend.TableIcon.RoutePendingGovernmentApprovalIcon,
              'Route pending government approval') : '' }
    </div>`;
  }

  handleFocus(event) {
    this.dispatchEvent(new CustomEvent('subcomponentFocused', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  render() {
    return html`
      ${isIE11() ? html`<style>${unsafeCSS(Legend.styles)}</style>` : ''}
      ${Boolean(this.tileData) || this.tile ?
        this.generateTileAdvisories() :
            this.table ?
              this.generateFlightInfoTableAdvisories() :
                  this.generateLegacyLegend()
}`;
  }
}

if (!customElements.get('ch-legend')) {
  customElements.define('ch-legend', Legend);
}
