import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RootState } from "./store/store";

export const baseQuery = (
  contentType: string = "application/json; charset=utf-8"
) =>
  fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL as string,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", contentType);
      const { token } = (getState() as RootState).user;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },

    credentials: "include",
  });
