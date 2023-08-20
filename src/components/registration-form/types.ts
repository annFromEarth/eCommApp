export enum CountryEnum {
  uk = 'United Kingdom',
  fr = 'France',
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
  dateOfBirth: string | null;
  addresses: Address[];
  street: string;
  city: string;
  postalCode: string;
  country: CountryEnum;
  defaultAddress: '0' | '1';
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}
