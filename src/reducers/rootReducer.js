import { combineReducers } from "redux";
import { mealsReducer } from "../reducers/mealsReducer";
import { filtersReducer } from "../reducers/filtersReducer";
import { productsReducer } from "../reducers/userProductsReducer";
import { activeSectionReducer } from "../reducers/activeSectionReducer";
import { shoppingListReducer } from "./shoppingListReducer";

const rootReducer = combineReducers({
  mealsReducer,
  filtersReducer,
  productsReducer,
  activeSectionReducer,
  shoppingListReducer,
});

export default rootReducer;
