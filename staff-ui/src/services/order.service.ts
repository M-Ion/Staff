import { Safe } from "../types/company.types";
import { CreateOrder, Order, UpdateOrder } from "../types/order.types";
import apiService from "./api.service";

const controller: string = "Order";

const orderService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchKitchenOrders: build.query<Order[], void>({
      query: (arg) => ({
        url: `/${controller}/Kitchen`,
        method: "GET",
      }),
    }),

    fetchBarOrders: build.query<Order[], void>({
      query: (arg) => ({
        url: `/${controller}/Bar`,
        method: "GET",
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
