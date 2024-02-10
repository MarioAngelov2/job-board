import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filters/filterSlice";
import jobsReducer from "./jobs/jobSlice";
import imageReducer from "./jobs/imageSlice";

export const store = configureStore({
  reducer: { filterReducer, jobsReducer, imageReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
