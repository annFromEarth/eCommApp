export interface IProduct {
  id: string;
  version: number;
  productType: IProductType;
  taxCategory: IProductType;
  name: IProductName;
  description: IProductDescription;
  categories: [];
  masterVariant: IMasterVariant;
  metaDescription: {
    en: string;
  };
  metaTitle: {
    en: string;
  };
  priceMode: string;
  published: boolean;
  searchKeywords: object;
  slug: {
    en: string;
  };
  variants: [];
}

interface IProductType {
  typeId: string;
  id: string;
}

interface IProductName {
  'en-GB': string;
}

interface IProductDescription {
  'en-GB': string;
}

interface IMasterVariant {
  id: number;
  prices: Array<IPricesProduct>;
  images: [
    {
      dimensions: { w: number; h: number };
      url: string;
    },
  ];
  attributes: [
    {
      name: string;
      value: {
        it: string;
        de: string;
        en: string;
      };
    },
  ];
}

export interface IPricesProduct {
  country: string;
  customerGroup: {
    typeId: string;
    id: string;
  };
  discounted: {
    value: {
      centAmount: number;
      currencyCode: string;
      fractionDigits: number;
      type: string;
    };
    discount: {
      id: string;
      typeId: string;
    };
  };
  id: string;
  key: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

export interface IImagesProduct {
  dimensions: { w: number; h: number };
  url: string;
}
