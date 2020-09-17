import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthorData {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
}

const initialState: AuthorData = {
  id: null,
  firstName: null,
  lastName: null,
};

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    setAuthor: (state: AuthorData, { payload }: PayloadAction<AuthorData>) => {
      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
    },
  },
});

export default authorSlice.reducer;

export const { setAuthor } = authorSlice.actions;

export const dataSelector = (state: { dataStore: AuthorData }) =>
  state.dataStore;
