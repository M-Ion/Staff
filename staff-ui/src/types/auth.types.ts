import { User } from "./user.types";

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
