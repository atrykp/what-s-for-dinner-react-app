import React from "react";
import { v4 } from "uuid";
import "../styles/Ingredients.css";

const Ingredients = ({ drawnDish }) => {
  const ingredientsArr = [...drawnDish.ingredient];
  const ingredientsList = ingredientsArr.map((element) => (
    <li key={v4()}>
      {element.name}
      <span> {element.quantity}</span>
    </li>
  ));
  return <ul className="ingredientsList">{ingredientsList}</ul>;
};

export default Ingredients;
