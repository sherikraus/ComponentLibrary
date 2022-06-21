import {css, html, LitElement} from 'lit-element';
import {isIE11} from '../../shared/utility';
import assignIconFromProperty from '../../shared/buildIcon';
import 'whatwg-fetch';
import '@alaskaairux/auro-input';
import '@alaskaairux/auro-button';
import '@alaskaairux/auro-checkbox';
import '@alaskaairux/auro-header';
import '@alaskaairux/auro-hyperlink';

const genericErrorText = 'Something went wrong on our end. Please try again.';

class LoginForm extends LitElement {
  // this will render on the second browser event loop
  async firstUpdated() {
    this.errorIcon = await assignIconFromProperty(this.errorIcon, 'error');
    this.processing = false;
  }

  handleKeyup(event) {
    if (event.keyCode === 13) {
      this.submitForm();
    }
  }

  async submitForm() {
    this.processing = true;
    const UserIdOrMPNumber = this.shadowRoot.querySelector('#UserIdOrMPNumber')
        .value;
    const UserPassword = this.shadowRoot.querySelector('#UserPassword').value;
    const CheckboxRememberMe = this.shadowRoot.querySelector(
        '#CheckboxRememberMe',
    ).checked;
    const body = JSON.stringify({
      UserIdOrMPNumber,
      UserPassword,
      CheckboxRememberMe,
    });
    try {
      const response = await window.fetch(this.postUrl, {
        method: 'POST',
        body,
      });
      const {summaryError, redirectUrl} = await response.json();
      if (redirectUrl) {
        window.location.href = redirectUrl || 'https://www.alaskaair.com';
        return;
      }
      if (summaryError) {
        this.errorSummary = [summaryError];
        this.processing = false;
      }
    } catch (e) {
      this.errorSummary = [genericErrorText];
      this.processing = false;
    }
  }

  static get properties() {
    return {
      headerText: {type: String},
      resetUsernameLink: {type: String},
      resetPasswordLink: {type: String},
      mpJoinLink: {type: String},
      rememberMe: {type: Boolean},
      postUrl: {type: String},
      errorSummary: {type: Array},
      errorIcon: {type: String},
      processing: {type: Boolean},
    };
  }
  constructor() {
    super();
    this.processing = false;
  }
  static get styles() {
    return css`
      :host {
        font-size: var(--auro-text-body-size-default);
        font-family: var(--auro-font-family-default);
        --border-width-thin: 1px;
        --color-base-chili:#df0b37;
        --color-brand-blue-atlas-base:#0074cb;
        --color-base-shark: #58606c;
        --color-type-disabled: #c8c9c7;
        --size-scale-micro:0.25rem;
        --size-scale-sml:0.5rem:
        --size-scale-xl:2rem;
        --size-breakpoint-all-med:1rem;
      }
      .login-form {
        display:flex;
        flex-direction:column;
        max-width: 635px;
        min-height: 380px;
      }
      .login-form .input-group {
        display: inline-flex;
        flex-direction:column;
        width: 100%;
      }
      .login-form .username-group{
        margin-bottom: var(--auro-size-lg);
      }
      .login-form .password-group{
        margin-bottom: var(--auro-size-lg);
      }
      .login-form .login-submit-button{
        margin-top: var(--auro-size-xl);
        margin-bottom: var(--auro-size-xxl);
      }
      .login-form .reset-links{
        align-self: flex-end;
        font-size: var(--auro-text-body-size-sm);
      }
      .login-form .login-text-input{
        width: 100%;
        border: var(--auro-border-width-thin);
      }
      .login-form .join-mp{
        font-size: var(--auro-text-body-size-sm);
      }
      .login-form .join-mp-description{
        color: var(--auro-color-base-gray-500);
      }
      .login-form-error-summary {
        display:flex;
        padding: var(--auro-size-xs);
        border: var(--auro-border-width-thin) solid var(--auro-color-border-error-on-light);
        border-left-width: var(--auro-size-xs);
        border-radius:var(--auro-border-radius);
        margin-bottom: var(--auro-size-lg);
      }
      .login-form-error-summary svg path{
        fill: var(--auro-color-alert-error-on-light);
      }
      .login-form-error-summary .error-summary-text {
        display: inline-flex;
        align-items:flex-end;
        font-size: var(--auro-text-body-size-sm);
        margin-left: var(--auro-size-sm);
      }
      @media(min-width:660px){
        .login-form .join-mp{
          font-size: var(--auro-text-body-size-default);
        }
      }
      @media(min-width: 1024px){
        .login-form .join-mp{
          font-size: var(--auro-text-body-size-lg);
        }
        .login-form .error-summary-wide {
          width: 100%;
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

  /**
   * PLEASE DON'T CHANGE DATA-CY VALUES since this may break e2e tests.
   */

  render() {
    return html`
      ${isIE11() ?
        html`<style>
            ${this.styles}
          </style>` :
        ``}
      ${this.errorSummary ?
        html` <div class="login-form-error-summary">
            ${this.errorIcon}
            <span
              class="error-summary-text"
              role="alert"
              data-cy="testErrorSummaryText"
            >
              ${this.errorSummary.map((errorText) => html`${errorText}&nbsp;`)}
            </span>
          </div>` :
        null}

      <form class="login-form" id="signInForm">
        <auro-header
          display="800"
          margin="top"
          size="none"
          data-cy="testLoginHeader"
        >
          ${this.headerText}
        </auro-header>

        <div class="username-group input-group">
          <auro-input
            id="UserIdOrMPNumber"
            class="login-text-input"
            label="User ID or Mileage Plan number"
            required
            data-cy="testLoginUsernameInput"
          ></auro-input>
          <auro-hyperlink
            class="reset-links"
            href="${this.resetUsernameLink}"
            data-cy="testResetUsernameLink"
          >
            Forgot User ID?
          </auro-hyperlink>
        </div>

        <div class="password-group input-group">
          <auro-input
            type="password"
            id="UserPassword"
            class="login-text-input"
            label="Password"
            required
            @keyup="${(e) => this.handleKeyup(e)}"
            data-cy="testLoginPasswordInput"
          >
          </auro-input>
          <auro-hyperlink
            class="reset-links"
            href="${this.resetPasswordLink}"
            data-cy="testResetPasswordLink"
          >
            Forgot password?
          </auro-hyperlink>
        </div>

        <auro-checkbox id="CheckboxRememberMe">Remember me</auro-checkbox>

        <auro-button
          form="signInForm"
          class="login-submit-button"
          id="LoginButton"
          type="submit"
          @click="${this.submitForm}"
          fluid
          ?disabled="${this.processing ? true : false}"
          data-cy="testLoginSubmitButton"
        >
          ${this.processing ? 'Processing...' : 'Sign in'}
        </auro-button>

        <div class="join-mp">
          <span class="join-mp-description">Not a Mileage Plan Member?</span>
          <auro-hyperlink href="${this.mpJoinLink}" data-cy="testJoinMPLink"
            >Join now</auro-hyperlink
          >
        </div>
      </form>
    `;
  }
}

if (!customElements.get('login-form')) {
  customElements.define('login-form', LoginForm);
}
