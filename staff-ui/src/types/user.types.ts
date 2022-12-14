import { Company, GetCompany } from "./company.types";

export type User = AppUser | WorkerUser;

export interface BaseUser {
  id: string;
  fullName: string;
  roles: string[];
  email: string;
}

export interface AppUser extends BaseUser {
  company: Company;
}

export interface WorkerUser extends BaseUser {
  company: GetCompany;
}
