import { BaseEntity } from "./base.types";

export interface GetCompany extends BaseEntity {
  name: string;
}

export interface Company extends GetCompany {
  safe: string;
}

export interface Safe {
  safe: string;
}
