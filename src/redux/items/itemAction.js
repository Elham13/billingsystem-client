import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAILURE,
} from "./itemTypes";
import { localApi } from "../../utils/api";
import axios from "axios";

const addItem = (obj) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM_REQUEST });

    try {
      const { data } = await axios.post(`${localApi}/addItem`, obj);
      data.message
        ? dispatch({ type: ADD_ITEM_FAILURE, payload: data.message })
        : dispatch({ type: ADD_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADD_ITEM_FAILURE, payload: error.message });
    }
  };
};

const getAllItems = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ITEM_REQUEST });

    try {
      const { data } = await axios.get(`${localApi}/getItem`);
      data.message
        ? dispatch({ type: GET_ITEM_FAILURE, payload: data.message })
        : dispatch({ type: GET_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ITEM_FAILURE, payload: error.message });
    }
  };
};

export { addItem, getAllItems };
