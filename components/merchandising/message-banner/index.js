/* eslint-disable max-len */
import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {wrapWithSlot, isIE11} from '../../shared/utility';
import {getAnchorElement} from '../../shared/auroUtility';

class MessageBanner extends LitElement {
  static get styles() {
    return css`
      .p2p.p2p-message-container {
        font-family: 'AS Circular', 'Circular', Helvetica Neue, Arial, sans-serif;
        display: flex;      
        background: rgb(255, 255, 255);
        border-radius: 8px;
        border-style: solid;
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
        background: url(https://sitecore-prod-cd-westus2.azurewebsites.net/-/media/Images/common-assets/misc/661x282_next-level-care-logo.png);
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
        color: var(--auro-color-brand-midnight-400);
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
            ${isIE11() ? html`<style>${unsafeCSS(MessageBanner.styles)}</style>` : ''}
            <!--<div class="p2p p2p-message-container">
              ${wrapWithSlot('image', html`<div class="p2p-message-image"></div>`)}
              <div class="p2p-message-content">
                <div class="p2p-title">
                  ${wrapWithSlot('title', 'Farewell to change fees.')}
                </div>
                  <div class="p2p-body">
                    ${wrapWithSlot('message', html`
                      <div class="p2p-message">
                        <p class="p2p-first-message">Get ${getAnchorElement('https://www.alaskaair.com/content/advisories/coronavirus', 'Next-Level Care')} and the best experience in the air with no change fees on Main and First Class fares.</p>
                        <p class="p2p-first-message">Book your flights today with the confidence that you can change them later, for just the fare difference.</p>
                        <p class="p2p-last-message">${getAnchorElement('https://www.alaskaair.com/content/travel-info/policies/how-to-manage-my-reservation', 'Learn more')} about changing your travel plans.</p>
                      </div>
                    `)}
                  </div>              
                </div>
            </div>-->
        `;
  }
}
if (!customElements.get('message-banner')) {
  customElements.define('message-banner', MessageBanner);
}
