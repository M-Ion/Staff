export interface GetCompany {
  id: string;
  name: string;
}

export interface Company extends GetCompany {
  safe: string;
}
