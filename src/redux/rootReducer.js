import { combineReducers } from "redux";
import itemReducer from "./items/itemReducer";
import getItemReducer from "./items/getItemsReducer";
import { cartReducer } from "./cartItems/cartReducer";

const rootReducer = combineReducers({
  addItem: itemReducer,
  getItems: getItemReducer,
  updated: cartReducer,
});

export default rootReducer;
