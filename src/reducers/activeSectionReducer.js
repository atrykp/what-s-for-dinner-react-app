import { CHANGE_ACTIVE_STATUS } from "../actions/actions";

const store = {
  ingredientsView: false,
  productsView: false,
  isUserProductsActive: false,
  dishModal: true,
};

export const activeSectionReducer = (state = store, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_STATUS:
      return { ...state, [action.payload.name]: action.payload.status };
    default:
      return state;
  }
};
