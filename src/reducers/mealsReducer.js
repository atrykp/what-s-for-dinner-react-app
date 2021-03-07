import {
  ADD_DISH,
  CHANGE_BAN_DISH,
  CHANGE_IS_SELECTED_DISH,
} from "../actions/actions";
import { mealsArr } from "../store/mealsArr";
const store = mealsArr;

export const mealsReducer = (state = store, action) => {
  switch (action.type) {
    case ADD_DISH:
      return [...state, action.payload];
    case CHANGE_BAN_DISH:
      return state.map((dish) => {
        if (dish.id !== action.payload.id) {
          return dish;
        } else {
          dish.ban = action.payload.ban;
          return dish;
        }
      });
    case CHANGE_IS_SELECTED_DISH:
      return state.map((dish) => {
        if (dish.id !== action.payload.id) {
          return dish;
        } else {
          dish.isSelected = action.payload.status;
          return dish;
        }
      });
    default:
      return state;
  }
};
