import React from "react";

const Ingredients = ({ drawnDish }) => {
  const ingredientsList = drawnDish.ingredient.map((element) => (
    <li>
      element.name<span>element.quantity</span>
    </li>
  ));
  return { ingredientsList };
};

export default Ingredients;
