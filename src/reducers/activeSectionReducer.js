import { CHANGE_ACTIVE_STATUS } from "../actions/actions";

const store = [
  {
    name: "ingredientsView",
    status: false,
  },
  {
    name: "productsView",
    status: false,
  },
  {
    name: "isUserProductsActive",
    status: false,
  },
];

export const activeSectionReducer = (state = store, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_STATUS:
      return state.map((element) => {
        if (element.name !== action.payload.name) {
          return element;
        } else {
          element.status = action.payload.status;
          return element;
        }
      });
    default:
      return state;
  }
};
