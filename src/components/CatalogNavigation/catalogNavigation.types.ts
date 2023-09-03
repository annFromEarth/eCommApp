export interface ICategoryNavigation {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results?: IResultsEntity[] | null;
}
export interface IResultsEntity {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: ILastModifiedByOrCreatedBy;
  createdBy: ILastModifiedByOrCreatedBy;
  name: INameOrSlug;
  slug: INameOrSlug;
  ancestors?: null[] | null;
  orderHint: string;
  assets?: null[] | null;
}
export interface ILastModifiedByOrCreatedBy {
  isPlatformClient: boolean;
  user: IUser;
}
export interface IUser {
  typeId: string;
  id: string;
}
export interface INameOrSlug {
  'en-GB': string;
}
