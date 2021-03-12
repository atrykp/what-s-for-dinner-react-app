import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash.throttle";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState({
      filtersReducer: store.getState().filtersReducer,
      mealsReducer: store.getState().mealsReducer,
      productsReducer: store.getState().productsReducer,
      activeSectionReducer: store.getState().activeSectionReducer.dishModal,
      shoppingListReducer: store.getState().shoppingListReducer,
    });
  }, 1000)
);

export default store;
