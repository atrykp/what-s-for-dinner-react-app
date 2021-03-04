import { CHANGE_ACTIVE_STATUS } from "../actions/actions";

const store = {};

export const activeSectionReducer = (status = store, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_STATUS:
      return status.map((element) => {
        if (element.name !== action.payload.name) {
          return element;
        } else {
          return (element.status = action.payload.status);
        }
      });
    default:
      return status;
  }
};
