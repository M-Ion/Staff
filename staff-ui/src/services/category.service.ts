import { Category, CreateCategory } from "../types/category.types";
import { ReqFilter } from "../types/request.types";
import { FilteredResp } from "../types/response.types";
import apiService from "./api.service";

const controller: string = "Category";

const categoryService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchCategories: build.query<Category[], void>({
      query: () => ({
        url: `/${controller}`,
      }),
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

    postCategory: build.mutation<void, CreateCategory>({
      query: (arg) => ({
        url: `/${controller}`,
        method: "POST",
        body: arg,
      }),
    }),

    deleteCategory: build.mutation<void, string>({
      query: (arg) => ({
        url: `/${controller}/${arg}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default categoryService;
