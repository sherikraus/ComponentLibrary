import {differenceInYears, parse} from 'date-fns';
import {errorMsgs} from '../Utils/ErrorMsgs';

export default class ValidationManager {
  guestLocation = null;
  constructor() {}

  getGuestLocation(location) {
    this.guestLocation = location;
  }

  isFormValid(form) {
    this.displayAndCheckForErrors(form);
    const erroredRecs = this.getErroredFields(form);
    if (erroredRecs.length > 0) {
      return false;
    }
    return true;
  }

  displayAndCheckForErrors(form) {
    Object.keys(form).forEach((key) => {
      this.validateFormField(form, key);
    });
  }

  getErroredFields(form) {
    const errorRecs = [];
    Object.keys(form).forEach((key) => {
      const field = form[key];
      if (field) {
        if (
          (field.isRequired && !field.value) ||
          (field.isRequired && field.error)
        ) {
          errorRecs.push(field);
        }
      }
    });

    return errorRecs;
  }

  displayErrorMsg(el, errorMsg) {
    el.element.error = errorMsg;
    el.error = errorMsg;
  }

  displaySelectErrorMsg(el, errorMsg) {
    const slotEl = el.element.shadowRoot.querySelector('slot[name="helpText"]');
    if (errorMsg && slotEl.innerHTML === '') {
      const error = document.createTextNode(errorMsg);
      slotEl.appendChild(error);
    } else if (!errorMsg) {
      slotEl.innerHTML = '';
    }

    el.element.error = errorMsg;
    el.error = errorMsg;
  }

