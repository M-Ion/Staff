import { Order } from "./order.types";

export interface Note {
  id: string;
  orders: Order[];
  isCompleted: boolean;
}
