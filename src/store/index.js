import { configureStore } from '@reduxjs/toolkit';

import postSlice from './postSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const postActions = postSlice.actions;

export default store;
