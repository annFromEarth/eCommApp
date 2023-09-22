import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ResultsEntity } from '../components/Catalog/catalog.types';

interface ProductsState {
  data: ResultsEntity[] | null;
  currentProduct: string;
  priceFromFilter: string;
  priceToFilter: string;
  sizeFilter: string;
  sorting: string;
  offset: number;
  total: number;
}
// Define the initial state using that type
const initialState: ProductsState = {
  data: [],
  currentProduct: '',
  priceFromFilter: '',
  priceToFilter: '',
  sizeFilter: '',
  sorting: '',
  offset: 0,
  total: 0,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<ResultsEntity[]>) => {
      state.data = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<string>) => {
      state.currentProduct = action.payload;
    },
    setPriceFromFilter: (state, action: PayloadAction<string>) => {
      state.priceFromFilter = action.payload;
    },
    removePriceFromFilter: (state) => {
      state.priceFromFilter = '';
    },
    setPriceToFilter: (state, action: PayloadAction<string>) => {
      state.priceToFilter = action.payload;
    },
    removePriceToFilter: (state) => {
      state.priceToFilter = '';
    },
    setSizeFilter: (state, action: PayloadAction<string>) => {
      state.sizeFilter = action.payload;
    },
    removeSizeFilter: (state) => {
      state.sizeFilter = '';
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
    removeSorting: (state) => {
      state.sorting = '';
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    removeOffset: (state) => {
      state.offset = 0;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    removeTotal: (state) => {
      state.total = 0;
    },
  },
});

export const {
  addProducts,
  setCurrentProduct,
  setPriceFromFilter,
  removePriceFromFilter,
  setPriceToFilter,
  removePriceToFilter,
  setSizeFilter,
  removeSizeFilter,
  setSorting,
  removeSorting,
  setOffset,
  removeOffset,
  setTotal,
  removeTotal,
} = productsSlice.actions;

export default productsSlice.reducer;
