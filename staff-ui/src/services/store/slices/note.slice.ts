import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Note } from "../../../types/note.types";

export interface NoteState {
  expandedNote: Note | null;
}

const initialState: NoteState = {
  expandedNote: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNote: (state: NoteState, { payload }: PayloadAction<Note | null>) => {
      state.expandedNote = payload;
    },
  },
});

export const { setNote } = noteSlice.actions;

export const selectExpandedNote = (state: RootState) => state.note.expandedNote;

export default noteSlice.reducer;
