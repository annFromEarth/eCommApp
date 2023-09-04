import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ResultsEntity } from '../components/Catalog/catalog.types';

interface ProductsState {
  data: ResultsEntity[] | null;
  currentProduct: string;
}
// Define the initial state using that type
const initialState: ProductsState = {
  data: [],
  currentProduct: '',
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
  },
});

export const { addProducts, setCurrentProduct } = productsSlice.actions;

export default productsSlice.reducer;
