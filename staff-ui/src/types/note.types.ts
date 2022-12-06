import { Order } from "./order";

export interface Note {
  id: string;
  orders: Order[];
  isCompleted: boolean;
}
