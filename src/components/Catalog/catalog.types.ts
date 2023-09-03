export interface IProducts {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results?: ResultsEntity[] | null;
}
export interface ResultsEntity {
  id: string;
  version: number;
  productType: IProductType;
  name: INameOrSlugOrDescription;
  categories?: null[] | null;
  slug: ISlug;
  masterVariant?: IMasterVariant;
  variants?: null[] | null;
  searchKeywords: ISearchKeywords;
  hasStagedChanges: boolean;
  published: boolean;
  createdAt: string;
  lastModifiedAt: string;
  description?: INameOrSlugOrDescription | null;
}
export interface IProductType {
  typeId: string;
  id: string;
}
export interface INameOrSlugOrDescription {
  'en-GB': string;
}
export interface ISlug {
  'en-GB': string;
  aa?: string | null;
  de?: string | null;
}
export interface IMasterVariant {
  id: number;
  prices?: IPrices[];
  images?: IImages[];
  attributes?: IAttributesEntity[] | null;
}
export interface IImages {
  url: string;
  dimensions: IImagesDimensions;
}
export interface IImagesDimensions {
  w: number;
  h: number;
}
export interface IAttributesEntity {
  name: string;
  value: IAttributesEntityValue | boolean;
}
export interface IAttributesEntityValue {
  it: string;
  de: string;
  en: string;
}
export interface ISearchKeywords {}
export interface IPrices {
  id: string;
  value: IPricesValue;
  key: string;
  country: string;
  customerGroup: IDiscountOrCustomerGroup;
  discounted: IDiscounted;
}
export interface IPricesValue {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}
export interface IDiscountOrCustomerGroup {
  typeId: string;
  id: string;
}
export interface IDiscounted {
  value: IPricesValue;
  discount: IDiscountOrCustomerGroup;
}
