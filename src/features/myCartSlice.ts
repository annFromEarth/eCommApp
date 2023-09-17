import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IMyCartState {
  currentVersion: number;
  promoMessage: string;
  priceBeforePromo: string;
}
// Define the initial state using that type
const initialState: IMyCartState = {
  currentVersion: 0,
  promoMessage: '',
  priceBeforePromo: '',
};

export const myCartSlice = createSlice({
  name: 'myCart',
  initialState,
  reducers: {
    setCurrentVersion: (state, action: PayloadAction<number>) => {
      state.currentVersion = action.payload;
    },
  },
});

export const { setCurrentVersion } = myCartSlice.actions;

export default myCartSlice.reducer;
