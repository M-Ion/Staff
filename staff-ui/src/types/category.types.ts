import { BaseEntity } from "./base.types";

export enum DishType {
  Dish = "Dish",
  Beverage = "Beverage",
  Other = "Other",
}

export interface Category extends BaseEntity {
  name: string;
  dishType: DishType;
}

export interface CreateCategory {
  name: string;
  dishType: DishType;
}
