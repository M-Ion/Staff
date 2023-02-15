import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum Lang {
  EN = "EN",
  RO = "RO",
}

export interface LocalizationState {
  language: Lang;
}

const initialState: LocalizationState = {
  language: Lang.EN,
};

const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    setLang: (state: LocalizationState, { payload }: PayloadAction<Lang>) => {
      state.language = payload;
    },
  },
});

export const { setLang } = localizationSlice.actions;

export const selectLang = (state: RootState) => state.localization.language;

export default localizationSlice.reducer;
