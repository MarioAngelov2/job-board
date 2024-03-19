import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filters/filterSlice";
import jobsReducer from "./jobs/jobSlice";
import imageReducer from "./jobs/imageSlice";
import fileReducer from "./jobs/fileSlice";
import applicationReducer from "./jobs/applicationSlice";

export const store = configureStore({
  reducer: {
    filterReducer,
    jobsReducer,
    imageReducer,
    fileReducer,
    applicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
