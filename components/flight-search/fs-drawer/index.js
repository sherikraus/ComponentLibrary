import {css, html, LitElement} from 'lit-element';
import '@alaskaairux/auro-hyperlink';
import '@alaskaairux/auro-button';
import assignIconFromProperty from '../../shared/buildIcon';


class FsDrawer extends LitElement {
  constructor() {
    super();
    this.open = false;
  }

  // this will render on the second browser event loop
  async firstUpdated() {
    this.closeIcon = await assignIconFromProperty(this.closeIcon, 'close-lg');
  }

  toggleViewable() {
    this.open = !this.open;
  }

  static get properties() {
    return {
      open: {type: Boolean, reflect: true},
      closeIcon: {type: String},
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
      background: rgba(0, 0, 0, 0.2);
      transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 0);
    }

    .main-upsell-bottom { 
      background: rgb(255, 255, 255);
      right: 0;
      font-family: 'ASCircular-Medium', Helvetica Neue, Arial, sans-serif;
      font-size: 16px;
      justify-content: center;
      overflow: hidden;
      padding: 32px;
      position: absolute;
      text-align: center;
      height: 100%;
      z-index: 10;
      box-shadow: -5px 0px 10px 0px rgba(0, 0, 0, 0.1), -10px 0px 20px 0px rgba(0, 0, 0, 0.2)
    }

    .main-upsell-bottom.open {
      transform: translateX(0px);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 0);
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
      margin-top: 12px;
      text-align: right;
      width: 26px !important;
    }

    .upsell-close svg {
      fill: #626b79;
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
      transform: translateX(100%);
    }

    .header-container {
      display: flex;
      justify-content: space-between;
    }


    .upsell-header {
      display: inline-block;
      font-size: 36px;
      font-weight:500;
    }
    `;
  }

  render() {
    return html`
            <div class="auro upsell ${this.open ? 'upsell-open' : ''}">
              <div class="upsell-overlay ${this.open ? 'open' : 'overlay-closed'}">
                <div class="main-upsell-bottom ${this.open ? 'open' : 'upsell-closed'}">
                  <div class="header-container">
                    <div class="upsell-header">
                      Seat Map Preview
                    </div>
                    <div class="upsell-close" @click="${this.toggleViewable}">
                      ${this.closeIcon}
                    </div>
                  </div>

                  <slot name="upsell-content" class="upsell-container">
                  </slot>
                </div>
              </div>
            </div>
        `;
  }
}

if (!customElements.get('fs-drawer')) {
  customElements.define('fs-drawer', FsDrawer);
}
