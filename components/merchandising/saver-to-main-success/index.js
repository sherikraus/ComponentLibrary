import {css, html, LitElement, unsafeCSS} from 'lit-element';
import assignIconFromProperty from '../../shared/buildIcon';
import {isIE11, wrapWithSlot} from '../../shared/utility';

class SaverToMainSucces extends LitElement {
  static get properties() {
    return {
      imageRight: {type: Boolean},
      checkStroke: {type: String},
    };
  }

  async firstUpdated() {
    this.checkStroke = await assignIconFromProperty(this.checkStroke, 'check-stroke');
  }

  static get styles() {
    return css`
      .saver-upsell-success { 
        font-family: 'AS Circular', 'Circular', Helvetica Neue, Arial, sans-serif;
        display: flex;      
        background: rgb(255, 255, 255);
        border-radius: 8px;
        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.26),
        0px 2px 4px 1px rgba(0, 0, 0, 0.12);
        overflow: hidden;
      }
      
      
      .saver-upsell-success .p2p-upsell-section { 
        flex: 1;
      }

      .saver-upsell-success .upsell-disclaimer {
        color: rgb(98, 107, 121);
        font-family: 'ASCircular-Book', 'Circular';
        font-size: 12px;
        font-weight: 300;        
        line-height: 16px;
        margin: 12px 0px;
      }
      
      .saver-upsell-success .p2p-upsell-section img {
        width: 100%;
      }

      .saver-upsell-success .upsell-image-section {
        background: url('https://resource.alaskaair.net/-/media/Images/pathtopurchase/AS_Employee_Luggage');
        background-size: auto 100%;
        background-position: 13% 0%;
      }
      
      .saver-upsell-success .p2p-upsell-section.upsell-message {
        color: rgb(98, 107, 121);
        font-size: 16px;
        font-weight: 300;
        line-height: 24px;
        margin: 2em 0em;
        padding: 0em 2em;
      }
      
      .saver-upsell-success .upsell-message-list {
        margin: 0px;
        font-weight: 300;
        font-family: 'ASCircular-Book', 'Circular';
        font-size: 24px;
        padding-left: 1.3em;
      }

      .saver-upsell-success .upsell-message-list span {
        font-size: 16px;
      }
      
      .saver-upsell-success .upsell-title {
        font-family: 'ASCircular-Medium', 'Circular';
        color: rgb(34, 34, 34);
        font-size: 24px;
        font-weight: 500;
        letter-spacing: -0.2px;
        line-height: 32px;
        padding-bottom: 8px;
      }

      /* Only using Important because svg contains inlined styles */
      .saver-upsell-success .upsell-title svg {
        height: 26px !important;
        width: 26px !important;
        color: rgb(0, 128, 93);
        vertical-align: middle;
        margin-top: -4px;
      }

      .saver-upsell-success .upsell-message-content {
        font-family: 'ASCircular-Book', 'Circular';
      }

      .saver-upsell-success .upsell-image-section {
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

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(SaverToMainSucces.styles)}</style>` : ''}
            <div class="saver-upsell-success">
              ${wrapWithSlot('image-left', html`
                <div class="p2p-upsell-section upsell-image-section" style="${this.imageRight ? 'display:none;' : ''}">
                </div>
              `)}
              <div class="p2p-upsell-section upsell-message">
                <div class="upsell-title">
                  ${wrapWithSlot('title-icon', this.checkStroke)}
                  ${wrapWithSlot('title', 'Excellent! You\'ve been upgraded to Main. *')}
                </div>
                <div class="upsell-message-content">
                  ${wrapWithSlot('content', html`
                    Now you'll enjoy:
                    <ul class="upsell-message-list">
                      <li>
                        <span>
                          Earlier boarding and overhead bin access
                        </span>
                      </li>
                      <li>
                        <span>
                          Flight changes and cancellations
                        </span>
                      </li>
                    </ul>
                    <br/>
                    Select "Next" to continue to seat selection.
                  `)}
                </div>
                <div class="upsell-disclaimer">
                  ${wrapWithSlot('disclaimer', '*Additional fees may apply.')}
                </div>
              </div>
              ${wrapWithSlot('image-right', html`
                <div class="p2p-upsell-section upsell-image-section" style="${this.imageRight ? '' : 'display:none;'}">
                </div>
              `)}                                         
            </div>
        `;
  }
}

if (!customElements.get('saver-to-main-success')) {
  customElements.define('saver-to-main-success', SaverToMainSucces);
}
