import { Action, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import logger from "redux-logger";
import { ThunkAction } from "redux-thunk";
import newsSlice from "./slices/serverdata";
import commentsSlice from "./slices/comments";
import authorSlice from "./slices/author";
import authorsSlice from "./slices/authors";

export type AppThunk = ThunkAction<void, any, unknown, Action<string>>;

export const store = configureStore({
  reducer: {
    news: newsSlice,
    comments: commentsSlice,
    author: authorSlice,
    authors: authorsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
