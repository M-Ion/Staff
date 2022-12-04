import { AuthResp, Login, SignUpManager, TokenResp } from "../types/auth.types";
import { User } from "../types/user.types";
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
    }),
  });

export default authService;
