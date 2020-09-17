import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataPiece {
  id: number;
  description: string;
  title: string;
  image: string;
  datetime: string;
  authorId: number;
}

export interface ServerData {
  data: DataPiece[];
  paginatedData: DataPiece[];
  errors: string;
  loading: boolean;
}

const initialState: ServerData = {
  data: [],
  errors: "",
  paginatedData: [],
  loading: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setLoading: (state: ServerData, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setErrors: (state: ServerData, { payload }: PayloadAction<string>) => {
      state.errors = payload;
    },
    setData: (state: ServerData, { payload }: PayloadAction<any>) => {
      state.data = payload.news;
      state.paginatedData = state.data.slice(0, 6);
    },
    paginate: (state: ServerData) => {
      state.paginatedData = state.data.slice(0, state.paginatedData.length + 3);
    },
  },
});

export default newsSlice.reducer;

export const { setLoading, setErrors, setData, paginate } = newsSlice.actions;

export const dataSelector = (state: { dataStore: ServerData }) =>
  state.dataStore;