  validateFormField(form, fieldName) {
    switch (fieldName) {
      case 'FirstName':
        return this.isEmptyValue(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], errorMsgs[fieldName].empty) :
          this.isNameValid(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], null) :
          this.displayErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].invalid.len,
          );
      case 'MiddleName':
        return this.isEmptyValue(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], null) :
          this.isNameValid(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], null) :
          this.displayErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].invalid.len,
          );
      case 'LastName':
        return this.isEmptyValue(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], errorMsgs[fieldName].empty) :
          this.isNameValid(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], null) :
          this.displayErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].invalid.len,
          );
      case 'BirthDate':
        return this.isBirthDateValid(form[fieldName].value) ?
          this.isBirthDateAValidAge(form[fieldName].value) ?
            this.displayErrorMsg(form[fieldName], null) :
            this.displayErrorMsg(
                form[fieldName],
                errorMsgs[fieldName].invalid.age,
            ) :
          this.displayErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].invalid.value,
          );
      case 'Gender':
        // NOT REQUIRED]
        return this.displayErrorMsg(form[fieldName], null);
      case 'CountryCode':
        return this.isEmptyValue(form[fieldName].value) ?
          this.displaySelectErrorMsg(
              form[fieldName],
              'Please select a Country code',
          ) :
          this.displayErrorMsg(form[fieldName], null);
      case 'PhoneNumber':
        return this.isValidPhoneNumber(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], null) :
          this.displayErrorMsg(form[fieldName], errorMsgs[fieldName].empty);
      case 'Email':
        // auro-input handles validation
        return !form[fieldName].element.isValid ?
          (form[fieldName].error = 'NOT VALID') :
          (form[fieldName].error = null);

      case 'Country':
        return this.isEmptyValue(form[fieldName].value) ?
          this.displaySelectErrorMsg(
              form[fieldName],
              'Please select a Country',
          ) :
          this.displayErrorMsg(form[fieldName], null);

      case 'AddressLine1':
        return this.isEmptyValue(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], errorMsgs[fieldName].empty) :
          this.isValidAddressOne(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], null) :
          this.displayErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].invalid.value,
          );
      case 'AddressLine2':
        return this.isEmptyValue(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], errorMsgs[fieldName].empty) :
          this.isValidAddressOne(form[fieldName].value) ?
          this.displayErrorMsg(form[fieldName], null) :
          this.displayErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].invalid.value,
          );
      case 'ZipCode':
        return this.isZipCodeValid(form[fieldName].value, form['Country'].value) ?
          this.displayErrorMsg(form[fieldName], null) :
          this.displayErrorMsg(form[fieldName], errorMsgs[fieldName].empty);
      case 'City':
        return this.isEmptyValue(form[fieldName].value) ?
          /* eslint-disable */
          this.displayErrorMsg(form[fieldName], errorMsgs[fieldName].empty) : // IF NOT EMPTY CHECK IF IT MATCHES CITY AND STATE
          /* eslint-disable */
          this.isLocationValid(
              form['ZipCode'].value,
              form[fieldName].value,
              form['State'].value,
          ) ?
          this.displayErrorMsg(form[fieldName], null) :
          this.displayErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].invalid.mismatch,
          );

      case 'State':
        return this.isEmptyValue(form[fieldName].value) ?
          this.displaySelectErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].empty,
          ) : // IF NOT EMPTY CHECK IF IT MATCHES CITY AND STATE
          this.isLocationValid(
              form['ZipCode'].value,
              form['City'].value,
              form[fieldName].value,
          ) ?
          this.displaySelectErrorMsg(form[fieldName], null) :
          this.displaySelectErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].invalid.mismatch,
          );

      case 'PrimaryDepartureCity':
        return this.isEmptyValue(form[fieldName].value) ?
          this.displaySelectErrorMsg(
              form[fieldName],
              errorMsgs[fieldName].empty,
          ) :
          this.displaySelectErrorMsg(form[fieldName], null);

      default:
        return '';
    }
  }

  removePhoneNumberFormatting = (str) => {
    // Filter only numbers from the input
    const cleaned = ('' + str).replace(/\D/g, '');
    return cleaned;
  };

  isValidPhoneNumber(phone) {
    if (!phone) return false;
    // International phone numbers can be anywhere between 5 and 13 digits long
    phone = this.removePhoneNumberFormatting(phone);
    if (phone.length < 5 || phone.length > 13) return false;

    const regex = /^[0-9]+$/i;
    return regex.test(phone);
  }

  isNameValid(FirstName) {
    if (!FirstName) return false;
    // First Name must be less than 26 characters
    if (FirstName.length <= 26) {
      return true;
    }

    return false;
  }

  isBirthDateValid(BirthDate) {
    if (!BirthDate) return false;
    const BirthDateParts = BirthDate.split('/');
    let isValid = true;

    if (BirthDateParts.length === 3) {
      BirthDateParts.forEach((el, i) => {
        if (i === 2 && el.length !== 4) {
          isValid = false;
        } else if (i !== 2 && el.length !== 2) {
          isValid = false;
        }
      });
    } else {
      isValid = false;
    }

    return isValid;
  }

  isBirthDateAValidAge(BirthDate) {
    if (BirthDate && this.calculateAge(BirthDate) < 16) {
      return false;
    }

    return true;
  }

  calculateAge = (dob) => {
    const date = parse(dob, 'dd/MM/yyyy', new Date());
    const age = differenceInYears(new Date(), date);
    return age;
  };

  isValidAddressOne(AddressLine1) {
    if (!AddressLine1) return false;
    const regex = /^[A-Za-z0-9 .'#/\//-]{2,29}$/i;
    return regex.test(AddressLine1) && AddressLine1.length > 0;
  }

  isLocationValid(zip, city, state) {
    if (this.guestLocation && zip && city && state) {
      if (
        this.guestLocation['state abbreviation'] !== state ||
        this.guestLocation['place name'] !== city
      ) {
        return false;
      }
    }
    return true;
  }
  isZipCodeValid(ZipCode, Country) {
    if (!ZipCode) return false;
    let regex;
    switch (Country) {
      case 'US':
        regex = /^d{5}-d{4}$|^d{5}$/;
      case 'CA':
        regex = /^[A-Z]d[A-Z] d[A-Z]d$/;
      case 'MX':
        regex = /^[0-9]{5}$/;
      default:
        regex = /^([a-zA-Z0-9 .-]){1,10}$/;
    }

    return regex.test(ZipCode) && ZipCode.length > 0;
  }

  isEmptyValue(value) {
    if (value && value.length > 0) {
      return false;
    }
    return true;
  }
}
