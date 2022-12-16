import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithSession } from "./authBaseQuery";

const apiService = createApi({
  reducerPath: "api/service",
  baseQuery: baseQueryWithSession(),
  tagTypes: ["Categories", "Company", "Dishes", "Note", "Orders", "Workers"],
  endpoints: (build) => ({}),
});

export default apiService;
