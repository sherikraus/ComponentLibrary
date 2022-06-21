export const errorMsgs = {
  FirstName: {
    empty: 'Enter your first name.',
    invalid: {len: 'Your first name can be up to 26 characters.'},
  },
  MiddleName: {
    empty: null,
    invalid: {len: 'Your middle name can be up to 26 characters.'},
  },
  LastName: {
    empty: 'Enter your last name.',
    invalid: {len: 'Your last name can be up to 26 characters.'},
  },
  BirthDate: {
    empty: 'Enter a valid birth date.',
    invalid: {
      value: 'Enter a valid birth date.',
      /* eslint-disable */
      age: 'Mileage Plan members must be 16 years or older to enroll. Please contact Customer Care at mileage.plan@alaskaair.com or call 1-800-654-5669 between 8am and 5pm PT, Monday - Saturday.',
      /* eslint-disable */
    },
  },
  Gender: {
    empty: 'Specify the gender that appears on your goverment issued ID.',
  },
  AddressLine1: {
    empty: 'Enter your mailing address.',
    invalid: {value: 'Enter a valid mailing address.'},
  },
  AddressLine2: {
    empty: null,
    invalid: {value: 'Enter a valid mailing address.'},
  },
  City: {
    empty: 'Enter your city.',
    invalid: {
      value: 'Enter a valid city.',
      mismatch:
        'The city entered does not match either the zip/postal code or state entered.',
    },
  },
  State: {
    empty: 'Select your state.',
    invalid: {
      value: 'Enter a valid state.',
      mismatch:
        'The state entered does not match either the zip/postal code or city entered.',
    },
  },
  Country: {empty: null},
  CountryCode: {empty: null},
  Email: {
    empty: 'Enter your email address. Ex: johndoe@email.com',
    invalid: {
      accountExists:
        'This email address belongs to an existing Mileage Plan account. ',
    },
  },
  PhoneNumber: {empty: 'Enter your phone number with area code.'},
  PrimaryDepartureCity: {empty: 'Select the city you typically depart from.'},
  Suffix: {empty: null},
  ZipCode: {empty: 'Enter your zip/postal code. Ex: 12345 or 12345-6789.', invalid: {
    mismatch: 'The zip/postal code entered does not match either the city or state/province entered.',
  }},
};
