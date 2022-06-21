/* eslint-disable max-len */
import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {wrapWithSlot, isIE11} from '../../shared/utility';
import {getAnchorElement} from '../../shared/auroUtility';

class PCMessageBanner extends LitElement {
  static get styles() {
    return css`
      .p2p.p2p-message-container {
        font-family: 'AS Circular', 'Circular', Helvetica Neue, Arial, sans-serif;
        display: flex;      
        background: rgb(255, 255, 255);
        border-radius: 8px;
        border-style: dotted;
        border-width: 1px;
        border-color: #626b79;
        overflow: hidden;        
        padding: 8px;
        margin: 24px 0px;
      }
      .p2p .p2p-message-image {
        flex-basis: 208px;
        flex-shrink: 0;
        flex-grow: 0;
        background: url(https://p2pcontent-fd-prod.azurefd.net/icons/legroom.svg);
        background-size: auto 100%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 8px;
      }

      .p2p .p2p-message-content {
        flex: 1;
        padding: 8px;
      }

      .p2p .p2p-title {                
        color: var(--auro-color-background-darker);
        font-size: 18px;
        font-family: ASCircular-Medium, 'Circular';
        font-weight: 500;
      }
      
      .p2p .p2p-body {        
        color: rgb(98, 107, 121);
        font-size: 12px;
        font-family: ASCircular-Book, 'Circular';
        font-weight: 300;
        letter-spacing: 0px;
      }

      .p2p .p2p-message .p2p-first-message {
        margin-top: 4px;
      }

      .p2p .p2p-message .p2p-last-message {
        margin-bottom: 0px;
      }

      @media (max-width: 500px) {
       .p2p-message-image {
         display: none;
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

  getCurrentLocation() {
    return window.location.href;
  }

  render() {
    return html`
    
            ${isIE11() ? html`<style>${unsafeCSS(PCMessageBanner.styles)}</style>` : ''}
            <div class="p2p p2p-message-container">
              ${wrapWithSlot('image', html`<div class="p2p-message-image"></div>`)}
              <div class="p2p-message-content">
                <div class="p2p-title">
                  ${wrapWithSlot('title', 'Premium Class')}
                </div>
                  <div class="p2p-body">
                    ${wrapWithSlot('message', html`
                      <div class="p2p-message">
                        <p class="p2p-first-message">Get 4 more inches of legroom compared to the Main Cabin. Be among the first to board and deplane. Enjoy free beer, wine and cocktails on flights over 350 miles. It's nice to seat you.
                        </p>
                        <p class="p2p-last-message">${getAnchorElement('https://www.alaskaair.com/content/travel-info/flight-experience/premium-class', 'Explore Premium Class')}</p>
                      </div>
                    `)}
                  </div>              
                </div>
            </div>
        `;
  }
}

if (!customElements.get('pc-message-banner')) {
  customElements.define('pc-message-banner', PCMessageBanner);
}
