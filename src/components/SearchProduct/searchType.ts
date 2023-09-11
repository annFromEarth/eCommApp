import { IProduct } from '../../pages/Product/productType';

export interface IItemList {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Array<IProduct>;
}
