import {css, html, LitElement} from 'lit-element';
import assignIconFromProperty from '../../shared/buildIcon';
import '@alaskaairux/auro-button';
import '@alaskaairux/auro-hyperlink';

class MobileMessageBanner extends LitElement {
  constructor() {
    super();
    this.collapsed = true;
  }

  static get properties() {
    return {
      accordionIcon: {type: String},
      collapsed: {type: Boolean},
    };
  }

  async firstUpdated() {
    this.accordionIcon = await assignIconFromProperty(this.accordionIcon, 'chevron-down');
  }

  toggleAccordion() {
    this.collapsed = !this.collapsed;
  }

  static get styles() {
    return css`
      :host {
        font-family: 'ASCircular-Medium', Helvetica Neue, Arial, sans-serif;     
        background: rgb(255, 255, 255);
        border-radius: 8px;
        border: 1px solid rgb(98, 107, 121);
        border-style: dotted;
        overflow: hidden;
        display: block;
      }

      slot[name=title] {
        color: rgb(34, 34, 34);
        font-size: 20px;
        font-weight: 500;
        letter-spacing: -0.2px;
        line-height: 32px;
        padding-bottom: 8px;
        display: block;
      }

      slot[name=content], slot[name=collapsed-content] {
        color: rgb(98, 107, 121);
        font-family: 'ASCircular-Book';
        font-size: 16px;
        font-weight: 300;
        line-height: 24px;
        display: block;
      }

      slot[name=accordion-icon] svg {
        float:right;
        transition: transform 0.3s;
        display: table;
      }

      slot[name=accordion-icon].open svg {
        transition: transform 0.3s;
        transform: rotate(-180deg);
      }

      .collapsed-content-container {
        transition: max-height 0.3s ease-in-out;
        max-height: 300px;
        overflow: hidden;
        border-bottom: solid 1px rgba(0, 0, 0, 0.15);
      }

      .collapsed-content-container.closed {
        transition: max-height 0.3s ease-in-out;
        max-height: 0;
      }

      slot[name=link-section] {
        display: block;
        margin-top: 8px;
        margin-bottom: 8px;
      }

      .top-section {
        padding: 24px 24px 0px 24px;
      }
    `;
  }

  render() {
    return html`
            <div class="top-section">
              <slot name="accordion-icon" class="${this.collapsed ? 'closed' : 'open'}" 
                @click=${this.toggleAccordion}>
                ${this.accordionIcon}
              </slot>
              <slot name="title">Book with assurance.</slot>
              <slot name="content">
                We're waiving change and cancellation fees for tickets purchased by Dec. 31, 2020.<br/><br/>
              </slot>
              <div class="collapsed-content-container ${this.collapsed ? 'closed' : 'open'}">
                <slot name="collapsed-content">
                Saver fares cannot be changed but can be cancelled for future travel credit. Fare differences may apply.
                <br/>
                <br/>
                <strong>NOTE:</strong> This waiver supersedes the published fare rules below.<br/><br/>

                <auro-hyperlink 
                href="https://www.alaskaair.com/content/advisories/travel-advisories?int=AS_FLIGHTDEALS_-prodID:Awareness" 
                target="_blank">View the full details</auro-hyperlink> 
                of our flexible travel options and any regional travel restrictions.<br/><br/>
                <auro-hyperlink 
                href="https://www.alaskaair.com/content/advisories/coronavirus?int=AS_FLIGHTDEALS_-prodID:Awareness" 
                target="_blank">Learn more</auro-hyperlink> 
                about our enhanced cleaning procedures and get answers to FAQs.<br/><br/>
                </slot>
              </div>
            </div>
            <slot name="link-section">
              <a
                href="https://www.alaskaair.com/content/advisories/travel-advisories?int=AS_HOMEADVISORY_-prodID:Awareness"
                target="_blank">
                <auro-button tertiary buttontype="secondary"  responsive>See full terms for details.</auro-button>
              </a>
            </slot>
        `;
  }
}

if (!customElements.get('covid-mobile-message-banner')) {
  customElements.define('covid-mobile-message-banner', MobileMessageBanner);
}
