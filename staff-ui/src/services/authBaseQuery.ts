import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import { HandledError } from "../types/error.types";
import { RootState } from "./store/store";
import { setInitial as logout, setToken } from "./store/slices/user.slice";
import { TokenResp } from "../types/auth.types";
import { setError, setWarning } from "./store/slices/feedback.slice";

export const baseQuery = (
  contentType: string = "application/json; charset=utf-8"
) =>
  fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL as string,
    prepareHeaders: (headers, { getState }) => {
      if (contentType) headers.set("Content-Type", contentType);

      const { token } = (getState() as RootState).user;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },

    credentials: "include",
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError | HandledError,
    {},
    FetchBaseQueryMeta
  >;

export const baseQueryWithSession =
  (contentType: string = "application/json; charset=utf-8") =>
  async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const query = baseQuery(contentType);
    const response = await query(args, api, extraOptions);

    if (response.error) {
      handleError(response.error, api);
      console.log(response);
      return response;
    }

    const tokenResponse = await baseQuery("application/json; charset=utf-8")(
      "/Auth/Token",
      api,
      extraOptions
    );

    // Fetch auth token
    if (tokenResponse.data) {
      const data = tokenResponse.data as TokenResp;
      api.dispatch(setToken(data.token));
    }

    return response;
  };

const handleError = (
  errorResp: FetchBaseQueryError | HandledError,
  api: BaseQueryApi
) => {
  const handledError = (errorResp as HandledError).data;

  if (handledError) {
    if (handledError.StatusCode === 401) {
      api.dispatch(setWarning("You need to authenticate."));
      api.dispatch(logout());
    }

    api.dispatch(setError(handledError.Message));
  }
};
