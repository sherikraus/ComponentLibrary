import {css, html, LitElement, unsafeCSS} from 'lit-element';
import assignIconFromProperty from '../../shared/buildIcon';
import {isIE11, wrapWithSlot} from '../../shared/utility';
import {getAnchorButtonElement} from '../../shared/auroUtility';

class SaverToMainSingleUpsell extends LitElement {
  static get properties() {
    return {
      accordion: {type: Boolean},
      collapsed: {type: Boolean},
      price: {type: String},
      roundTrip: {type: Boolean},
      upgradeLink: {type: String},
      warningStrokeIcon: {type: String},
      accordionIcon: {type: String},
      bakedImage: {type: Boolean},
    };
  }

  async firstUpdated() {
    this.warningStrokeIcon = await assignIconFromProperty(this.warningStrokeIcon, 'warning-stroke');
    this.accordionIcon = await assignIconFromProperty(this.accordionIcon, 'chevron-down');
  }

  toggleAccordion() {
    this.collapsed = !this.collapsed;
  }

  static get styles() {
    return css`
      .saver-upsell-single { 
        font-family: 'ASCircular-Medium', 'Circular', Helvetica Neue, Arial, sans-serif;
        display: flex;      
        background: rgb(255, 255, 255);
        border-radius: 8px;
        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.26),
        0px 2px 4px 1px rgba(0, 0, 0, 0.12);
        overflow: hidden;
      }
      
      .saver-upsell-single .p2p-upsell-section { 
        flex: 1;
      }
      
      .saver-upsell-single .p2p-upsell-section img {
        width: 100%;
      }
      
      .saver-upsell-single .p2p-upsell-section.upsell-message {
        color: rgb(98, 107, 121);
        font-size: 16px;
        font-weight: 300;
        line-height: 24px;
        margin: 2em 0em;
        padding: 0em 2em;
      }
      
      .saver-upsell-single .upsell-message-list {
        margin: 0px;
        font-weight: 300;
        font-family: 'ASCircular-Book', 'Circular';
        font-size: 24px;
        padding-left: 1.3em;
      }

      .saver-upsell-single .upsell-message-list span {
        font-size: 16px;
      }
      
      .saver-upsell-single .upsell-title {
        font-family: 'ASCircular-Medium', 'Circular';
        color: rgb(34, 34, 34);
        font-size: 28px;
        font-weight: 500;
        letter-spacing: -0.2px;
        line-height: 32px;
        padding-bottom: 8px;
      }

      /* Only using Important because svg contains inlined styles */
      .saver-upsell-single .upsell-title svg {
        height: 26px !important;
        width: 26px !important;
        color: #626b79;
        vertical-align: middle;
        margin-top: -4px;
      }
      .saver-upsell-single .upsell-title .upsell-accordion svg {
        float: right;
        transition: transform 0.3s;
      }

      .saver-upsell-single .upsell-title .upsell-accordion.open svg {
        transition: transform 0.3s;
        transform: rotate(-180deg);
      }

      .saver-upsell-single .upsell-price-content {
        font-family: 'ASCircular-Medium', 'Circular';
        color: rgb(0, 116, 200);
        font-size: 14px;
        font-weight: 300;
        line-height: 24px;
        margin: 16px 0px 16px 0px;
      }
      .saver-upsell-single .upsell-price {
        font-size: 20px;
        font-weight: 500;
        letter-spacing: -0.2px;
      }

      .saver-upsell-single .upsell-price-text {
        color: rgb(98, 107, 121);
        font-family: ASCircular-Book, 'Circular';
        font-size: 16px;
        font-weight: 300;
        height: 24px;
        line-height: 24px;
      }

      .saver-upsell-single .upsell-disclaimer {
        color: rgb(98, 107, 121);
        font-family: 'ASCircular-Book', 'Circular';
        font-size: 12px;
        font-weight: 300;        
        line-height: 16px;
        margin-top: 12px;
      }

      .saver-upsell-single slot[name='paragraph-content'] {
        font-family: 'ASCircular-Book', 'Circular';
      }

      .saver-upsell-single .content-container {
        font-family: 'ASCircular-Book', 'Circular';
        transition: max-height 0.3s ease-in-out;
        max-height: 300px;
        overflow: hidden;
      }

      .saver-upsell-single .content-container.closed {
        transition: max-height 0.3s ease-in-out;
        max-height: 0;
      }

      .saver-upsell-single .upsell-image-section {
        flex-basis: 248px;
        flex-shrink: 0;
        flex-grow: 0;
        background: url('https://www.alaskaair.com/-/media/7ED239596D184182AD2034F4E1F9050D');
        background-size: auto 100%;
        background-position: 13% 0%;
      }
      .saver-upsell-single .upsell-image-section-baked {
        flex-basis: 248px;
        flex-shrink: 0;
        flex-grow: 0;
        background: url('https://www.alaskaair.com/-/media/B62C300DFB8C4E69B7ED6905DD1716D5');
        background-size: auto 100%;
        background-position: right;
        background-repeat: no-repeat;
      }

      @media only screen and (max-width:840px) {
        img, slot[name=image] { display: none;}
        .saver-upsell-single .upsell-title {
          font-size: 18px;
          font-weight: 500;
          padding: 0px;
          padding-bottom: 10px;
          line-height: 1;
        }
        .saver-upsell-single .p2p-upsell-section.upsell-message {
          padding: 24px;
          margin: 0px;
        }
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
  fireUpgrade() {
    if (!!this.onUpgrade) {
      this.onUpgrade();
    }
    window.location.href = this.upgradeLink;
  }
  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(SaverToMainSingleUpsell.styles)}</style>` : ''}
            <div class="saver-upsell-single">
              <div class="p2p-upsell-section upsell-message">
                <div class="upsell-title">
                  ${wrapWithSlot('title-icon', this.warningStrokeIcon)}
                  ${wrapWithSlot('title', 'Saver is a restricted fare type.')}
                  ${wrapWithSlot('accordion-icon', html`
                    <div class="upsell-accordion ${this.collapsed ? 'closed' : 'open'}" @click=${this.toggleAccordion}>
                      ${this.accordion ? this.accordionIcon : ``}
                    </div>
                  `)}                  
                </div>
                <div class="upsell-message-content">
                  ${wrapWithSlot('paragraph-content', html``)}
                  <div class="content-container ${this.collapsed ? 'closed' : 'open'}">
                  ${wrapWithSlot('content', html`
                    <ul class="upsell-message-list">
                      <li>
                        <span>
                          <strong>No changes permitted.</strong> Cancellation* will result in forfeit of fare.
                        </span>
                      </li>
                      <li>
                        <span>
                          Limited seating options. Not recommended for groups of 2 or more.
                        </span>
                      </li>
                      <li>
                        <span>
                          Last to board with minimal access to the overhead bins
                        </span>
                      </li>
                      <li>
                        <span>
                          No upgrades or preferred seating for elites
                        </span>
                      </li>
                    </ul>                                
                  `)}                                    
                  </div>
                  ${wrapWithSlot('content-footer', html``)}
                </div>
                <div class="upsell-price-content">
                  <span class="upsell-price">+$${this.price} USD</span>
                  <span class="upsell-price-text">${this.roundTrip ? 'round-trip' : ''} per passenger</span>
                </div>
                ${getAnchorButtonElement(this.upgradeLink || '#', 'Upgrade to Main', this.fireUpgrade)}
                <div class="upsell-disclaimer">
                  ${wrapWithSlot('disclaimer', '*24-hour cancellation policy applies.')}
                </div>
              </div>
              ${wrapWithSlot('image', html`
                <div class="p2p-upsell-section upsell-image-section${this.bakedImage ? '-baked' : ''}">

                </div>
              `)}         
            </div>
        `;
  }
}

if (!customElements.get('saver-to-main-single-upsell')) {
  customElements.define('saver-to-main-single-upsell', SaverToMainSingleUpsell);
}
