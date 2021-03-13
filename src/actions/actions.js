import { v4 } from "uuid";
export const ADD_DISH = "ADD_DISH";
export const CHANGE_BAN_DISH = "CHANGE_BAN_DISH";
export const CHANGE_IS_SELECTED_DISH = "CHANGE_IS_SELECTED_DISH";

export const ADD_FITLER = "ADD_FILTER";
export const EDIT_FITLER = "EDIT_FILTER";
export const REMOVE_FITLER = "REMOVE_FILTER";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const CHANGE_ACTIVE_STATUS = "CHANGE_ACTIVE_STATUS";
export const ADD_TO_SHOPPING_LIST = "ADD_TO_SHOPPING_LIST";
export const REMOVE_SHOPPING_LIST = "REMOVE_SHOPPING_LIST";

export const EDIT_SHOPPING_LIST_ELEMENT = "EDIT_SHOPPING_LIST_ELEMENTS";
export const EDIT_DISH = "EDIT_DISH";

export const addDish = ({
  name,
  ingredient = [],
  description = "",
  steps = [],
  ban = {},
}) => {
  return {
    type: ADD_DISH,
    payload: {
      name,
      ingredient,
      description,
      steps,
      id: v4(),
      ban,
    },
  };
};

export const editDish = (id, updatedDish) => {
  return {
    type: EDIT_DISH,
    payload: {
      id,
      updatedDish,
    },
  };
};

export const changeBanStatus = (id, ban) => {
  return {
    type: CHANGE_BAN_DISH,
    payload: {
      id,
      ban,
    },
  };
};
export const changeIsSelected = (id, status) => {
  return {
    type: CHANGE_IS_SELECTED_DISH,
    payload: {
      id,
      status: !status,
    },
  };
};
export const addFilter = (name, active) => {
  return {
    type: ADD_FITLER,
    payload: {
      name,
      active,
      id: v4(),
    },
  };
};

export const editFilter = (id, active) => {
  return {
    type: EDIT_FITLER,
    payload: {
      active,
      id,
    },
  };
};

export const deleteFilter = (id) => {
  return {
    type: REMOVE_FITLER,
    payload: {
      id,
    },
  };
};
export const editProduct = (id, active) => {
  return {
    type: EDIT_PRODUCT,
    payload: {
      active,
      id,
    },
  };
};

export const changeActiveStatus = (name, status) => {
  return {
    type: CHANGE_ACTIVE_STATUS,
    payload: {
      name,
      status,
    },
  };
};

export const addToShoppingList = (arr) => {
  return {
    type: ADD_TO_SHOPPING_LIST,
    payload: {
      arr,
    },
  };
};

export const removeShoppingList = () => {
  return {
    type: REMOVE_SHOPPING_LIST,
  };
};

export const editShoppingList = (id, isChecked) => {
  return {
    type: EDIT_SHOPPING_LIST_ELEMENT,
    payload: {
      id,
      isChecked: !isChecked,
    },
  };
};
