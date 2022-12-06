import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "./authBaseQuery";

const controller = "Blob";

const blobService = createApi({
  reducerPath: "blob/service",
  baseQuery: baseQuery(""),
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
