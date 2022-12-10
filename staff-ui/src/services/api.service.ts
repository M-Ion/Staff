import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./authBaseQuery";

const apiService = createApi({
  reducerPath: "api/service",
  baseQuery: baseQuery(),
  tagTypes: ["Note", "Orders"],
  endpoints: (build) => ({}),
});

export default apiService;
