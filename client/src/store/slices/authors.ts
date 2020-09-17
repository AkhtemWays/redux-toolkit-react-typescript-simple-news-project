import { AuthorData } from "./author";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Authors {
  authors: AuthorData[];
}

const initialState: Authors = {
  authors: [],
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    getAuthors: (state: Authors, { payload }: PayloadAction<AuthorData[]>) => {
      state.authors = payload;
    },
  },
});

export default authorsSlice.reducer;

export const { getAuthors } = authorsSlice.actions;

export const dataSelector = (state: { dataStore: AuthorData[] }) =>
  state.dataStore;
