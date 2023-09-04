import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CategoriesState {
  currentCategory: string;
  currentCategoryId: string;
}
// Define the initial state using that type
const initialState: CategoriesState = {
  currentCategory: 'All Plants',
  currentCategoryId: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
    setCurrentCategoryId: (state, action: PayloadAction<string>) => {
      state.currentCategoryId = action.payload;
    },
  },
});

export const { setCurrentCategory, setCurrentCategoryId } = categoriesSlice.actions;

export default categoriesSlice.reducer;
