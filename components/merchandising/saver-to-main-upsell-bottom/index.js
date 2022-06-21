import {css, html, LitElement} from 'lit-element';
import '@alaskaairux/auro-hyperlink';
import '@alaskaairux/auro-button';
import assignIconFromProperty from '../../shared/buildIcon';


class SaverToMainUpsellBottom extends LitElement {
  constructor() {
    super();
    this.open = false;
  }

  // this will render on the second browser event loop
  async firstUpdated() {
    this.closeIcon = await assignIconFromProperty(this.closeIcon, 'close-lg');
    this.firstIcon = await assignIconFromProperty(this.firstIcon, 'luggage');
    this.secondIcon = await assignIconFromProperty(this.secondIcon, 'seat');
    this.thirdIcon = await assignIconFromProperty(this.thirdIcon, 'flight-changes');
  }

  toggleViewable() {
    this.open = !this.open;
  }

  takeUpgrade() {
    this.toggleViewable();
    window.location.href = this.upgradeLink;
  }

  declineUpgrade() {
    this.toggleViewable();
    const event = new Event('declineUpgrade');
    this.dispatchEvent(event);
  }

  static get properties() {
    return {
      open: {type: Boolean, reflect: true},
      roundTrip: {type: Boolean},
      price: {type: String},
      upgradeLink: {type: String},
      closeIcon: {type: String},
      firstIcon: {type: String},
      secondIcon: {type: String},
      thirdIcon: {type: String},
    };
  }

  static get styles() {
    return css`
    :host{
      --auro-size-lg: 24px;
    }

    .upsell-overlay {
      bottom: 0;
      height: 100%;
      left: 0px;
      position: fixed;
      width: 100%;
      z-index: 9;
    }

    .upsell-overlay.open {
      background: rgba(0, 0, 0, 0.38);
      transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 0);
    }

    .main-upsell-bottom { 
      background: rgb(255, 255, 255);
      bottom: 0;
      font-family: 'ASCircular-Medium', Helvetica Neue, Arial, sans-serif;
      font-size: 16px;
      justify-content: center;
      overflow: hidden;
      padding-bottom: 32px;
      position: absolute;
      text-align: center;
      width: 100%;
      z-index: 10;
    }

    .main-upsell-bottom.open {
      transform: translateY(0px);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 0);
    }

    slot[name=upsell-title] {
      color: #222222;
      font-size: 26px;
      font-weight: 500;
      letter-spacing: -0.2px;
      line-height: 30px;
      text-align: center;
    }

    slot[name=upsell-message-secondary] p {
      color: rgb(98, 107, 121);
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      margin-block-start: 0em;
      margin-block-end: 0em;
      padding-top: 12px;
    }

    slot[name=upsell-message-content] ul {
      padding-inline-start: 0px;
    }

    slot[name=upsell-message-content] ul li {
      color: rgb(98, 107, 121);
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      list-style-type: none;
      margin: 12px 0px;
      padding-inline-start: 0px;
      text-align: left;
    }

    slot[name=upsell-message-content] ul li span{
      display: block;
      padding-left: 36px;
    }

    slot[name=upsell-message-content] ul li svg {
      height: 26px !important;
      margin-top: -2px;
      position: absolute;
      vertical-align: middle;
      width: 26px !important;
    }

    slot[name=upsell-message-content] ul li svg path {
      fill: rgb(0, 207, 240);
    }

    slot[name=upsell-price-content] {
      color: #626b79;
    }

    .upsell-container {
      padding-left: 32px;
      padding-right: 32px;
    }

    .upsell-price {
      color: rgb(0, 116, 200);
      font-size: 20px;
      font-weight: 500;
      letter-spacing: -0.2px;
      line-height: 28px;
      margin-top: 8px;
      margin-bottom: 8px;
    }

    .upsell-divider {
      background: rgba(0, 0, 0, 0.15);
      border-radius: 0px;
      border: none;
      height: 1px;
      margin-top: 24px;
      margin: 16px 0;
    }
    
    .upsell-button {
      float: center;
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
      text-align: center;
    }

    .upsell-close {
      height: 26px !important;
      margin-top: 25px;
      margin-left: 25px;
      margin-bottom: 9px;
      text-align: left;
      width: 26px !important;
    }

    .upsell {
      bottom: 0;
    }

    .overlay-closed {
      background: rgba(0, 0, 0, 0);
      transition: visibility 0.3s, background 0.3s;
      transition-timing-function: cubic-bezier(0.2, 0, 0.4, 0);
      visibility: hidden;
      z-index: 0;
    }

    .upsell-closed {
      transition: transform 0.3s;
      transition-timing-function: cubic-bezier(0.2, 0, 0.4, 0);
      transform: translateY(100%);
    }

    @keyframes slide-up {
      0% {
          opacity: 0;
          transform: translateY(425px);
      }
      100% {
          opacity: 1;
          transform: translateY(0);
      }
    }

    @keyframes fade-in {
      0% {
          background: rgba(0, 0, 0, 0);

      }
      100% {
          background: rgba(0, 0, 0, 0.38);
      }
    }
    `;
  }

  render() {
    return html`
            <div class="upsell ${this.open ? 'upsell-open' : ''}">
              <div class="upsell-overlay ${this.open ? 'open' : 'overlay-closed'}">
                <div class="main-upsell-bottom ${this.open ? 'open' : 'upsell-closed'}">
                  <div class="upsell-close" @click="${this.declineUpgrade}">
                    ${this.closeIcon}
                  </div>
                  <div class="upsell-container">
                    <slot name="upsell-title">Get more with Main</slot>
                    <slot name="upsell-message-secondary">
                      <p>
                      Enjoy Main class offerings, such as: 
                      </p>
                    </slot>
                    <slot name="upsell-message-content">
                      <ul>
                        <li class="upsell-message-list-item">
                          ${this.firstIcon}
                          <span>General boarding/overhead bin access</span>
                        </li>
                        <li class="upsell-message-list-item">
                          ${this.secondIcon}
                          <span>More seat options</span>
                        </li>
                        <li class="upsell-message-list-item">
                          ${this.thirdIcon}
                          <span>Changes and cancellations allowed</span>
                        </li>
                      </ul>
                    </slot>
                    <hr class="upsell-divider" />
                    <slot name="upsell-price-content">
                      <span class="upsell-price">+$${this.price} USD</span>
                      ${this.roundTrip ? 'round-trip' : ''} per passenger
                    </slot>
                    <div class="upsell-button">
                      <auro-button data-cy ="testUpgradeLink" href="${this.upgradeLink || '#'}" responsive
                      @click="${this.takeUpgrade}">
                        <slot name="upgrade-action">
                          Upgrade to Main
                        </slot>
                      </auro-button>
                    </div>
                    <div class="upsell-button">
                      <auro-button tertiary buttontype="secondary"  
                      responsive  @click="${this.declineUpgrade}">
                        <slot name="decline-action">
                          Continue with Saver
                        </slot>
                      </auro-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
  }
}

if (!customElements.get('saver-to-main-upsell-bottom')) {
  customElements.define('saver-to-main-upsell-bottom', SaverToMainUpsellBottom);
}
