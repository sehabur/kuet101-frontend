import { createSlice } from '@reduxjs/toolkit';

const learningSlice = createSlice({
  name: 'learning',
  initialState: null,
  reducers: {
    fileStructure: (state, { payload }) => {
      return payload;
    },
  },
});

export default learningSlice;
