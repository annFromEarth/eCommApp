export enum CountryEnum {
  UNDEFINED = 'UNDEFINED',
  UK = 'United Kingdom',
  FR = 'France',
}

export type submitAddress = {
  streetName: string;
  city: string;
  postalCode: string;
  country: CountryEnum;
  id?: string;
};

export type submitCustomer = {
  addresses: submitAddress[];
  authenticationMode?: string;
  createdAt?: string;
  createdBy?: object;
  dateOfBirth: string;
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  email: string;
  firstName: string;
  id?: string;
  isEmailVerified?: boolean;
  lastMessageSequenceNumber?: number;
  lastModifiedAt?: string;
  lastModifiedBy?: object;
  lastName: string;
  password: string;
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  stores?: [];
  version?: 1;
  versionModifiedAt?: string;
};

export interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;

  addresses: submitAddress[];

  countryPrimary: CountryEnum;
  postalCodePrimary: string;
  cityPrimary: string;
  streetPrimary: string;

  countrySecondary: CountryEnum;
  postalCodeSecondary: string;
  citySecondary: string;
  streetSecondary: string;

  defaultShippingAddress?: number;
  defaultBillingAddress?: number;

  authenticationMode?: string;
  createdAt?: string;
  createdBy?: object;
  id?: string;
  isEmailVerified?: boolean;
  lastMessageSequenceNumber?: number;
  lastModifiedAt?: string;
  lastModifiedBy?: object;
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  stores?: [];
  version?: 1;
  versionModifiedAt?: string;
}
