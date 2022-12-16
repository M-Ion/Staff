import { Company, UpdateCompany } from "../types/company.types";
import { GeneralStats, SpecificStats } from "../types/statisitcs.types";
import { WorkerUser } from "../types/user.types";
import apiService from "./api.service";

const controller: string = "Company";

const companyService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchCompany: build.query<Company, void>({
      query: () => ({
        url: `/${controller}`,
      }),

      providesTags: ["Company"],
    }),

    fetchWorkers: build.query<WorkerUser[], void>({
      query: () => ({
        url: `/${controller}/Workers`,
      }),

      providesTags: ["Workers"],
    }),

    fetchGeneralWorkersStats: build.query<GeneralStats<WorkerUser>[], void>({
      query: (arg) => ({
        url: `/${controller}/Workers/Statistics`,
        method: "GET",
      }),
    }),

    fetchSpecificWorkersStats: build.mutation<
      SpecificStats[],
      { id: string; by: "Year" | "Month" }
    >({
      query: (arg) => ({
        url: `/${controller}/Workers/Statistics/${arg.id}`,
        method: "GET",
        params: { by: arg.by },
      }),
    }),

    updateCompany: build.mutation<void, UpdateCompany>({
      query: (arg) => ({
        url: `/${controller}`,
        method: "PUT",
        body: arg,
      }),

      invalidatesTags: ["Company"],
    }),
  }),
});

export default companyService;
