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
  productType: ProductType;
  name: NameOrSlugOrDescription;
  categories?: null[] | null;
  slug: Slug;
  masterVariant: MasterVariant;
  variants?: null[] | null;
  searchKeywords: SearchKeywords;
  hasStagedChanges: boolean;
  published: boolean;
  createdAt: string;
  lastModifiedAt: string;
  description?: NameOrSlugOrDescription1 | null;
}
export interface ProductType {
  typeId: string;
  id: string;
}
export interface NameOrSlugOrDescription {
  'en-GB': string;
}
export interface Slug {
  en: string;
  aa?: string | null;
  de?: string | null;
}
export interface MasterVariant {
  id: number;
  prices?: null[] | null;
  images?: null[] | null;
  attributes?: AttributesEntity[] | null;
}
export interface AttributesEntity {
  name: string;
  value: Value | boolean;
}
export interface Value {
  it: string;
  de: string;
  en: string;
}
export interface SearchKeywords {}
export interface NameOrSlugOrDescription1 {
  en: string;
}
