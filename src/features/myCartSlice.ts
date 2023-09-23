import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart } from '../services/types';

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

export const { setCurrentVersion, updateCart } = myCartSlice.actions;

export default myCartSlice.reducer;
