import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiService from "../api.service";

const root = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
});

export const store = configureStore({
  reducer: root,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiService.middleware]),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof root>;
