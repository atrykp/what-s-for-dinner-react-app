import { useState } from "react";
import { Link } from "react-router-dom";
import Ingredient from "../components/Ingredients";
import { v4 } from "uuid";
import "../styles/DrawnDishList.css";
import { useDispatch, useSelector } from "react-redux";
import { changeBanStatus, changeIsSelected } from "../actions/actions";
import { setLocalStorage } from "./App";
const DrawnDishList = ({
  customedArr,
  setSelectedDish,
  selectedDish,
  setIsUserProductsActive,
}) => {
  const dispatch = useDispatch(changeBanStatus);
  const mealsStore = useSelector((state) => state.mealsReducer);
  const [ingredientsView, setIngredientView] = useState(false);
  const [productsView, setProductsView] = useState(false);
  const [isSelected, setIsSelected] = useState(
    localStorage.getItem("isSelected") === null
      ? false
      : localStorage.getItem("isSelected")
  );

  const getDate = () => {
    let date = new Date();
    return date.getTime();
  };

  const banDish = (id, time, howLong) => {
    dispatch(changeBanStatus(id, { status: true, howLong, sinceWhen: time }));
    setLocalStorage(mealsStore, "allMeals");
  };

  const handleDraw = () => {
    let notYetArr = [...customedArr];

    if (notYetArr.length < 1) {
      return alert("Brak dań do losowania");
    }

    let index = Math.floor(Math.random() * notYetArr.length);
    // ustaw wylosowane danie w okienku
    setSelectedDish(notYetArr[index]);
    setIsSelected(false);
    setIsSelectedStorage(false);
    localStorage.removeItem("selectedDish");
    localStorage.removeItem("productsList");
    // usuń z local storage zaznaczone wcześniej składniki
  };

  const ban = (id, howLong = "permament") => {
    const sinceWhenDate = getDate();
    banDish(id, sinceWhenDate, howLong);
    setSelectedDish("");
  };
  const showIngredients = () => {
    setIngredientView((prevValue) => !prevValue);
  };
  const ingredientBtnTxt = ingredientsView
    ? "ukryj składniki"
    : "pokaż składniki";

  const ingredientSection = ingredientsView ? (
    <Ingredient drawnDish={selectedDish} />
  ) : null;
  const setSelectedDishReducer = (id, status) => {
    dispatch(changeIsSelected(id, status));
  };
  console.log(mealsStore);

  const drawnDishView = (
    <>
      <button onClick={showIngredients} className="drawnDish__ingredientsBtn">
        {ingredientBtnTxt}
      </button>
      {ingredientSection}
      <div
        className={`drawnDish__name ${
          selectedDish.name
            ? selectedDish.name.length > 30
              ? "drawnDish__name--small"
              : ""
            : null
        }`}
      >
        <h1
          className={` ${
            selectedDish.name
              ? selectedDish.name.length > 30
                ? "drawnDish__name--small"
                : ""
              : null
          }`}
        >
          {selectedDish.name}
        </h1>
      </div>
      <div className="drawnDish__buttons">
        <button
          onClick={() => ban(selectedDish.id, 7000)}
          className="drawnDish__shortBanBtn"
        >
          Nie dzisiaj
        </button>
        <Link
          to={`dish/${selectedDish.name}${selectedDish.id}`}
          onClick={() => {
            ban(selectedDish.id, 15000);
            setSelectedDish(selectedDish);
            setIsSelectedStorage(!isSelected);
            setSelectedDishStorage(selectedDish);
            setIsUserProductsActive(false);
            setSelectedDishReducer(selectedDish.id, selectedDish.isSelected);
          }}
          className="drawnDish__choose"
        >
          Ok
        </Link>
        <button
          onClick={() => ban(selectedDish.id)}
          className="drawnDish__banBtn"
        >
          Nie lubię
        </button>
      </div>
    </>
  );
  const showProductsList = () => {
    setProductsView((prevValue) => !prevValue);
  };
  const productsListArr = () => {
    if (productsView) {
      const list = JSON.parse(localStorage.getItem("productsList"));
      if (list) {
        return list
          .filter((item) => item.isChecked)
          .map((item) => (
            <p key={v4()}>
              nazwa: <strong>{item.name}</strong> ilość:{" "}
              <strong>{item.quantity}</strong>
            </p>
          ));
      } else return;
    } else return null;
  };
  const markDishAsDone = () => {
    setIsSelected(false);
    setIsSelectedStorage(false);
    localStorage.removeItem("selectedDish");
    localStorage.removeItem("productsList");
    setSelectedDish("");
  };

  const selectedDishView = (
    <>
      <button onClick={showIngredients} className="drawnDish__ingredientsBtn">
        {ingredientBtnTxt}
      </button>
      {ingredientSection}
      <div className="drawnDish__name">
        <h1>{selectedDish.name}</h1>
      </div>
      <div className="drawnDish__buttons">
        <button onClick={markDishAsDone} className="drawnDish__doneBtn">
          Zrobione
        </button>
        <Link
          to={`dish/${selectedDish.name}${selectedDish.id}`}
          className="drawnDish__choose"
        >
          pokaż
        </Link>
        <button onClick={showProductsList} className="drawnDish__productsBtn">
          {!productsView ? "zakupy" : "ukryj"}
        </button>
      </div>
      <div className="selectedDish__shoppingList"></div> {productsListArr()}
    </>
  );
  const dishView = isSelected ? selectedDishView : drawnDishView;

  const showDish = selectedDish && <div className="drawnDish">{dishView}</div>;
  const setIsSelectedStorage = (value) => {
    localStorage.setItem("isSelected", value);
  };
  const setSelectedDishStorage = (arr) => {
    localStorage.setItem("selectedDish", JSON.stringify(arr));
  };

  return (
    <>
      <div className="drawnDishSection">
        <button onClick={handleDraw} className="drawnDishSection__drawBtn">
          Losuj
        </button>
        {showDish}
      </div>
    </>
  );
};

export default DrawnDishList;
