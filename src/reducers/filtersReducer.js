import {
  ADD_FITLER,
  EDIT_FITLER,
  REMOVE_FITLER,
  UPDATE_FILTERS,
} from "../actions/actions";
import { filtersArray } from "../store/filtersArr";
const store = filtersArray();

export const filtersReducer = (state = store, action) => {
  switch (action.type) {
    case ADD_FITLER:
      return [...state, action.payload];
    case UPDATE_FILTERS:
      return [...action.payload.filtersArr];
    case REMOVE_FITLER:
      return state.filter((element) => element.id !== action.payload.id);
    case EDIT_FITLER:
      return state.map((element) => {
        if (element.id !== action.payload.id) {
          return element;
        }
        element.active = action.payload.active;
        return element;
      });
    default:
      return state;
  }
};
