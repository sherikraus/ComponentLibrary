import {css, html, LitElement} from 'lit-element';
import stylesCss from './styles-css.js';

import overrideStyleAuroMenu from './Helpers/overrideStyleAuroMenu';
import ValidationManger from './Helpers/validationManager';
import telephoneCountryCodes from './Utils/telephoneCountryCodes';
import generateForm from './Helpers/generateForm';

import * as StateProvinceList from './Utils/StateProvinceList';
import airportData from '../../../hooks/airports-data';
import {getCityStateFromZip} from './Services/ZippopotamusService';
import Countries from './Utils/CountryCodes';
import {MpEnrollRequest} from './Helpers/mpEnrollRequest.js';

import './webcomponents';

const suportedCountryList = ['US', 'MX', 'CA'];

export class SignupForm extends LitElement {
  currentForm = {};
  airports;
  SuffixOptions;
  stateList;
  guestLocation = null;

  static get properties() {
    return {
      buttonText: {type: String},
      enrollEndpoint: {type: String},
      channel: {type: String},
      onEnroll: {type: Function},
      onError: {type: Function},
    };
  }

  async firstUpdated() {
    if (this.shadowRoot) {
      this.currentForm = generateForm(this.shadowRoot);
      overrideStyleAuroMenu(this.shadowRoot);
    }
  }

