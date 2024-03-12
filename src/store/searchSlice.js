import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: null,
    tution: null,
    tolet: null,
    blood: null,
  },
  reducers: {
    setSearchFilter: (state, { payload }) => {
      return {
        ...state,
        search: payload,
      };
    },
    setTutionFilter: (state, { payload }) => {
      return {
        ...state,
        tution: payload,
      };
    },
    setToletFilter: (state, { payload }) => {
      return {
        ...state,
        tolet: payload,
      };
    },
    setBloodFilter: (state, { payload }) => {
      return {
        ...state,
        blood: payload,
      };
    },
    reset: () => {
      return null;
    },
  },
});

export default searchSlice;
