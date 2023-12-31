import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../features/productsSlice';
import categoriesSlice from '../features/categoriesSlice';
import myCartSlice from '../features/myCartSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: categoriesSlice,
    myCart: myCartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
