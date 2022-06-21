import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../../shared/utility';
import '@alaskaairux/auro-hyperlink';
import '@alaskaairux/auro-dialog';
import '@alaskaairux/auro-input';
import '@alaskaairux/auro-button';
import '@alaskaairux/auro-loader';
import '@aurodesignsystem/auro-select';
import '@aurodesignsystem/auro-dropdown';
import '@aurodesignsystem/auro-menu';
import '@alaskaairux/auro-interruption/dist/style-unformatted.scss';

class FSCurrencyConverter extends LitElement {
  static get properties() {
    return {
      amount: {type: Number},
      receivedData: {type: Boolean},
      currencies: {type: Array},
      countries: {type: Array},
      currencyNames: {type: Array},
      rates: {type: Array},
      index: {type: Array},
      fromRate: {type: Number},
      toRate: {type: Number},
      result: {type: Number},
    };
  }

  constructor() {
    super();
    this.amount = 1;
    this.receivedData = false;
    this.currencies = [];
    this.countries = [];
    this.currencyNames = [];
    this.rates = [];
    this.index = [];
  }

  static get styles() {
    return css`
      .border {
        max-width: 200px;
      }

      #footer {
        text-align: center;
      }

      #conversion-results-footer {
        color: var(--auro-color-text-secondary-on-light);
        font-size: var(--auro-text-body-size-sm);
      }

      auro-menu {
        overflow: auto;
        max-height: 200px;
      }

      #currency-converter-modal {
        font-size: var(--auro-text-body-size-default);
        line-height: var(--auro-size-lg);
      }

      .loader-container {
        justify-content: center;
        align-items: center;
      }
    `;
  }

  firstUpdated() {
    this.fetchCurrencyData();

    window.addEventListener('currencyOpen', (e) => {
      this.showModal('#currency-converter-modal', e);
    });
  }

  showModal(elName, event) {
    const upsell = this.shadowRoot.querySelector(elName);
    event.stopPropagation();
    upsell.removeAttribute('open');
    upsell.setAttribute('open', '');
  }

  showResults() {
    const resultText = this.shadowRoot.getElementById('conversion-results');
    if (resultText.style.display === 'none') {
      resultText.style.display = 'block';
    }
    this.shadowRoot.getElementById('conversion-results').focus({preventScroll: false});
  }

  fetchCurrencyData() {
    fetch('https://www.alaskaair.com/Shopping/CurrencyConverter/AllRates')
        .then((response) => {
          return response.text();
        })
        .then((text) => {
        // API data is in text, so need to parse into JSON to grab objects
          const data = JSON.parse(text);
          for (let i = 0; i < data.length; i++) {
            this.currencies[i] = data[i].CurrencyCode;
            this.countries[i] = data[i].CountryName;
            this.currencyNames[i] = data[i].CurrencyName;
            this.rates[i] = data[i].ExchangeRate;
          }
          // receivedData allows for modal HTML to render
          this.receivedData = true;
        })
        .catch((error) => {
          console.error('Currency converter error:', error);
        });
  }

  handleFrom(input) {
    this.fromRate = input.target.getAttribute('data-value');
    this.index[0] = input.target.getAttribute('index');

    // Disable convert button when user selects break-point
    if (input.target.innerHTML == '-----------------------------') {
      this.shadowRoot.getElementById('convertButton').setAttribute('disabled', '');
    } else {
      this.shadowRoot.getElementById('convertButton').removeAttribute('disabled');
    }
  }

  handleTo(input) {
    this.toRate = input.target.getAttribute('data-value');
    this.index[1] = input.target.getAttribute('index');

    // Disable convert button when user selects break-point
    if (input.target.innerHTML == '-----------------------------') {
      this.shadowRoot.getElementById('convertButton').setAttribute('disabled', '');
    } else {
      this.shadowRoot.getElementById('convertButton').removeAttribute('disabled');
    }
  }

