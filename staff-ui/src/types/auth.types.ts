import { User } from "./user.types";

export enum StaffRoles {
  Cook = "Cook",
  Barkeep = "Barkeep",
  Waiter = "Waiter",
}

export interface TokenResp {
  token: string;
}

export interface AuthResp extends TokenResp {
  user: User;
}

export interface Login {
  email: string;
  password: string;
}

export interface SignUpManager {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
  confirm: string;
}

export interface SignUpStaff extends SignUpManager {
  role: StaffRoles;
}
