import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithSession } from "./authBaseQuery";

const apiService = createApi({
  reducerPath: "api/service",
  baseQuery: baseQueryWithSession(),
  tagTypes: ["Note", "Orders", "Company"],
  endpoints: (build) => ({}),
});

export default apiService;
