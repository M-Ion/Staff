import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithSession } from "./authBaseQuery";

const controller = "Blob";

const blobService = createApi({
  reducerPath: "blob/service",
  baseQuery: baseQueryWithSession(""),
  endpoints: (build) => ({
    uploadDishBlob: build.mutation<void, FormData>({
      query: (arg) => ({
        url: `/${controller}`,
        body: arg,
        method: "POST",
      }),
    }),
  }),
});

export default blobService;
