import _ from "lodash";
import { Order } from "../types/order.types";

export const findIndex = <T>(a: T[] | readonly T[], b: T) =>
  a.findIndex((item) => _.isEqual(item, b));

export const groupOrders = (arr: Order[]) => {
  let groupedOrder: Order[] = [];

  arr.forEach((order) => {
    const index = groupedOrder.findIndex(
      (o) => o.dish.id === order.dish.id && o.isPrepared === order.isPrepared
    );

    if (index > -1) {
      groupedOrder[index].quantity += order.quantity;
    } else {
      groupedOrder.push({ ...order });
    }
  });

  return groupedOrder.sort((a, b) => {
    if (!a.isPrepared) return -1;
    else return 1;
  });
};

export const groupOrdersForCheckout = (arr: Order[]) => {
  let groupedOrder: Order[] = [];

  arr.forEach((order) => {
    const index = groupedOrder.findIndex((o) => o.dish.id === order.dish.id);

    if (index > -1) {
      groupedOrder[index].quantity += order.quantity;
    } else {
      groupedOrder.push({ ...order });
    }
  });

  return groupedOrder.sort((a, b) => {
    if (!a.isPrepared) return -1;
    else return 1;
  });
};
