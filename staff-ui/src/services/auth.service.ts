import {
  AuthResp,
  Login,
  SignUpManager,
  SignUpStaff,
  TokenResp,
} from "../types/auth.types";
import apiService from "./api.service";

const controller: string = "Auth";

const authService = apiService
  .enhanceEndpoints({ addTagTypes: ["CurrentUser"] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchToken: build.mutation<TokenResp, void>({
        query: () => ({
          url: `/${controller}/Token`,
          method: "GET",
        }),
      }),

      fetchSession: build.mutation<AuthResp, void>({
        query: () => ({
          url: `/${controller}`,
          method: "GET",
        }),
      }),

      login: build.mutation<AuthResp, Login>({
        query: (arg) => ({
          url: `${controller}/Login`,
          body: arg,
          method: "POST",
        }),
      }),

      signUpManager: build.mutation<void, SignUpManager>({
        query: (arg) => ({
          url: `${controller}/Register/Manager`,
          body: arg,
          method: "POST",
        }),
      }),

      signUpStaff: build.mutation<void, SignUpStaff>({
        query: (arg) => ({
          url: `${controller}/Register/Staff`,
          body: arg,
          method: "POST",
        }),
      }),

      logout: build.mutation<void, void>({
        query: (arg) => ({
          url: `${controller}/Logout`,
          body: arg,
          method: "POST",
        }),
      }),
    }),
  });

export default authService;
