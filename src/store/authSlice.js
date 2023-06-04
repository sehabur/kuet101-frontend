import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    login: (state, { payload }) => {
      return payload;
    },
    logout: () => {
      return null;
    },
  },
});

export default authSlice;
