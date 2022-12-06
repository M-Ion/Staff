import { BaseEntity } from "../types/base.types";
import { CreateDish, Dish } from "../types/dish.types";
import apiService from "./api.service";

const controller: string = "Dish";

const dishService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchDishes: build.query<Dish[], void>({
      query: () => ({
        url: `/${controller}`,
      }),
    }),

    postDish: build.mutation<BaseEntity, CreateDish>({
      query: (arg) => ({
        url: `/${controller}`,
        method: "POST",
        body: arg,
      }),
    }),

    deleteDish: build.mutation<void, string>({
      query: (arg) => ({
        url: `/${controller}/${arg}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default dishService;
