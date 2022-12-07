import { BaseEntity } from "./base.types";
import { Dish } from "./dish.types";

export interface Order extends BaseEntity {
  dish: Dish;
  isPrepared: boolean;
  quantity: number;
}

export interface CreateOrder {
  dish: string;
  note: string;
}
