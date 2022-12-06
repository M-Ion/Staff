import { CreateOrder } from "../types/order";
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
    }),

    deleteOrder: build.mutation<void, string>({
      query: (arg) => ({
        url: `/${controller}/${arg}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default orderService;
