import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../services/types';
import { RootState } from '../store';
import { isErrorResponse } from '../utils/isErrorResponse.ts';

interface IMyCartState {
  data: Cart | null;
  currentVersion: number;
}

// Define the initial state using that type
const initialState: IMyCartState = {
  currentVersion: 0,
  data: null,
};

export const myCartSlice = createSlice({
  name: 'myCart',
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<Cart>) => {
      state.data = action.payload;
    },
    setCurrentVersion: (state, action: PayloadAction<number>) => {
      state.currentVersion = action.payload;
    },
  },
});

const selectMyCartData = ({ myCart: { data } }: RootState) => data;

const selectMyCartLineItemsProductId = ({ myCart: { data } }: RootState) => {
  if (!data || isErrorResponse(data)) {
    return [];
  }

  return data.lineItems.map((item) => item.productId);
};

export { selectMyCartData, selectMyCartLineItemsProductId };

export const { setCurrentVersion, updateCart } = myCartSlice.actions;

export default myCartSlice.reducer;
