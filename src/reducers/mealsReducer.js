import { ADD_DISH, CHANGE_BAN_DISH } from "../actions/actions";
import { mealsArr } from "../store/mealsArr";

export const mealsReducer = (state = mealsArr, action) => {
  switch (action.type) {
    case ADD_DISH:
      return [...state, action.payload];
    case CHANGE_BAN_DISH:
      let dish = state.filter((element) => element.id === action.payload.id);
      dish.ban = action.payload.ban;
      return state.map((dish) => {
        if (dish.id !== action.payload.id) {
          return dish;
        } else {
          return (dish.ban = action.payload.ban);
        }
      });
    default:
      return state;
  }
};
