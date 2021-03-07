import {
  ADD_TO_SHOPPING_LIST,
  REMOVE_FROM_SHOPPING_LIST,
  EDIT_SHOPPING_LIST_ELEMENT,
} from "../actions/actions";

export const shoppingListReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_SHOPPING_LIST:
      return [...state, action.payload];
    case REMOVE_FROM_SHOPPING_LIST:
      return state.filter((element) => element.id !== action.payload.id);
    case EDIT_SHOPPING_LIST_ELEMENT:
      return state.map((element) => {
        if (element.id !== action.payload.id) {
          return element;
        }
        element.isChecked = action.payload.isChecked;
        return element;
      });
    default:
      return state;
  }
};
