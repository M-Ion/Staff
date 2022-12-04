import { WorkerUser } from "../types/user.types";
import apiService from "./api.service";

const controller: string = "Company";

const companyService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchWorkers: build.query<WorkerUser[], void>({
      query: () => ({
        url: `/${controller}/Workers`,
      }),
    }),
  }),
});

export default companyService;
