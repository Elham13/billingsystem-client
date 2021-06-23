import {
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
} from "./cartTypes";

const initialState = {
  updateLoading: false,
  updateRes: "",
  updateErr: "",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ITEM_REQUEST:
      return {
        ...state,
        updateLoading: true,
      };
    case UPDATE_ITEM_SUCCESS:
      return {
        updateLoading: false,
        updateRes: action.payload,
        updateErr: "",
      };
    case UPDATE_ITEM_FAILURE:
      return {
        updateLoading: false,
        updateRes: "",
        updateErr: action.payload,
      };
    default:
      return state;
  }
};

export { cartReducer };
