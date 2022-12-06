import _ from "lodash";
import { Order } from "../types/order";

export const findIndex = <T>(a: T[] | readonly T[], b: T) =>
  a.findIndex((item) => _.isEqual(item, b));

export const groupOrders = (arr: Order[]) => {
  let groupedOrder: Order[] = [];

  arr.forEach((order) => {
    const index = groupedOrder.findIndex((o) => o.dish.id === order.dish.id);

    if (index > -1) {
      if (groupedOrder[index].isPrepared === order.isPrepared) {
        groupedOrder[index].quantity += order.quantity;
      }
    } else {
      groupedOrder.push({ ...order });
    }
  });

  return groupedOrder;
};
