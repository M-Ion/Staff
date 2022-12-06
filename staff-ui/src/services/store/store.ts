import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import apiService from "../api.service";
import blobService from "../blob.service";

const root = combineReducers({
  user: userReducer,
  [apiService.reducerPath]: apiService.reducer,
  [blobService.reducerPath]: blobService.reducer,
});

export const store = configureStore({
  reducer: root,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiService.middleware,
      blobService.middleware,
    ]),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof root>;
