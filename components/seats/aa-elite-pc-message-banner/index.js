/* eslint-disable max-len */
import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {wrapWithSlot, isIE11} from '../../shared/utility';
import '@alaskaairux/auro-icon';

class AAElitePCMessageBanner extends LitElement {
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

      .p2p .p2p-message-icon {
        width: 5rem;
        padding: 5px 7px 0px 12px;
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

      @media (max-width: 500px) {
        .p2p-message-icon {
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
    
            ${isIE11() ? html`<style>${unsafeCSS(AAElitePCMessageBanner.styles)}</style>` : ''}
            <div class="p2p p2p-message-container">
              <div class="p2p-message-icon">
                ${wrapWithSlot('image', html`<auro-icon 
                accent
                customSize 
                name="elite"
                category="in-flight"></auro-icon>`)}
              </div>
              <div class="p2p-message-content">
                <div class="p2p-title">
                  ${wrapWithSlot('title', 'Complimentary Elite seat upgrade')}
                </div>
                  <div class="p2p-body">
                    ${wrapWithSlot('message', html`
                      <div class="p2p-message">
                        <p class="p2p-first-message">For our American Airlines Elite members, you may qualify for a complimentary upgrade to Premium Class seating after your booking is complete. You may wait until after completing your booking to select your seats.
                        </p>
                      </div>
                    `)}
                  </div>              
                </div>
            </div>
        `;
  }
}

if (!customElements.get('aa-elite-pc-message-banner')) {
  customElements.define('aa-elite-pc-message-banner', AAElitePCMessageBanner);
}
