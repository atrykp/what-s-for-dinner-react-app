import { EDIT_PRODUCT, UPDATE_PRODUCTS } from "../actions/actions";
import { userProducts } from "../store/userProducts";
const store = userProducts();
export const productsReducer = (state = store, action) => {
  switch (action.type) {
    case EDIT_PRODUCT:
      return state.map((element) => {
        if (element.id !== action.payload.id) {
          return element;
        }
        element.active = action.payload.active;
        return element;
      });
    case UPDATE_PRODUCTS:
      return [...action.payload.productsArr];
    default:
      return state;
  }
};
