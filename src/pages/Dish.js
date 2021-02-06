import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const handleCheck = (e) => {
    const arr = [...products];
    const index = arr.findIndex((item) => item.name === e.target.id);
    arr[index].isChecked = !arr[index].isChecked;
    setProducts(arr);
  };
  const shoppingList = products.map((item) => (
    <label htmlFor={item.name}>
      {item.name}
      <input
        type="checkbox"
        id={item.name}
        checked={item.isChecked}
        onChange={handleCheck}
      />
    </label>
  ));
  const handleSaveProducts = (e) => {
    e.preventDefault();
    localStorage.setItem("productsList", JSON.stringify(products));
    // zapisz do local storage cały obiekt
  };
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
        <form action="" onSubmit={(e) => handleSaveProducts(e)}>
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
