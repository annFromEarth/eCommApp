export type Address = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  id: string;
};
export type Customer = {
  addresses: Address[];
  authenticationMode?: string;
  createdAt?: string;
  createdBy?: object;
  dateOfBirth: string;
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
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
  version: number;
  versionModifiedAt?: string;
  statusCode?: string | number; //TODO: fix catching server error
  message?: string; //TODO: fix catching server error
};
