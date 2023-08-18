import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import learningSlice from './learningSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    learning: learningSlice.reducer,
  },
});

export const authActions = authSlice.actions;

export const learningActions = learningSlice.actions;

export default store;
