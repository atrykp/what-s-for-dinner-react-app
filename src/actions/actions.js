import { v4 } from "uuid";
export const ADD_DISH = "ADD_DISH";
export const CHANGE_BAN_DISH = "CHANGE_BAN_DISH";
export const CHANGE_IS_SELECTED_DISH = "CHANGE_IS_SELECTED_DISH";

export const ADD_FITLER = "ADD_FILTER";
export const EDIT_FITLER = "EDIT_FILTER";
export const REMOVE_FITLER = "REMOVE_FILTER";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
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
