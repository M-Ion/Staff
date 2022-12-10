import { BaseEntity } from "./base.types";
import { Dish } from "./dish.types";

export interface Order extends BaseEntity {
  dish: Dish;
  isPrepared: boolean;
  quantity: number;
  created: string;
  user: {
    id: string;
    fullName: string;
  };
}

export interface UpdateOrder {
  id: string;
  body: {
    isPrepared: boolean;
  };
}

export interface CreateOrder {
  dish: string;
  note: string;
}
