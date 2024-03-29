import { Safe } from "../types/company.types";
import { CreateOrder, Order } from "../types/order.types";
import { SpecificStats } from "../types/statisitcs.types";
import apiService from "./api.service";

const controller: string = "Order";

const orderService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchKitchenOrders: build.query<Order[], void>({
      query: (arg) => ({
        url: `/${controller}/Kitchen`,
        method: "GET",
      }),

      providesTags: ["Orders"],
    }),

    fetchBarOrders: build.query<Order[], void>({
      query: (arg) => ({
        url: `/${controller}/Bar`,
        method: "GET",
      }),

      providesTags: ["Orders"],
    }),

    fetchOrdersStats: build.query<SpecificStats[], "Year" | "Month">({
      query: (arg) => ({
        url: `/${controller}/Statistics`,
        method: "GET",
        params: { by: arg },
      }),
    }),

    postOrder: build.mutation<void, CreateOrder>({
      query: (arg) => ({
        url: `/${controller}`,
        method: "POST",
        body: arg,
      }),

      invalidatesTags: ["Note"],
    }),

    finishOrder: build.mutation<void, string>({
      query: (arg) => ({
        url: `/${controller}/${arg}`,
        method: "PUT",
        body: {
          isPrepared: true,
        },
      }),

      invalidatesTags: ["Orders"],
    }),

    undoOrder: build.mutation<void, string>({
      query: (arg) => ({
        url: `/${controller}/${arg}`,
        method: "PUT",
        body: {
          isPrepared: false,
        },
      }),

      invalidatesTags: ["Orders"],
    }),

    deleteOrder: build.mutation<void, { id: string; passcode: Safe }>({
      query: (arg) => ({
        url: `/${controller}/${arg.id}`,
        body: arg.passcode,
        method: "DELETE",
      }),

      invalidatesTags: ["Note"],
    }),
  }),
});

export default orderService;
