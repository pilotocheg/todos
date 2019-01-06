import { combineReducers } from "redux";
import { filterReducer } from "./filter";
import { todoReducer } from "./todo";

export default combineReducers(todoReducer, filterReducer);
