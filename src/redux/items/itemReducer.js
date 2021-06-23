import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
} from "./itemTypes";

const initialState = {
  itemLoading: false,
  itemRes: {},
  itemError: "",
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return {
        ...state,
        itemLoading: true,
      };
    case ADD_ITEM_SUCCESS:
      return {
        itemLoading: false,
        itemRes: action.payload,
        itemError: "",
      };
    case ADD_ITEM_FAILURE:
      return {
        itemLoading: false,
        itemRes: {},
        itemError: action.payload,
      };
    default:
      return state;
  }
};

export default itemReducer;
