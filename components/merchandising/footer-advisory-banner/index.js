import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../../flight-search/modals/fs-currency-converter/index.js';
import '@alaskaairux/auro-icon';

class FooterAdvisoryBanner extends LitElement {
  static get styles() {
    return css`
      .banner {
        display: flex;
        background: #FFFFFF;
        border: 1px solid var(--auro-color-border-primary-on-dark);
        border-radius: var(--auro-size-xs);
        overflow: hidden;
        padding: 24px;
      }

      .info-icon {
        width: 24px;
      }

      .content {
        float: right;
        line-height: var(--auro-size-md);
        margin-left: 10px;
      }

      .content p {
        color: var(--auro-color-text-secondary-on-light);
        font-size: var(--auro-text-body-size-xs);
        margin: 0;
      }

      .currency-converter {
        color: var(--auro-color-text-link-on-light);
        text-decoration: underline;
        cursor: pointer;
      }

      .currency-converter:hover {
        color: var(--auro-color-ui-hover-on-light);
        text-decoration: none;
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
            ${isIE11() ? html`<style>${unsafeCSS(FooterAdvisoryBanner.styles)}</style>` : ''}
            <div class="banner">
              <auro-icon
                category="alert"
                name="information-stroke"
                class="info-icon" >
              </auro-icon>
              <div class="content">
                <p>
                  Inflight Wi-Fi availability is subject to change without notice and is not 
                  available when flying over Latin America, the Pacific Ocean and portions of Canada and Alaska. 
                </p>
                <br>
                <p>
                  Amounts are quoted per person in US dollars, one way, and subject to change without notice 
                  until purchased. The final price might differ from the price shown on this page due to a 
                  real-time fare change or other mandatory recalculation.
                  <auro-hyperlink class="currency-converter"
                  @click="${() => window.dispatchEvent(new CustomEvent('currencyOpen'))}">
                    Currency converter
                  </auro-hyperlink>
                </p>
                <br>
                <p>
                  Need assistance? 
                  <auro-hyperlink href="https://www.alaskaair.com/content/about-us/contact-us/
                                      online-help.aspx?lid=AvailFlights:Rev:Sched::contactUs">
                                      Contact us
                  </auro-hyperlink>
                </p>
              </div>
            </div>
            <fs-currency-converter></fs-currency-converter>
        `;
  }
}

if (!customElements.get('footer-advisory-banner')) {
  customElements.define('footer-advisory-banner', FooterAdvisoryBanner);
}
