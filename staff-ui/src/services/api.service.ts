import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiService = createApi({
  reducerPath: "api/service",
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({}),
});

export default apiService;
