import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ResultsEntity } from '../components/Catalog/catalog.types';

interface ProductsState {
  data: ResultsEntity[] | null;
}
// Define the initial state using that type
const initialState: ProductsState = {
  data: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<ResultsEntity[]>) => {
      state.data = action.payload;
    },
  },
});

export const { addProducts } = productsSlice.actions;

export default productsSlice.reducer;
