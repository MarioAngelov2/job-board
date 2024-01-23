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
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
