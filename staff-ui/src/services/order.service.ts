import { Safe } from "../types/company.types";
import { CreateOrder } from "../types/order.types";
import apiService from "./api.service";

const controller: string = "Order";

const orderService = apiService.injectEndpoints({
  endpoints: (build) => ({
    postOrder: build.mutation<void, CreateOrder>({
      query: (arg) => ({
        url: `/${controller}`,
        method: "POST",
        body: arg,
      }),

      invalidatesTags: ["Note"],
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
