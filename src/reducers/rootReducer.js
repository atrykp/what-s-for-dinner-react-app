import { combineReducers } from "redux";
import { mealsReducer } from "../reducers/mealsReducer";
import { filtersReducer } from "../reducers/filtersReducer";

const rootReducer = combineReducers({
  mealsReducer,
  filtersReducer,
});

export default rootReducer;
