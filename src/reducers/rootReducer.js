import { combineReducers } from "redux";
import { mealsReducer } from "../reducers/mealsReducer";
import { filtersReducer } from "../reducers/filtersReducer";
import { productsReducer } from "../reducers/userProductsReducer";
import { activeSectionReducer } from "../reducers/activeSectionReducer";

const rootReducer = combineReducers({
  mealsReducer,
  filtersReducer,
  productsReducer,
  activeSectionReducer,
});

export default rootReducer;
