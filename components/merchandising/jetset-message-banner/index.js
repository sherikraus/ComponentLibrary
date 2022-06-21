/* eslint-disable max-len */
import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {wrapWithSlot, isIE11} from '../../shared/utility';
import '@alaskaairux/auro-hyperlink';
import '@alaskaairux/auro-header';

class JetsetMessageBanner extends LitElement {
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
        padding: var(--auro-size-xl);
        margin: var(--auro-size-lg) 0px;
      }
      .p2p .p2p-message-image {
        flex-basis: 208px;
        flex-shrink: 0;
        flex-grow: 0;
        /*Test svg or pnr backgroup locally */
        /*background: url(../../assets/jetset.svg);*/
        background: url(https://p2pcontent-fd-prod.azurefd.net/icons/jetset.svg);
        background-size: auto 100%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin-right:var(--auro-size-xxl);
      }

      .p2p .p2p-message-content {
        flex: 1;
      }
      
      .p2p .p2p-body {        
        color: rgb(98, 107, 121);
        font-size: var(--auro-size-md);
        font-family: ASCircular-Book, 'Circular';
        font-weight: 300;
        letter-spacing: 0px;
      }

      .p2p .p2p-message .p2p-first-message {
        margin-top: var(--auro-size-md);
        margin-bottom:var(--auro-size-lg);
      }

      .p2p .p2p-message .p2p-last-message {
        margin-bottom: 0px;
      }

      @media (max-width: 500px) {
       .p2p-message-image {
         display: none;
       } 

       .p2p.p2p-message-container {
        padding: var(--auro-size-lg);
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
            ${isIE11() ? html`<style>${unsafeCSS(JetsetMessageBanner.styles)}</style>` : ''}
            <div class="p2p p2p-message-container">
              ${wrapWithSlot('image', html`<div class="p2p-message-image"></div>`)}
              <div class="p2p-message-content">
                  <auro-header level="3" display="500" color="var(--auro-color-brand-midnight-400)">
                    ${wrapWithSlot('title', 'On your mark, offset, go!')}
                  </auro-header>
                  <div class="p2p-body">
                    ${wrapWithSlot('message', html`
                      <div class="p2p-message">
                        <p class="p2p-first-message">We've partnered with The Good Traveler to offer you a quick and easy way to make your air travel more sustainable. Purchase credible carbon offsets to reduce your impact and help fund local climate projects.</p>
                        <p class="p2p-last-message"><auro-hyperlink secondary cta href="https://thegoodtraveler.org/?utm_source=alaska-checkout&utm_medium=order&utm_campaign=alaska" target="_blank">Offset your flight</auro-hyperlink></p>                     
                      </div>
                    `)}
                  </div>              
                </div>
            </div>
        `;
  }
}
if (!customElements.get('jetset-message-banner')) {
  customElements.define('jetset-message-banner', JetsetMessageBanner);
}
