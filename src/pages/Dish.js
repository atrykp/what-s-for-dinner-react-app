import React from "react";
import { Link } from "react-router-dom";
const Dish = (props) => {
  const {
    name,
    description = null,
    ingredient = [],
    steps = [],
  } = props.selectedDish;

  const ingredientArr = ingredient.map((item) => (
    <li>
      {item.name} - {item.quantity}
    </li>
  ));

  const stepsList =
    steps.length > 0
      ? steps.map((item) => (
          <li>
            {item.number}: {item.value}
          </li>
        ))
      : null;

  const shoppingList = ingredient.map((item) => (
    <label htmlFor={item.name}>
      {item.name}
      <input type="checkbox" id={item.name} />
    </label>
  ));
  return (
    <div className="selected dish">
      <Link to="/">Wróć do strony głównej</Link>
      <h1>{name}</h1>
      <p className="description">{description}</p>
      <div className="products">
        <h2>składniki</h2>
        <ul className="productsList">{ingredientArr}</ul>
        <h2>Lista zakupów</h2>
        <p>Zaznacz co musisz jeszcze kupić</p>
        <form action="">
          {shoppingList}
          <button>Zapisz</button>
        </form>
      </div>
      <div className="steps">
        <h2>Przepis</h2>
        {stepsList}
      </div>
    </div>
  );
};
export default Dish;
