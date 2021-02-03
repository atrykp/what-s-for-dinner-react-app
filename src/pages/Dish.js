import React from "react";
const Dish = (props) => {
  const { name, description, ingredient, id, ban } = props.selectedDish;
  const ingredientArr = ingredient.map((item) => (
    <li>
      {item.name} - {item.quantity}
    </li>
  ));
  const shoppingList = ingredient.map((item) => (
    <label htmlFor={item.name}>
      {item.name}
      <input type="checkbox" id={item.name} />
    </label>
  ));
  return (
    <div className="selected dish">
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
      <div className="Steps">
        <h2>Przepis</h2>
      </div>
    </div>
  );
};
export default Dish;
