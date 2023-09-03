import { CountryEnum } from '../components/registrationForm/types';

type AddressInput = {
  country: CountryEnum;
  postalCode: string;
  city: string;
  streetName: string;
};

export type Action = {
  action: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: AddressInput;
  addressId?: string;
};
