import { BaseEntity } from "./base.types";
import { Category } from "./category.types";

export interface Dish extends BaseEntity {
  blob: string | null;
  category: Category;
  isInStop: boolean;
  name: string;
  price: number;
}

export interface UpdateDish {
  id: string;
  body: {
    category?: string;
    isInStop?: boolean;
    name?: string;
    price?: number;
  };
}

export interface CreateDish {
  category: string;
  name: string;
  price: number;
}
