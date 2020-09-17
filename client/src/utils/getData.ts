import { setLoading, setErrors, setData } from "../store/slices/serverdata";
import { AppThunk } from "../store/store";
import axios from "axios";

export const getData = (url: string): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(url);

      dispatch(setLoading(false));
      dispatch(setData(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};
