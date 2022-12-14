import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { User } from "../../../types/user.types";

export interface UserState {
  currentUser: User | null;
  token: string | null;
}

const initialState: UserState = {
  currentUser: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setState: (state: UserState, { payload }: PayloadAction<UserState>) => {
      state.currentUser = payload.currentUser;
      state.token = payload.token;
    },

    setToken: (state: UserState, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },

    setInitial: (state: UserState) => {
      state.currentUser = initialState.currentUser;
      state.token = initialState.token;
    },
  },
});

export const { setInitial, setState, setToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
