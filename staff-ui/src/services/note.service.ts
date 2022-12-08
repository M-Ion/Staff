import { Safe } from "../types/company.types";
import { Note } from "../types/note.types";
import apiService from "./api.service";

const controller: string = "Note";

const noteService = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchWaiterNotes: build.query<Note[], void>({
      query: () => ({
        url: `/${controller}/Worker`,
      }),
      providesTags: ["Note"],
    }),

    postNote: build.mutation<void, void>({
      query: () => ({
        url: `/${controller}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Note"],
    }),

    completeNote: build.mutation<void, string>({
      query: (arg) => ({
        url: `/${controller}/${arg}`,
        method: "PUT",
        body: { isCompleted: true },
      }),

      invalidatesTags: ["Note"],
    }),

    deleteNote: build.mutation<void, { id: string; passcode: Safe }>({
      query: (arg) => ({
        url: `/${controller}/${arg.id}`,
        body: arg.passcode,
        method: "DELETE",
      }),

      invalidatesTags: ["Note"],
    }),
  }),
});

export default noteService;
