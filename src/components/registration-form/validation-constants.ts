import {
  emailRegExpRFC,
  nameRegExp,
  passwordRegExp,
  postcodeRegEx,
  streetRegEx,
  cityRegEx,
} from '../../utils/regexToValidate';

export const PATTERNS = {
  EMPTY: {
    message: 'This field is required',
  },
  FIRST_NAME: {
    value: nameRegExp,
    message: 'At least one letter, no numbers, no special characters',
  },
  LAST_NAME: {
    value: nameRegExp,
    message: 'Minimum one letter, no numbers, no special characters',
  },
  EMAIL: { value: emailRegExpRFC, message: 'not a valid email' },
  PASSWORD: {
    value: passwordRegExp,
    message:
      'Password too weak. Please use minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
  },
  POSTCODE: {
    value: postcodeRegEx,
    message:
      'Five to seven alphanumeric (uppercase) characters separated by a space. Example: "AA1 1AA" or "AA11 1AA"',
  },
  STREET: { value: streetRegEx, message: 'Not a valid street address' },
  CITY: {
    value: cityRegEx,
    message: 'Not a valid city name',
  },
};
