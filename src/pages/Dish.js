import { v4 } from "uuid";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Dish.css";
import Ingredients from "../components/Ingredients.js";
import { useDispatch, useSelector } from "react-redux";
import { addToShoppingList, editShoppingList } from "../actions/actions";
import { useState } from "react";
import Modal from "../components/Modal";
const modalTxt = "Przepis dodany do wstrzymane na 7 dni";

const Dish = () => {
  const dispatch = useDispatch();
  const mealsStore = useSelector((state) => state.mealsReducer);
  const productsList = useSelector((state) => state.shoppingListReducer);
  const isSelectedDish = [...mealsStore].filter(
    (element) => element.isSelected
  );
  const [modalView, setModalView] = useState(true);

  // destructuring selected dish
  const {
    name,
    description = null,
    ingredient = [],
    steps = [],
  } = isSelectedDish[0];

  const addProductsToStore = () => {
    const productsList = ingredient.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      isChecked: false,
      id: v4(),
    }));
    dispatch(addToShoppingList(productsList));
  };
  useEffect(() => {
    if (productsList.length === 0) addProductsToStore();
  }, []);

  const ingredientArr = (
    <Ingredients
      drawnDish={isSelectedDish[0]}
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
    const arr = [...productsList];
    const index = arr.findIndex((item) => item.name === e.target.id);
    dispatch(editShoppingList(arr[index].id, arr[index].isChecked));
  };

  const shoppingList = productsList.map((item) => (
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
  };
  const setView = (status) => {
    setModalView(status);
  };
  const modal = modalView && <Modal txt={modalTxt} setView={setView} />;

  return (
    <div className="selectedDish">
      {modal}
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
