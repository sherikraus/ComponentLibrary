import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {ApplicationInsights} from '@microsoft/applicationinsights-web';
import {isIE11} from '../../shared/utility';
import '@alaskaairux/auro-icon';

class NewExperienceLanding extends LitElement {
  constructor() {
    super();
    this.appInsights = new ApplicationInsights({
      config: {
        connectionString:
          'InstrumentationKey=002dcd47-5020-4e91-9798-b79c942c10c0',
        instrumentationKey:
          '002dcd47-5020-4e91-9798-b79c942c10c0',
        samplingPercentage: 100,
      },
    });
    this.appInsights.loadAppInsights();
    this.open = true;
  }

  static get properties() {
    return {
      currentVersion: {type: String},
      ori: {type: String},
      dep: {type: String},
      date: {type: String},
      open: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      .banner {
        background: var(--auro-color-brand-atlas-100);
        padding: var(--auro-size-lg) var(--auro-size-none);
      }

      .banner.closed {
        background: white;
      }

      .container {
        display: flex;
        max-width: 980px;
        align-items: center;
        margin: var(--auro-size-none) auto;
        justify-content: space-between;
      }

      .icon {
        width: var(--auro-size-lg);
        margin-right: var(--auro-size-md);
      }

      .notice-text {
        text-align: left;
        float: right;
        font-family: var(--auro-font-family-default);
        font-size: var(--auro-text-body-size-default);
        color: var(--auro-color-text-primary-on-light);
        display: flex;
        justify-content: center;
      }

      .notice-text p {
        margin: var(--auro-size-none);
        padding-top:2px;
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

  trackEvent() {
    this.appInsights.trackEvent({
      name: 'NewExperienceLanding',
      properties: {
        origin: this.ori,
        destination: this.dep,
        departureDate: this.date,
      },
    });
  }

  handleClose() {
    this.open = false;
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(newExperienceLanding.styles)}</style>` : ''}
            <div class="banner ${this.open ? '' : 'closed'}">
            ${this.open ? html`
            <div class="container">
                <div class="notice-text">
                  <auro-icon
                    primary
                    category="interface"
                    name="notification-active"
                    class="icon">
                  </auro-icon>
                  <p>You're now in the classic flight search experience. We look forward to flying with you!
                  </p>
                </div>
                <auro-icon category="interface" name="x-sm" @click=${this.handleClose}></auro-icon>
              </div>
            ` : html``}

            </div>
        `;
  }
}

if (!customElements.get('new-experience-landing')) {
  customElements.define('new-experience-landing', NewExperienceLanding);
}
