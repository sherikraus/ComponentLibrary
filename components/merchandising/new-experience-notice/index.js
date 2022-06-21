import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {ApplicationInsights} from '@microsoft/applicationinsights-web';
import {isIE11} from '../../shared/utility';
import '@alaskaairux/auro-icon';

class NewExperienceNotice extends LitElement {
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
  }

  static get properties() {
    return {
      currentVersion: {type: String},
      ori: {type: String},
      dep: {type: String},
      date: {type: String},
    };
  }

  static get styles() {
    return css`
      .banner {
        background: var(--auro-color-brand-atlas-100);
        padding: var(--auro-size-lg) var(--auro-size-none);
      }

      .container {
        display: flex;
        width: 80%;
        max-width: 1232px;
        margin: var(--auro-size-none) auto;
        justify-content: center;
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
      }

      .notice-text p {
        margin: var(--auro-size-none);
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
      name: 'NewExperienceNotice',
      properties: {
        origin: this.ori,
        destination: this.dep,
        departureDate: this.date,
      },
    });
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(newExperienceNotice.styles)}</style>` : ''}
            <div class="banner">
              <div class="container">
                <auro-icon
                  primary
                  category="interface"
                  name="notification-active"
                  class="icon">
                </auro-icon>
                <div class="notice-text">
                  <p>Check it out! A new improved flight search experience! 
                    Currently this new look is limited to showing one-way, single-passenger trips. 
                    If you prefer, you can 
                    <auro-hyperlink @click="${this.trackEvent}" href="${this.currentVersion}">
                      switch to the current version
                    </auro-hyperlink>.
                  </p>
                </div>
              </div>
            </div>
        `;
  }
}

if (!customElements.get('new-experience-notice')) {
  customElements.define('new-experience-notice', NewExperienceNotice);
}
