import { Company, GetCompany } from "./company.types";

export type User = AppUser | WorkerUser;

export interface AppUser {
  id: string;
  company: Company;
  fullName: string;
}

export interface WorkerUser {
  id: string;
  company: GetCompany;
  fullName: string;
}
