import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type FeedbackStatus = "success" | "error" | "warning";

export interface FeedbackState {
  message: string | null;
  status: FeedbackStatus | null;
  undoAction: Function | null;
  time: string | null;
}

const initialState: FeedbackState = {
  message: null,
  status: null,
  undoAction: null,
  time: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setSuccess: (state: FeedbackState, { payload }: PayloadAction<string>) => {
      state.message = payload;
      state.status = "success";
      state.undoAction = null;
      state.time = new Date().toString();
    },
    setSuccessWithUndo: (
      state: FeedbackState,
      { payload }: PayloadAction<{ message: string; undo: Function }>
    ) => {
      state.message = payload.message;
      state.status = "success";
      state.undoAction = payload.undo;
      state.time = new Date().toString();
    },
    setError: (state: FeedbackState, { payload }: PayloadAction<string>) => {
      state.message = payload;
      state.status = "error";
      state.undoAction = null;
      state.time = new Date().toString();
    },
    setWarning: (state: FeedbackState, { payload }: PayloadAction<string>) => {
      state.message = payload;
      state.status = "warning";
      state.undoAction = null;
      state.time = new Date().toString();
    },
  },
});

export const { setSuccess, setSuccessWithUndo, setError, setWarning } =
  feedbackSlice.actions;

export const selectFeedback = (state: RootState) => state.feedback;

export default feedbackSlice.reducer;
