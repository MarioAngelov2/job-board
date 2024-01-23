import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./filters/filterSlice";

export const store = configureStore({
  reducer: { locationReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
