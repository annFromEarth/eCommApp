export enum CountryEnum {
  UNDEFINED = 'UNDEFINED',
  UK = 'United Kingdom',
  FR = 'France',
}

export type Address = {
  streetName: string;
  city: string;
  postalCode: string;
  country: CountryEnum;
};

export interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;

  addresses: Address[];

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
}