  constructor() {
    super();
    this.SuffixOptions = [
      {value: 'JR', display: 'Jr'},
      {value: 'SR', display: 'Sr'},
      {value: 'II', display: 'II'},
      {value: 'III', display: 'III'},
      {value: 'IV', display: 'IV'},
      {value: 'V', display: 'V'},
    ];
    this.airports = airportData
        .filter((airport) => airport.alaskaFlysToAirport)
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1; // nameA comes first
          }
          if (nameA > nameB) {
            return 1; // nameB comes first
          }
          return 0; // names must be equal
        });
    this.stateList = StateProvinceList.UnitedStatesTerritoryList;
  }

  async handleSubmit(e) {
    const validationManager = new ValidationManger();
    this.updateFormGenderValue();
    this.updateFormAllSelectValues();
    this.updateAllFormValues();
    validationManager.getGuestLocation(this.guestLocation);
    if (validationManager.isFormValid(this.currentForm)) {
      const json = await this.postInput();
      if (json === 'OK') {
        this.onEnroll('Success');
      } else {
        this.onEnroll('Failure');
      }
    } else {
      this.onError('Form not VALID');
    }
  }

  async postInput() {
    const request = new MpEnrollRequest();
    Object.keys(this.currentForm).forEach((key) => {
      if (this.currentForm[key]) {
        request[key] = this.currentForm[key].value;
      }
    });
    request.Channel = this.channel;
    const body = JSON.stringify(request);
    try {
      const response = await window.fetch(this.enrollEndpoint, {
        method: 'POST',
        body,
      });

      const json = await response.json();
      return json;
    } catch (error) {
      this.onError(`Error posting to solar: ${error}`);
    }
  }

  updateFormAllSelectValues() {
    const elements = this.shadowRoot.querySelectorAll('.auro-select');
    elements.forEach((element) => {
      this.updateFormFieldValue(element.id, element.value);
    });
  }

  updateFormFieldValue(key, value) {
    if (this.currentForm[key]) {
      this.currentForm[key].value = value;
      this.currentForm[key].element.value = value;
    }
  }

  updateStateDropDown(e) {
    if (e.target.id === 'Country') {
      switch (e.target.value) {
        case 'US':
          this.stateList = StateProvinceList.UnitedStatesTerritoryList;
          return;
        case 'MX':
          this.stateList = StateProvinceList.MexicoStateList;
          return;
        case 'CA':
          this.stateList = StateProvinceList.CanadaProvinceList;
        default:
          this.stateList = StateProvinceList.UnitedStatesTerritoryList.concat(
              StateProvinceList.MexicoStateList,
          ).concat(StateProvinceList.CanadaProvinceList);
      }
    }
  }

  updateFormGenderValue() {
    const Gender = 'Gender';
    const female = this.shadowRoot.querySelector('#radioFemale');
    const male = this.shadowRoot.querySelector('#radioMale');
    const nonBinary = this.shadowRoot.querySelector('#radioNonBinary');
    if (female.checked) {
      this.updateFormFieldValue(Gender, female.value);
    } else if (male.checked) {
      this.updateFormFieldValue(Gender, male.value);
    } else if (nonBinary.checked) {
      this.updateFormFieldValue(Gender, nonBinary.value);
    }
  }

  updateAllFormValues() {
    const validationManager = new ValidationManger();
    Object.keys(this.currentForm).forEach((key) => {
      this.updateFormFieldValue(key, this.shadowRoot.getElementById(key).value);
      validationManager.validateFormField(
          this.currentForm,
          this.currentForm[key].name,
      );
    });
  }

  handleBlur(e) {
    const validationManager = new ValidationManger();

    this.updateStateDropDown(e);
    // Update form Objects
    this.updateFormFieldValue(e.target.name, e.target.value);
    // Check for error and display if error is found
    validationManager.validateFormField(this.currentForm, e.target.name);
    // console.log(this.currentForm);
  }

  handleAddAddressTwo(e) {
    if (this.shadowRoot) {
      const addressTwo = this.shadowRoot.querySelector('#AddressLine2');
      e.target.setAttribute('style', 'display:none;');
      addressTwo.removeAttribute('style');
    }
  }

  toggleFields(listOfIds) {
    listOfIds.forEach((id) => {
      const el = this.shadowRoot.querySelector(`#${id}`);
      if (el && el.hasAttribute('disabled')) {
        el.removeAttribute('disabled');
      } else if (el) {
        el.setAttribute('disabled', true);
      }
    });
  }

  setStateForZipSelection(fieldName, value) {
    if (this.shadowRoot) {
      const field = this.currentForm[fieldName];
      const el = this.shadowRoot.querySelector(`#${field.id}`);
      const button = el.shadowRoot.querySelector('div').querySelector('button');
      const getSelected = [
        ...[...el.children].filter(
            (child) => child.localName === 'auro-menu',
        )[0].children,
      ].filter((child) => child.value === value)[0];
      getSelected.setAttribute('selected', true);
      button.innerHTML = getSelected.innerHTML;
    }
  }

  setCityStateByZipCode(e) {
    this.updateFormAllSelectValues();
    const toggleFields = ['City', 'State'];
    if (this.currentForm['Country'] && e.target.value.length > 0) {
      const countryCode = this.currentForm['Country'].value;
      const ZipCodeReqLength = countryCode === 'CA' ? 3 : 5;
      if (
        e.target.value.length === ZipCodeReqLength &&
        suportedCountryList.includes(this.currentForm['Country'].value)
      ) {
        this.toggleFields(toggleFields);
        getCityStateFromZip(this.currentForm['Country'].value, e.target.value)
            .then((value) => {
              value = JSON.parse(value);
              if (value.places.length > 0) {
                this.guestLocation = value.places[0];
                this.updateFormFieldValue(
                    'City',
                    this.guestLocation['place name'],
                );
                this.updateFormFieldValue(
                    'State',
                    this.guestLocation['state abbreviation'],
                );

                this.updateFormAllSelectValues();

                this.setStateForZipSelection(
                    'State',
                    this.currentForm['State'].value,
                );
                this.toggleFields(toggleFields);
              }
            })
            .catch((reason) => {
            // This is an optional integration, let it fail in peace but put the error in console
              this.toggleFields(toggleFields);
              console.log(reason);
            });
      }
    }
  }

  formatPhoneNumber = (str) => {
    console.log(str);
    // Filter only numbers from the input
    const cleaned = ('' + str).replace(/\D/g, '');

    // Check if the input is of correct length
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    return str;
  };

  static get styles() {
    return css`
      ${stylesCss}
    `;
  }

  render() {
    return html`
      <div class="container">
        <form class="signup-form" id="signUpForm" onsubmit=${this.handleSubmit}>
          <div class="container__basicInfo">
            <div class="signupInput">
              <auro-input
                id="FirstName"
                name="FirstName"
                label="First name"
                data-cy="testSignupFirstNameInput"
                type="text"
                required
                bordered
                @blur=${(e) => this.handleBlur(e)}
              ></auro-input>
            </div>
            <div class="signupInput">
              <auro-input
                id="MiddleName"
                label="Middle name"
                name="MiddleName"
                data-cy="testSignupMiddleNameInput"
                type="text"
                bordered
                @blur=${(e) => this.handleBlur(e)}
              ></auro-input>
            </div>
            <div class="signupInput">
              <auro-input
                id="LastName"
                label="Last name"
                name="LastName"
                data-cy="testSignupLastNameInput"
                type="text"
                required
                bordered
                @blur=${(e) => this.handleBlur(e)}
              ></auro-input>
            </div>

            <div class="signupInput signupSelect">
              <auro-select
                class="auro-select"
                id="Suffix"
                name="Suffix"
                placeholder="Suffix (optional)"
              >
                <span slot="label">Suffix</span>
                <auro-menu>
                  ${this.SuffixOptions.map(
      (Suffix) =>
        html`<auro-menuoption value=${Suffix.value}
                        >${Suffix.display}</auro-menuoption
                      >`,
  )}
                </auro-menu>
              </auro-select>
            </div>
            <div class="signupInput">
              <auro-input
                id="BirthDate"
                name="BirthDate"
                label="Birth date"
                type="month-day-year"
                aria-label="Birth date"
                data-cy="testSignupBrithDateInput"
                required
                bordered
                @blur=${(e) => this.handleBlur(e)}
              >
              </auro-input>
            </div>

            <div class="signupInput">
              <auro-radio-group id="Gender" name="Gender" tabindex="6">
                <span slot="legend">Gender</span>
                <auro-radio
                  id="radioFemale"
                  label="Female"
                  name="female"
                  value="female"
                ></auro-radio>
                <auro-radio
                  id="radioMale"
                  label="Male"
                  name="male"
                  value="male"
                ></auro-radio>
                <auro-radio
                  id="radioNonBinary"
                  label="Non-binary"
                  name="non-binary"
                  value="non-binary"
                ></auro-radio>
              </auro-radio-group>
            </div>
          </div>
          <div class="container__contact">
            <auro-header level="2" display="500">Phone and Email</auro-header>
            <div class="PhoneNumber__container">
              <div class="signupInput signupSelect">
                <auro-select
                  class="auro-select"
                  id="CountryCode"
                  name="CountryCode"
                >
                  <span slot="label">Country Code</span>
                  <auro-menu>
                    ${telephoneCountryCodes.map((code) =>
                      code.label == 'United States/Canada +1' &&
                      Number(code.code) === 1 ?
                        html`<auro-menuoption selected value=${code.code}
                            >${code.label}</auro-menuoption
                          >` :
                        html`<auro-menuoption value=${code.code}
                            >${code.label}</auro-menuoption
                          >`,
  )}
                  </auro-menu>
                </auro-select>
              </div>
              <div class="signupInput">
                <auro-input
                  name="PhoneNumber"
                  id="PhoneNumber"
                  label="Phone number"
                  data-cy="testPhoneNumberInput"
                  required
                  bordered
                  @input=${(e) => {
    e.target.value = this.formatPhoneNumber(e.target.value);
  }}
                  @blur=${(e) => this.handleBlur(e)}
                ></auro-input>
              </div>
            </div>
            <div class="signupInput">
              <auro-input
                bordered
                required
                name="Email"
                type="email"
                id="Email"
                label="Email address"
                @blur=${(e) => {
    // auro-input handles validation
    this.updateFormFieldValue(e.target.name, e.target.value);
  }}
              >
                <slot slot="label">Email address</slot>
              </auro-input>
            </div>
          </div>
          <div class="container__address">
            <auro-header level="2" display="500">Mailing address</auro-header>
            <div class="signupInput signupSelect">
              <auro-select class="auro-select" id="Country" name="Country">
                <span slot="label">Country</span>
                <auro-menu>
                  ${Countries.map((Country) =>
                    Country.value === 'US' ?
                      html`<auro-menuoption selected value=${Country.value}
                          >${Country.label}</auro-menuoption
                        >` :
                      html`<auro-menuoption value=${Country.value}
                          >${Country.label}</auro-menuoption
                        >`,
  )}
                </auro-menu>
              </auro-select>
            </div>
            <div class="signupInput">
              <auro-input
                id="AddressLine1"
                name="AddressLine1"
                label="Address Line 1"
                type="text"
                aria-label="Address Line 1"
                data-cy="testSignupAddressLine1Input"
                required
                bordered
                @blur=${(e) => this.handleBlur(e)}
              >
              </auro-input>
            </div>

            <auro-hyperlink
              id="addressTwo-link"
              role="button"
              @click=${(e) => this.handleAddAddressTwo(e)}
            >
              <auro-icon
                category="interface"
                name="plus-stroke"
                customColor
                style="color: #0074C8"
              >
              </auro-icon>
              Add address line 2
            </auro-hyperlink>

            <div class="signupInput">
              <auro-input
                id="AddressLine2"
                name="AddressLine2"
                label="Address Line 2"
                type="text"
                aria-label="Address Line 2"
                data-cy="testSignupAddressLine2Input"
                bordered
                style="display:none;"
                @blur=${(e) => this.handleBlur(e)}
              >
              </auro-input>
            </div>

            <div class="signupInput">
              <auro-input
                id="ZipCode"
                name="ZipCode"
                label="Zip/postal code"
                type="text"
                aria-label="Zip/postal code"
                data-cy="testSignupZipCodeInput"
                required
                bordered
                @blur=${(e) => {
    this.handleBlur(e);
    this.setCityStateByZipCode(e);
  }}
              >
              </auro-input>
            </div>
            <div class="signupInput">
              <auro-input
                id="City"
                label="City"
                type="text"
                aria-label="City"
                data-cy="testSignupCityInput"
                required
                bordered
              >
              </auro-input>
            </div>
            <div class="signupInput signupSelect">
              <auro-select
                class="auro-select"
                id="State"
                name="State"
                data-cy="testSignUpStateSelect"
              >
                <span slot="label">State/province</span>
                <auro-menu>
                  ${this.stateList.map(
      (State) =>
        html`<auro-menuoption value=${State.value}
                        >${State.label}</auro-menuoption
                      >`,
  )}
                </auro-menu>
              </auro-select>
            </div>
          </div>
          <div class="container__travelPreference">
            <auro-header level="2" display="500">Travel preference</auro-header>
            <div class="signupInput signupSelect">
              <auro-select
                class="auro-select"
                id="PrimaryDepartureCity"
                name="PrimaryDepartureCity"
                data-cy="testSignUpPrimaryDepartureCity"
              >
                <span slot="label">Primary departure city</span>
                <auro-menu>
                  ${this.airports.map(
      (airport) =>
        html`<auro-menuoption value=${airport.code}
                        >${airport.name}</auro-menuoption
                      >`,
  )}
                </auro-menu>
              </auro-select>
            </div>
          </div>
          <div class="buttonContainer">
            <auro-button
              type="submit"
              @click=${this.handleSubmit}
              id="button-submit"
              fluid
              data-cy="testSignUpButton"
              >${this.buttonText}</auro-button
            >
          </div>
        </form>
      </div>
    `;
  }
}
if (!customElements.get('signup-form')) {
  customElements.define('signup-form', SignupForm);
}
