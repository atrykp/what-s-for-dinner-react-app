import React from "react";
import { v4 } from "uuid";

const Ingredients = ({ drawnDish }) => {
  const ingredientsArr = [...drawnDish.ingredient];
  const ingredientsList = ingredientsArr.map((element) => (
    <li key={v4()}>
      {element.name}
      <span> {element.quantity}</span>
    </li>
  ));
  return <ul>{ingredientsList}</ul>;
};

export default Ingredients;
