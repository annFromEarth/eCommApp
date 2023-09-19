import { CountryEnum } from '../components/registrationForm/types';
import { Address } from '../pages/Profile/types';

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
  dateOfBirth?: string;
  address?: AddressInput;
  addressId?: string;
};

export type CartAction = {
  action: 'changeLineItemQuantity' | 'removeLineItem' | 'addDiscountCode' | 'addLineItem';
  lineItemId?: string;
  productId?: string;
  variantId?: number;
  quantity?: number;
  code?: string;
};

export type Cart = {
  type: string;
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: false;
  };
  createdBy: {
    isPlatformClient: false;
  };
  lineItems: LineItem[]; //!!type
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  shipping: [];
  customLineItems: [];
  discountCodes: DiscountCode[];
  directDiscounts: [];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  refusedGifts: [];
  origin: string;
  itemShippingAddresses: Address[];
  statusCode?: string | number; //TODO: fix catching server error
  message?: string; //TODO: fix catching server error
};

export type CartPagedQueryResponse = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Cart[];
  statusCode?: string | number; //TODO: fix catching server error
  message?: string; //TODO: fix catching server error
};

type DiscountCode = {
  discountCode: { typeId: string; id: string };
  state: string;
};

export type LineItem = {
  // TODO: correct types
  id: string;
  productId: string;
  name: {
    de?: string;
    'en-GB': string;
  };
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  productSlug: {
    en: string;
  };
  variant: {
    id: number;
    sku: string;
    prices: [
      {
        value: {
          type: string;
          fractionDigits: number;
          currencyCode: 'EUR';
          centAmount: number;
        };
        id: string;
      },
    ];
    images: [
      {
        url: string;
        dimensions: {
          w: number;
          h: number;
        };
      },
    ];
    attributes: [];
    assets: [];
  };
  price: {
    discounted: {
      discount: { id: string; typeId: string };
      value: { type: string; fractionDigits: number; currencyCode: 'EUR'; centAmount: number };
    };
    value: {
      type: string;
      fractionDigits: number;
      currencyCode: 'EUR';
      centAmount: number;
    };
    id: string;
  };
  quantity: number;
  discountedPrice?: DiscountedPrice;
  discountedPricePerQuantity: [];
  state: [
    {
      quantity: number;
      state: {
        typeId: string;
        id: string;
      };
    },
  ];
  priceMode: 'Platform';
  lineItemMode: 'Standard';
  totalPrice: {
    type: 'centPrecision';
    fractionDigits: number;
    currencyCode: 'EUR';
    centAmount: number;
  };
  custom: {
    type: {
      typeId: 'type';
      id: '3ae9bcca-df23-443e-bd22-0c592f9694fa';
    };
    fields: {
      offer_name: 'SuperMax';
    };
  };
  perMethodTaxRate: [];
  taxedPricePortions: [];
};

type DiscountedPrice = {
  value: { type: string; fractionDigits: number; currencyCode: string; centAmount: number };
  includedDiscounts: [];
};
