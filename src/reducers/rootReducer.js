import { combineReducers } from "redux";
import { mealsReducer } from "../reducers/mealsReducer";
import { filtersReducer } from "../reducers/filtersReducer";
import { productsReducer } from "../reducers/userProductsReducer";

const rootReducer = combineReducers({
  mealsReducer,
  filtersReducer,
  productsReducer,
});

export default rootReducer;
