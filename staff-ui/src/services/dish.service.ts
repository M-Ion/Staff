import { BaseEntity } from "../types/base.types";
import { CreateDish, Dish, UpdateDish } from "../types/dish.types";
import { ReqFilter } from "../types/request.types";
import { FilteredResp } from "../types/response.types";
import { GeneralStats, SpecificStats } from "../types/statisitcs.types";
import apiService from "./api.service";

const controller: string = "Dish";

const dishService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchDishes: build.query<Dish[], void>({
      query: () => ({
        url: `/${controller}`,
      }),

      providesTags: ["Dishes"],
    }),

    fetchDishesByCategory: build.query<Dish[], string>({
      query: (arg) => ({
        url: `/${controller}/Category`,
        params: { category: arg },
      }),
    }),

    fetchFilteredDishes: build.mutation<FilteredResp<Dish>, ReqFilter[]>({
      query: (arg) => ({
        url: `/${controller}/Filtered`,
        method: "POST",
        body: arg,
      }),
    }),

    fetchGeneralDishStats: build.query<GeneralStats<Dish>[], void>({
      query: (arg) => ({
        url: `/${controller}/Statistics`,
        method: "GET",
      }),
    }),

    fetchSpecificDishStats: build.mutation<
      SpecificStats[],
      { id: string; by: "Year" | "Month" }
    >({
      query: (arg) => ({
        url: `/${controller}/Statistics/${arg.id}`,
        method: "GET",
        params: { by: arg.by },
      }),
    }),

    postDish: build.mutation<BaseEntity, CreateDish>({
      query: (arg) => ({
        url: `/${controller}`,
        method: "POST",
        body: arg,
      }),

      invalidatesTags: ["Dishes"],
    }),

    updateDish: build.mutation<void, UpdateDish>({
      query: (arg) => ({
        url: `/${controller}/${arg.id}`,
        method: "PUT",
        body: arg.body,
      }),

      invalidatesTags: ["Dishes"],
    }),

    deleteDish: build.mutation<void, string>({
      query: (arg) => ({
        url: `/${controller}/${arg}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Dishes"],
    }),
  }),
});

export default dishService;
