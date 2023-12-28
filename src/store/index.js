import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import searchSlice from './searchSlice';
import learningSlice from './learningSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    learning: learningSlice.reducer,
  },
});

export const authActions = authSlice.actions;

export const searchActions = searchSlice.actions;

export const learningActions = learningSlice.actions;

export default store;
