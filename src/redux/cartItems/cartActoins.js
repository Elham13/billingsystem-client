import {
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
} from "./cartTypes";
import axios from "axios";
import { localApi } from "../../utils/api";

const updateItem = (name, qty) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ITEM_REQUEST });

    try {
      const { data } = await axios.put(`${localApi}/updateItem`, { name, qty });
      data.errorMessage
        ? dispatch({ type: UPDATE_ITEM_FAILURE, payload: data.errorMessage })
        : dispatch({ type: UPDATE_ITEM_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: UPDATE_ITEM_FAILURE, payload: error.message });
    }
  };
};

export { updateItem };
