import { combineReducers } from "redux";
import { mealsReducer } from "../reducers/mealsReducer";

const rootReducer = combineReducers({
  mealsReducer,
});

export default rootReducer;
