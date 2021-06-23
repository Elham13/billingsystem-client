import {
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAILURE,
} from "./itemTypes";

const initialState = {
  getItemLoading: false,
  getItemRes: [],
  getItemErr: "",
};

const getItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_REQUEST:
      return {
        ...state,
        getItemLoading: true,
      };
    case GET_ITEM_SUCCESS:
      return {
        getItemLoading: false,
        getItemRes: action.payload,
        getItemErr: "",
      };
    case GET_ITEM_FAILURE:
      return {
        getItemLoading: false,
        getItemRes: [],
        getItemErr: action.payload,
      };
    default:
      return state;
  }
};

export default getItemReducer;
