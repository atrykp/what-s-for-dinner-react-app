import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Dish.css";
import Ingredients from "../components/Ingredients.js";
import EditDish from "../components/EditDish";
const Dish = (props) => {
  const [products, setProducts] = useState([]);
  const {
    name,
    description = null,
    ingredient = [],
    steps = [],
  } = props.selectedDish;

  const productsList = ingredient.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    isChecked: false,
  }));
  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("productsList"));
    if (arr) {
      setProducts(arr);
    } else setProducts(productsList);
  }, []);

  const ingredientArr = (
    <Ingredients
      drawnDish={props.selectedDish}
      className={"selectedDish__ingredient"}
    />
  );

  const stepsList =
    steps.length > 0
      ? steps.map((item) => (
          <li className="selectedDish__step" key={v4()}>
            {item.number}: {item.value}
          </li>
        ))
      : null;

  const handleCheck = (e) => {
    const arr = [...products];
    const index = arr.findIndex((item) => item.name === e.target.id);
    arr[index].isChecked = !arr[index].isChecked;
    setProducts(arr);
  };

  const shoppingList = products.map((item) => (
    <label htmlFor={item.name} key={v4()}>
      {item.name}
      <input
        type="checkbox"
        id={item.name}
        checked={item.isChecked}
        onChange={handleCheck}
      />
      <span className="checkmark"></span>
    </label>
  ));
  const handleSaveProducts = (e) => {
    e.preventDefault();
    localStorage.setItem("productsList", JSON.stringify(products));
    // zapisz do local storage cały obiekt
  };
  return (
    <div className="selectedDish">
      <Link to="/">Wróć</Link>
      <Link to={`/edit/${name}`}>Edytuj</Link>
      <h1 className="selectedDish__name">{name}</h1>
      <p className="selectedDish__description">{description}</p>
      <div className="selectedDish__products">
        <h2>składniki</h2>
        <ul className="selectedDish__ingredients">{ingredientArr}</ul>
        <h2>Lista zakupów</h2>
        <p>Zaznacz co musisz jeszcze kupić:</p>
        <form action="" onSubmit={(e) => handleSaveProducts(e)}>
          {shoppingList}
          <button>Zapisz</button>
        </form>
      </div>
      <div className="selectedDish__steps">
        <h2>Przepis</h2>
        {stepsList}
      </div>
    </div>
  );
};
export default Dish;