  convert() {
    const amountInput = this.shadowRoot.querySelector('#amountInput');
    const conversionResult = this.shadowRoot.getElementById('conversion-results-text');
    const conversionResultRateDisplay = this.shadowRoot.getElementById('conversion-results-rate-display');

    const fromSelect = this.shadowRoot.querySelector('auro-select#fromSelect');
    const toSelect = this.shadowRoot.querySelector('auro-select#toSelect');

    this.fromRate = fromSelect.optionSelected.getAttribute('value');
    this.toRate = toSelect.optionSelected.getAttribute('value');
    this.index[0] = fromSelect.optionSelected.getAttribute('index');
    this.index[1] = toSelect.optionSelected.getAttribute('index');

    // Auto-populates default currency rate values when user first opens
    if (this.toRate === undefined) {
      this.toRate = this.rates[1];
      this.index[1] = 1;
    }
    if (this.fromRate === undefined) {
      this.fromRate = this.rates[0];
      this.index[0] = 0;
    }

    // Calculate conversion and save into result
    const temp = amountInput.value * this.toRate / this.fromRate;
    const temp1 = this.toRate / this.fromRate;
    this.result = Math.round(temp * 100) / 100;

    // Check if inputs are invalid, otherwise show results
    if (isNaN(amountInput.value) || isNaN(this.result) || amountInput.value <= 0) amountInput.isValid = false;
    else {
      conversionResult.innerHTML = amountInput.value + ' (' + this.currencies[this.index[0]] +
                                   ') = ' + this.result + ' (' + this.currencies[this.index[1]] + ')';
      conversionResultRateDisplay.innerHTML = 'Conversion rate (updated daily):<br>1 ' +
                                              this.currencies[this.index[0]] + ' = ' + temp1 +
                                              ' ' + this.currencies[this.index[1]];
      this.showResults();
    }
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
            ${isIE11() ? html`<style>${unsafeCSS(FSCurrencyConverter.styles)}</style>` : ''}
            <auro-dialog id="currency-converter-modal" fixed sm>
              <span slot="header">Currency converter</span>
              <aside slot="content">
              ${this.receivedData ?
                html`
                  <auro-input
                    required
                    id="amountInput"
                    label="Amount"
                    value=${this.amount}
                    type="number"
                    customValidationMessage="Please insert a valid amount">
                  </auro-input>
                  <br>
                  <auro-select id="fromSelect">
                    <span slot="label">From</span>
                    <auro-menu>
                      ${this.currencies.map((x, i) =>
                  html`${(i === 4) ?
                          html`<auro-menuoption disabled index=${i}>
                          -----------------------------</auro-menuoption>` :
                          html`${(i === 0) ?
                            html`<auro-menuoption selected value="${this.rates[i]}"
                                index=${i}>${this.countries[i]} ${this.currencyNames[i]} (${x})</auro-menuoption>` :
                            html`<auro-menuoption value="${this.rates[i]}"
                            index=${i}>${this.countries[i]} ${this.currencyNames[i]} (${x})</auro-menuoption>`
                          }`
                  }`,
                )}
                    </auro-menu>
                  </auro-select>
                  <br>
                  <auro-select id="toSelect">
                    <span slot="label">To</span>
                    <auro-menu>
                      ${this.currencies.map((x, i) =>
                  html`${(i === 4) ?
                          html`<auro-menuoption disabled index=${i}>
                              -----------------------------</auro-menuoption>` :
                          html`${(i === 1) ?
                              html`<auro-menuoption selected value="${this.rates[i]}"
                                  index=${i}>${this.countries[i]} ${this.currencyNames[i]} (${x})</auro-menuoption>` :
                              html`<auro-menuoption value="${this.rates[i]}"
                              index=${i}>${this.countries[i]} ${this.currencyNames[i]} (${x})</auro-menuoption>`
                          }`
                  }`,
                )}
                    </auro-menu>
                  </auro-select>
                  <br>
                  <div id="footer">
                    <auro-button
                      id="convertButton"
                      @click="${this.convert}"
                    >
                      Convert
                    </auro-button>
                    <div id="conversion-results" tabindex="0" style="display: none">
                      <auro-header display="500" id="conversion-results-text"></auro-header>
                        <div id="conversion-results-footer">
                          <p id="conversion-results-rate-display"></p>
                          <p>Purchases at alaskaair.com are in U.S. dollars.</p>
                        </div>
                    </div>
                  </div>
                ` :
                html`
                  <div class="loader-container">
                    <auro-loader pulse onlight sm></auro-loader>
                  </div>
                `
}
              </aside>
            </auro-dialog>
        `;
  }
}

if (!customElements.get('fs-currency-converter')) {
  customElements.define('fs-currency-converter', FSCurrencyConverter);
}
