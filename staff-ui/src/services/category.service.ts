import {
  Category,
  CreateCategory,
  UpdateCategory,
} from "../types/category.types";
import { ReqFilter } from "../types/request.types";
import { FilteredResp } from "../types/response.types";
import { GeneralStats, SpecificStats } from "../types/statisitcs.types";
import apiService from "./api.service";

const controller: string = "Category";

const categoryService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchCategories: build.query<Category[], void>({
      query: () => ({
        url: `/${controller}`,
      }),

      providesTags: ["Categories"],
    }),

    fetchFilteredCategories: build.mutation<
      FilteredResp<Category>,
      ReqFilter[]
    >({
      query: (arg) => ({
        url: `/${controller}/Filtered`,
        body: arg,
        method: "POST",
      }),
    }),

    fetchGeneralStats: build.query<GeneralStats<Category>[], void>({
      query: (arg) => ({
        url: `/${controller}/Statistics`,
        method: "GET",
      }),
    }),

    fetchSpecificStats: build.mutation<
      SpecificStats[],
      { id: string; by: "Year" | "Month" }
    >({
      query: (arg) => ({
        url: `/${controller}/Statistics/${arg.id}`,
        method: "GET",
        params: { by: arg.by },
      }),
    }),

    postCategory: build.mutation<void, CreateCategory>({
      query: (arg) => ({
        url: `/${controller}`,
        method: "POST",
        body: arg,
      }),

      invalidatesTags: ["Categories"],
    }),

    updateCategory: build.mutation<void, UpdateCategory>({
      query: (arg) => ({
        url: `/${controller}/${arg.id}`,
        method: "PUT",
        body: arg.body,
      }),

      invalidatesTags: ["Categories"],
    }),

    deleteCategory: build.mutation<void, string>({
      query: (arg) => ({
        url: `/${controller}/${arg}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Categories"],
    }),
  }),
});

export default categoryService;
