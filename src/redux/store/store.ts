import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../slice/contact";

const store = configureStore({
  reducer: {
    card: contactReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
