import { Safe } from "../types/company.types";
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

    deleteOrder: build.mutation<void, { id: string; passcode: Safe }>({
      query: (arg) => ({
        url: `/${controller}/${arg.id}`,
        body: arg.passcode,
        method: "DELETE",
      }),
    }),
  }),
});

export default orderService;
