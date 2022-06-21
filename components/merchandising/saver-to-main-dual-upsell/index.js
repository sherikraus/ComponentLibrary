import {css, html, LitElement, unsafeCSS} from 'lit-element';
import assignIconFromProperty from '../../shared/buildIcon';
import {isIE11, wrapWithSlot} from '../../shared/utility';
import {getAnchorButtonElement} from '../../shared/auroUtility';

class SaverToMainDualUpsell extends LitElement {
  static get properties() {
    return {
      price: {type: String},
      roundTrip: {type: Boolean},
      upgradeLink: {type: String},
      warningStrokeIcon: {type: String},
    };
  }

  async firstUpdated() {
    this.warningStrokeIcon = await assignIconFromProperty(this.warningStrokeIcon, 'warning-stroke');
  }

  static get styles() {
    return css`
    .saver-upsell-dual { 
      font-family: 'ASCircular-Medium', 'Circular', Helvetica Neue, Arial, sans-serif;
      display: flex;      
      background: rgb(255, 255, 255);
      border-radius: 8px;
      box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.26),
      0px 2px 4px 1px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      min-height:348px;
    }
    
    
    .saver-upsell-dual .p2p-upsell-section { 
      flex: 1;
    }

    .saver-upsell-dual .upsell-image-section {
      background: url('https://resource.alaskaair.net/-/media/Images/pathtopurchase/AS_Employee_Luggage');
      background-size: auto 100%;
      background-position: 13% 0%;
    }
    
    .saver-upsell-dual .p2p-upsell-section.upsell-message {
      color: rgb(98, 107, 121);
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      margin: 2em 0em;
      padding: 0em 2em;
    }
    
    .saver-upsell-dual .upsell-message.upsell-first {
      border-right: 1px solid rgba(0, 0, 0, 0.15);
    }
    
    .saver-upsell-dual .upsell-message-list {
      margin: 0px;
      font-weight: 300;
      font-family: 'ASCircular-Book', 'Circular';
      font-size: 24px;
      padding-left: 1.6rem;
      list-style-type: disc;
    }
  
    .saver-upsell-dual .upsell-message-list span {
      font-size: 16px;
    }

    .saver-upsell-dual .upsell-title {
      font-family: 'ASCircular-Medium', 'Circular';
        color: rgb(34, 34, 34);
        font-size: 24px;
        font-weight: 500;
        letter-spacing: -0.2px;
        line-height: 32px;
        padding-bottom: 8px;
      }

      /* Only using Important because svg contains inlined styles */
      .saver-upsell-dual .upsell-title svg {
        height: 26px !important;
        width: 26px !important;
        fill: #626b79;
        vertical-align: middle;
        margin-top: -4px;
      }
      .saver-upsell-dual .upsell-price-content {
        font-family: 'ASCircular-Medium', 'Circular';
        color: rgb(0, 116, 200);
        font-size: 14px;
        font-weight: 300;
        line-height: 24px;
        margin: 20px 0px 8px 0px;
      }
      .saver-upsell-dual .upsell-price {
        font-size: 20px;
        font-weight: 500;
        letter-spacing: -0.2px;
      }
      .saver-upsell-dual .upsell-disclaimer {
        color: rgb(98, 107, 121);
        font-family: 'ASCircular-Book', 'Circular';
        font-size: 12px;
        font-weight: 300;        
        line-height: 16px;
        margin-top: 12px;
      }

      .saver-upsell-dual .upsell-message-content {
        font-family: 'ASCircular-Book', 'Circular';
      }

      .saver-upsell-dual .upsell-image-section {
        flex-basis: 248px;
        flex-shrink: 0;
        flex-grow: 0;
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
            ${isIE11() ? html`<style>${unsafeCSS(SaverToMainDualUpsell.styles)}</style>` : ''}
            <div class="saver-upsell-dual">
              ${wrapWithSlot('image', html`
                <div class="p2p-upsell-section upsell-image-section"></div>
              `)}
              <div class="p2p-upsell-section upsell-message upsell-first">
                <div class="upsell-title">
                  ${wrapWithSlot('title-left', 'Get more with Main')}                  
                </div>
                <div class="upsell-message-content">
                  ${wrapWithSlot('content-left', html`
                    Enjoy Main class offerings, such as:
                    <ul class="upsell-message-list">
                      <li>
                        <span>Flight changes and cancellations with no fee*</span>
                      </li>
                      <li>
                        <span>Expanded seat selection</span>
                      </li>
                      <li>
                        <span>Earlier boarding and overhead bin access</span>
                      </li>
                    </ul>
                  `)}
                </div>
                <div class="upsell-price-content">
                  <span class="upsell-price">+$${this.price} USD</span>
                  ${this.roundTrip ? 'round-trip' : ''} per passenger
                </div>
                ${getAnchorButtonElement(this.upgradeLink || '#', 'Upgrade to Main', this.fireUpgrade)}
                <div class="upsell-disclaimer">
                  ${wrapWithSlot('disclaimer-left', '*A difference in fare may apply to changed flights.')}
                </div>
              </div>
              <div class="p2p-upsell-section upsell-message">
                <div class="upsell-title">
                  ${wrapWithSlot('title-right-icon', this.warningStrokeIcon)}
                  ${wrapWithSlot('title-right', 'Saver has restrictions')}
                </div>
                <div class="upsell-message-content">
                  ${wrapWithSlot('content-right', html`
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
                <div class="upsell-disclaimer">
                  ${wrapWithSlot('disclaimer-right', '*24-hour cancellation policy applies.')}
                </div>
              </div>
            </div>
        `;
  }
}

if (!customElements.get('saver-to-main-dual-upsell')) {
  customElements.define('saver-to-main-dual-upsell', SaverToMainDualUpsell);
}
