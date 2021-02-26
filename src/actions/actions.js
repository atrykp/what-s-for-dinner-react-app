export const ADD_DISH = "ADD_DISH";
export const CHANGE_BAN_DISH = "CHANGE_BAN_DISH";

export const addDish = (
  name,
  ingredient = [],
  description = "",
  steps = [],
  ban = {}
) => {
  return {
    type: ADD_DISH,
    payload: {
      name,
      ingredient,
      description,
      steps,
      id: 1,
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
