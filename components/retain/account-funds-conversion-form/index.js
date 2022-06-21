import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11, wrapWithSlot} from '../../shared/utility';
import '@alaskaairux/auro-header';
import '@alaskaairux/auro-button';

import {getMileagePlanNumber, getWalletConversion, submitWalletConversion} from './walletService';

/*
 * Parameter defaults
 */
const defaultSelectorLabel = 'Choose an offer:';
const defaultAgreementText =
  'By converting wallet funds to miles, I agree to the terms and conditions below.';
const defaultButtonText = 'Convert';
const defaultConversionAmounts = [];
const defaultConfirmationRedirectUrl = 'https://www.alaskaair.com/www2/ssl/myalaskaair/myalaskaair.aspx';
const defaultToUnitDisplayName = 'miles';

/*
 * Properties
 */
const headerText = 'Your wallet balance is ';
const insufficientFundsMessage = 'Insufficient Funds';
const somethingWentWrongMessage = 'Something went wrong, please try again later.';

/*
 * Helper methods
 */
const _displayOption = ({from, to}, unitDisplay) => `${from.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})} = ${to.toLocaleString()} ${unitDisplay}`;

class accountFundsConversionForm extends LitElement {
  static get properties() {
    return {

      // Parameters (Set from HTML attributes)
      selectorLabel: {type: String},
      agreementText: {type: String},
      buttonText: {type: String},
      getWalletConversionApiKey: {type: String},
      getWalletConversionEndpoint: {type: String},
      submitWalletConversionApiKey: {type: String},
      submitWalletConversionEndpoint: {type: String},
      getJwtEndpoint: {type: String},
      confirmationRedirectUrl: {type: String},

      // Properties
      balanceText: {type: String, attribute: false},
      walletBalance: {type: Number, attribute: false},
      conversionAmounts: {type: Array, attribute: false},
      toUnitDisplayName: {type: String, attribute: false},
      mileagePlanNumber: {type: String, attribute: false},
      error: {type: Boolean, attribute: false},
      errorMessage: {type: String, attribute: false},
    };
  }
  constructor() {
    super();
    this.selectorLabel = defaultSelectorLabel;
    this.agreementText = defaultAgreementText;
    this.buttonText = defaultButtonText;
    this.confirmationRedirectUrl = defaultConfirmationRedirectUrl;
    this.conversionAmounts = defaultConversionAmounts;
    this.toUnitDisplayName = defaultToUnitDisplayName;
    this.error = false;
  }
  static get styles() {
    return css`
      :host {
        font-size: var(--auro-text-body-size-default);
        font-family: var(--auro-font-family-default);
        color: var(--auro-color-text-primary-on-light);
      }
      .conversion-form-container {
        padding-top: var(--auro-size-xxl);
        width: 100%;
      }
      .conversion-form {
        position: relative;
        border: var(--auro-border-width-thick) solid
          var(--auro-color-border-primary-on-light);
        border-bottom: var(--auro-size-xxs) solid var(--auro-color-border-active-on-light);
        border-radius: var(--auro-border-radius);
        padding: 40px var(--auro-size-xl) 80px;
        min-height: 285px;
      }
      .form-image-container {
        position: absolute;
        right: 35px;
        top: -50px;
      }
      .required-field {
        color: var(--auro-color-text-secondary-on-light);
      }
      .agreement-text {
        margin-top: 40px;
      }
      .conversion-selector {
        display: block;
        width: 100%;
        font-family: var(--auro-font-family-default);
        font-size: 15px;
        padding: var(--auro-size-sm);
      }
      .conversion-selector:disabled {
        border-color: var(--auro-color-border-disabled-on-light);
        background-color: var(--auro-color-background-lighter);
      }
      .error-message {
        color: var(--auro-color-text-error-on-light);
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

  async submitForm(event) {
    event.preventDefault(); // prevent IE11 form submit handling
    const convertButton = this.renderRoot.querySelector('#conversionButton');
    convertButton.disabled = true;
    const selectOptions = this.renderRoot.querySelector('#conversionSelect');
    selectOptions.disabled = true;

    const amountToConvert = selectOptions.options[selectOptions.selectedIndex].value;
    const response = await submitWalletConversion(this.mileagePlanNumber, this.submitWalletConversionApiKey,
        this.submitWalletConversionEndpoint, amountToConvert, this.getJwtEndpoint);
    if (!response || Object.keys(response).length === 0) {
      this.error = true;
      this.errorMessage = somethingWentWrongMessage;
    } else {
      location.href = this.confirmationRedirectUrl;
    }
  }

  async firstUpdated() {
    this.mileagePlanNumber = getMileagePlanNumber();
    const response = await getWalletConversion(this.mileagePlanNumber, this.getWalletConversionApiKey,
        this.getWalletConversionEndpoint, this.getJwtEndpoint);
    if (!response || Object.keys(response).length === 0) {
      this.error = true;
      this.errorMessage = somethingWentWrongMessage;
      return;
    }

    this.walletBalance = response.currentBalance;
    if (!this.walletBalance || this.walletBalance === 0) {
      this.error = true;
      this.errorMessage = insufficientFundsMessage;
      this.balanceText = `${headerText} $0.00`;
      return;
    }
    this.balanceText = `${headerText}${this.walletBalance.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })}`;
    this.conversionAmounts = response.conversionAmounts;
    this.toUnitDisplayName = response.toUnitDisplayName;
  }

  render() {
    return html`
      ${isIE11() ?
        html`<style>
            ${unsafeCSS(accountFundsConversionForm.styles)}
          </style>` :
        ''}
      <div class="conversion-form-container">
        <form class="conversion-form">
          <div class="form-image-container">
            ${wrapWithSlot('image', html` <div class="form-image"></div> `)}
          </div>
          ${this.balanceText ?
        (isIE11() ?
          html`<h3 data-cy="testFormHeader">${this.balanceText}</h3>` :
          html`<auro-header level="3" display="800" data-cy="testFormHeader">${this.balanceText}</auro-header>`
        ) : ''}
          <label
            class="required-field"
            for="conversionSelect"
            data-cy="conversion-selectOptions"
            >${this.selectorLabel}</label
          >
          <select
            id="conversionSelect"
            class="conversion-selector"
            required
            ?disabled=${this.error}
          >
            ${this.error ?
        html`<option aria-label="no selections available">-</option>` :
        this.conversionAmounts.map(
            (amount) => html`<option value=${amount.from}>${_displayOption(amount, this.toUnitDisplayName)}</option>`,
        )}
          </select>
          ${this.error ? html`
          <p role="alert" class="error-message" data-cy="error-message">
            <span>${this.errorMessage}</span>
          </p>`: html``}
          <p class="agreement-text" data-cy="agreement-text">${this.agreementText}</p>
          ${isIE11() ?
        html`
            <button
              id="conversionButton"
              aria-label="click to convert funds"
              class="conversion-button" 
              data-cy="cta-button"
              @click=${this.submitForm}
              ?disabled=${this.error}
              >${this.buttonText}</button>` :
        html`
            <auro-button
              fluid
              id="conversionButton"
              arialabel="click to convert funds"
              class="conversion-button"
              data-cy="cta-button"
              @click=${this.submitForm}
              ?disabled=${this.error}
            >${this.buttonText}</auro-button>`
}
        </form>
      </div>
    `;
  }
}
if (!customElements.get('account-funds-conversion-form')) {
  customElements.define(
      'account-funds-conversion-form',
      accountFundsConversionForm,
  );
}
