import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ingredient from "../components/Ingredients";
const DrawnDishList = ({
  customedArr,
  banDish,
  setSelectedDish,
  selectedDish,
  setIsUserProductsActive,
}) => {
  const [ingredientsView, setIngredientView] = useState(false);
  const [productsView, setProductsView] = useState(false);
  const [isSelected, setIsSelected] = useState(
    localStorage.getItem("isSelected") === null
      ? false
      : localStorage.getItem("isSelected")
  );

  useEffect(() => {
    getDate();
  }, []);
  const getDate = () => {
    let date = new Date();
    return date.getTime();
  };

  let notYetArr;

  const handleDraw = () => {
    notYetArr = [...customedArr];
    let index = Math.floor(Math.random() * notYetArr.length);
    setSelectedDish(notYetArr[index]);
    notYetArr.slice(index, 1);
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
    console.log(selectedDish);
  };
  const ingredientBtnTxt = ingredientsView
    ? "ukryj składniki"
    : "pokaż składniki";

  const ingredientSection = ingredientsView ? (
    <Ingredient drawnDish={selectedDish} />
  ) : null;

  const drawnDishView = (
    <>
      <button onClick={showIngredients}>{ingredientBtnTxt}</button>
      {ingredientSection}
      <h1>{selectedDish.name}</h1>
      <Link
        to={`dish/${selectedDish.name}${selectedDish.id}`}
        onClick={() => {
          ban(selectedDish.id, 15000);
          setSelectedDish(selectedDish);
          setIsSelectedStorage(!isSelected);
          setSelectedDishStorage(selectedDish);
          setIsUserProductsActive(false);
        }}
      >
        Ok
      </Link>
      <button onClick={() => ban(selectedDish.id, 7000)}>Nie dzisiaj</button>
      <button onClick={() => ban(selectedDish.id)}>Nie lubię</button>
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
            <>
              <p>
                nazwa: <strong>{item.name}</strong> ilość:{" "}
                <strong>{item.quantity}</strong>
              </p>
            </>
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
      <h1>{selectedDish.name}</h1>
      <button onClick={showIngredients}>{ingredientBtnTxt}</button>
      {ingredientSection}
      <Link to={`dish/${selectedDish.name}${selectedDish.id}`}>
        <button>OK</button>
      </Link>
      <button onClick={markDishAsDone}>Zrobione</button>
      <button onClick={showProductsList}>
        {!productsView ? "co jeszcze kupić" : "ukryj"}
      </button>
      {productsListArr()}
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
      <button onClick={handleDraw}>Losuj</button>
      {showDish}
    </>
  );
};

export default DrawnDishList;
