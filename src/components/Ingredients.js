import React from "react";

const Ingredients = ({ drawnDish }) => {
  const ingredientsArr = [...drawnDish.ingredient];
  const ingredientsList = ingredientsArr.map((element) => (
    <li>
      {element.name}
      <span> {element.quantity}</span>
    </li>
  ));
  return <ul>{ingredientsList}</ul>;
};

export default Ingredients;