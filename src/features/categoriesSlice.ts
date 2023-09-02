import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CategoriesState {
  currentCategory: string;
}
// Define the initial state using that type
const initialState: CategoriesState = {
  currentCategory: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCurrentCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
