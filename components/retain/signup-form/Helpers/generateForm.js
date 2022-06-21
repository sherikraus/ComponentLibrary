export class Form {
  FirstName;
  MiddleName;
  LastName;
  Suffix;
  BirthDate;
  Gender;
  CountryCode;
  PhoneNumber;
  Email;
  Country;
  AddressLine1;
  AddressLine2;
  ZipCode;
  City;
  State;
  PrimaryDepartureCity;
}

export class Field {
  name;
  id;
  element;
  value;
  isRequired;
  error;
}

const REQUIRED_SELECT_FIELDS = [
  'CountryCode',
  'Country',
  'State',
  'PrimaryDepartureCity',
];

export default function(root) {
  const elements = {};
  elements['FirstName'] = root.querySelector('#FirstName');
  elements['MiddleName'] = root.querySelector('#MiddleName');
  elements['LastName'] = root.querySelector('#LastName');
  elements['Suffix'] = root.querySelector('#Suffix');
  elements['BirthDate'] = root.querySelector('#BirthDate');
  elements['Gender'] = root.querySelector('#Gender');
  elements['CountryCode'] = root.querySelector('#CountryCode');
  elements['PhoneNumber'] = root.querySelector('#PhoneNumber');
  elements['Email'] = root.querySelector('#Email');
  elements['Country'] = root.querySelector('#Country');
  elements['AddressLine1'] = root.querySelector('#AddressLine1');
  elements['AddressLine2'] = root.querySelector('#AddressLine2');
  elements['ZipCode'] = root.querySelector('#ZipCode');
  elements['City'] = root.querySelector('#City');
  elements['State'] = root.querySelector('#State');
  elements['PrimaryDepartureCity'] = root.querySelector(
      '#PrimaryDepartureCity',
  );
  const form = {};
  Object.keys(elements).forEach((key) => {
    const error = elements[key].error ? elements[key].error : null;
    if (key === 'Gender') {
      const el = elements[key].items.filter((el) => el.checked);
      const value = el.length > 0 ? el[0].value : null;
      form[key] = {
        name: key,
        id: elements[key].id,
        element: elements[key],
        value: value,
        isRequired: elements[key].required,
        error: error,
      };
    } else if (REQUIRED_SELECT_FIELDS.includes(key)) {
      const value = elements[key].value ? elements[key].value : null;

      form[key] = {
        name: key,
        id: elements[key].id,
        element: elements[key],
        value: value,
        isRequired: true,
        error: error,
      };
    } else {
      const value = elements[key].value ? elements[key].value : null;
      form[key] = {
        name: key,
        id: elements[key].id,
        element: elements[key],
        value: value,
        isRequired: elements[key].required,
        error: error,
      };
    }
  });
  // console.log('Form Generated', form);
  return form;
}
