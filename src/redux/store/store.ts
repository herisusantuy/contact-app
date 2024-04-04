import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contactReducer from "../slice/contact";

const rootReducer = combineReducers({
  contact: contactReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
