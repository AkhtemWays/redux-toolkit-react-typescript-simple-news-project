import { setAuthor } from "../store/slices/author";
import { getAuthors } from "../store/slices/authors";
import { AppThunk } from "../store/store";
import axios from "axios";

export const getAuthor = (url: string): AppThunk => {
  return async (dispatch) => {
    const res = await axios.get(url);
    dispatch(setAuthor(res.data));
  };
};

export const getAllAuthors = (url: string): AppThunk => {
  return async (dispatch) => {
    const res = await axios.get(url);
    dispatch(getAuthors(res.data));
  };
};
