import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  seniority: "",
  salary: "",
  datePosted: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { filterName, value } = action.payload;
      return { ...state, [filterName]: value };
    },
    resetFilters: (state) => initialState,
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;

// const locationSlice = createSlice({
//   name: "location",
//   initialState,
//   reducers: {
//     setLocation: (state, action) => {
//       return { ...state, location: action.payload };
//     },
//   },
// });
