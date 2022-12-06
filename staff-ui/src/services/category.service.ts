import { BaseEntity } from "../types/base.types";
import { Category, CreateCategory } from "../types/category.types";
import apiService from "./api.service";

const controller: string = "Category";

const categoryService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchCategories: build.query<Category[], void>({
      query: () => ({
        url: `/${controller}`,
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
