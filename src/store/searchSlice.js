import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: null,
  reducers: {
    setFilter: (state, { payload }) => {
      return payload;
    },
    reset: () => {
      return null;
    },
  },
});

export default searchSlice;
