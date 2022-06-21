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

      .collapsed-content {
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
    <!--
            <div class="top-section">
              <slot name="accordion-icon" class="${this.collapsed ? 'closed' : 'open'}" 
                @click=${this.toggleAccordion}>
                ${this.accordionIcon}
              </slot>
              <slot name="title">No change fees. Ever.</slot>
              <slot name="content">
                Your peace of mind is always top of mind, which is why we're permanently 
                  <u>eliminating change fees</u>; fare differences may apply.<br/><br/>
              </slot>
              <div class="collapsed-content-container ${this.collapsed ? 'closed' : 'open'}">
                <ul>
                  <li class="collapsed-content">Our <auro-hyperlink href='https://www.alaskaair.com/content/advisories/travel-advisories#flex' target="-blank">
                    peace of mind waiver</auro-hyperlink> covers all flights booked through April 30, 2021.</li>
                  <li class="collapsed-content">Beginning May 1, 2021, change fees will be eliminated on 
                      Main and First Class fares everywhere Alaska flies.
                  </li>
                </ul>
                <span class="collapsed-content">
                  <auro-hyperlink 
                  href="https://www.alaskaair.com/content/advisories/coronavirus?int=AS_FLIGHTDEALS_-prodID:Awareness" 
                  target="_blank">Learn more</auro-hyperlink> 
                  about our enhanced cleaning procedures and get answers to FAQs.
                </span>
              <br/><br/>
              </div>
            </div>
            <slot name="link-section">
              <a
                href="https://www.alaskaair.com/content/advisories/travel-advisories?int=AS_HOMEADVISORY_-prodID:Awareness"
                target="_blank">
                <auro-button tertiary buttontype="secondary"  responsive>See full terms for details.</auro-button>
              </a>
            </slot>-->
        `;
  }
}

if (!customElements.get('mobile-message-banner')) {
  customElements.define('mobile-message-banner', MobileMessageBanner);
}
