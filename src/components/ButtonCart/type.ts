export interface IActiveCart {
  type: string;
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
  };
  createdBy: {
    isPlatformClient: boolean;
  };
  lineItems: Array<ILineItem> | [];
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
  discountCodes: [];
  directDiscounts: [];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  refusedGifts: [];
  origin: string;
  itemShippingAddresses: [];
}

export interface ILineItem {
  id: string;
  productId: string;
  name: {
    [key: string]: string;
  };
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  productSlug: {
    [key: string]: string;
  };
  variant: {
    id: number;
    sku: string;
    prices: [
      {
        value: {
          type: string;
          fractionDigits: number;
          currencyCode: string;
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
    value: {
      type: string;
      fractionDigits: number;
      currencyCode: string;
      centAmount: number;
    };
    id: string;
  };
  quantity: number;
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
  priceMode: string;
  lineItemMode: string;
  totalPrice: {
    type: string;
    fractionDigits: number;
    currencyCode: string;
    centAmount: number;
  };
  custom: {
    type: {
      typeId: string;
      id: string;
    };
    fields: {
      offer_name: string;
    };
  };
  perMethodTaxRate: [];
  taxedPricePortions: [];
}

export type VersionLineListProductCartType = {
  version: number;
  idLine: string;
};
