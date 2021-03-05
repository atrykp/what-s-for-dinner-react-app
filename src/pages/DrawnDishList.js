import { useState } from "react";
import { Link } from "react-router-dom";
import Ingredient from "../components/Ingredients";
import { v4 } from "uuid";
import "../styles/DrawnDishList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBanStatus,
  changeIsSelected,
  changeActiveStatus,
} from "../actions/actions";

const DrawnDishList = ({ customedArr, setIsUserProductsActive }) => {
  const dispatch = useDispatch(changeBanStatus);
  const mealsStore = useSelector((state) => state.mealsReducer);
  const isSelectedDish = [...mealsStore].filter(
    (element) => element.isSelected
  );
  const isSectionActive = useSelector((state) => state.activeSectionReducer);
  const ingredientsView = isSectionActive.find(
    (element) => element.name === "ingredientsView"
  );

  const [drawnDish, setDrawnDish] = useState("");

  const [productsView, setProductsView] = useState(false);

  const setSelectedDishReducer = (id, status) => {
    dispatch(changeIsSelected(id, status));
  };

  const showDish = isSelectedDish.length > 0 ? isSelectedDish[0] : drawnDish;

  const getDate = () => {
    let date = new Date();
    return date.getTime();
  };

  const banDish = (id, time, howLong) => {
    dispatch(changeBanStatus(id, { status: true, howLong, sinceWhen: time }));
  };

  const handleDraw = () => {
    let notYetArr = [...customedArr];

    if (notYetArr.length < 1) {
      return alert("Brak dań do losowania");
    }
    if (isSelectedDish.length > 0) {
      const { id, isSelected } = isSelectedDish[0];
      setSelectedDishReducer(id, isSelected);
    }

    let index = Math.floor(Math.random() * notYetArr.length);
    setDrawnDish(notYetArr[index]);
  };

  const ban = (id, howLong = "permament") => {
    const sinceWhenDate = getDate();
    banDish(id, sinceWhenDate, howLong);
    setDrawnDish("");
  };

  const showIngredients = () => {
    dispatch(changeActiveStatus(ingredientsView.name, !ingredientsView.status));
  };
  const ingredientBtnTxt = ingredientsView.status
    ? "ukryj składniki"
    : "pokaż składniki";

  const ingredientSection = ingredientsView.status ? (
    <Ingredient drawnDish={showDish} />
  ) : null;

  const drawnDishView = (
    <>
      <button onClick={showIngredients} className="drawnDish__ingredientsBtn">
        {ingredientBtnTxt}
      </button>
      {ingredientSection}
      <div
        className={`drawnDish__name ${
          showDish.name
            ? showDish.name.length > 20
              ? "drawnDish__name--small"
              : ""
            : null
        }`}
      >
        <h1
          className={` ${
            showDish.name
              ? showDish.name.length > 20
                ? "drawnDish__name--small"
                : ""
              : null
          }`}
        >
          {showDish.name}
        </h1>
      </div>
      <div className="drawnDish__buttons">
        <button
          onClick={() => ban(showDish.id, 7000)}
          className="drawnDish__shortBanBtn"
        >
          Nie dzisiaj
        </button>
        <Link
          to={`dish/${showDish.name}${showDish.id}`}
          onClick={() => {
            ban(showDish.id, 15000);

            setIsUserProductsActive(false);
            setSelectedDishReducer(showDish.id, showDish.isSelected);
          }}
          className="drawnDish__choose"
        >
          Ok
        </Link>
        <button onClick={() => ban(showDish.id)} className="drawnDish__banBtn">
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
    } else return;
  };
  const markDishAsDone = () => {
    setSelectedDishReducer(showDish.id, showDish.isSelected);
  };

  const selectedDishView = (
    <>
      <button onClick={showIngredients} className="drawnDish__ingredientsBtn">
        {ingredientBtnTxt}
      </button>
      {ingredientSection}
      <div className="drawnDish__name">
        <h1
          className={` ${
            showDish.name
              ? showDish.name.length > 20
                ? "drawnDish__name--small"
                : ""
              : null
          }`}
        >
          {showDish.name || null}
        </h1>
      </div>
      <div className="drawnDish__buttons">
        <button onClick={markDishAsDone} className="drawnDish__doneBtn">
          Zrobione
        </button>
        <Link
          to={`dish/${showDish.name}${showDish.id}`}
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

  const dishView = isSelectedDish.length > 0 ? selectedDishView : drawnDishView;

  const showDishSection = showDish && (
    <div className="drawnDish">{dishView}</div>
  );

  return (
    <>
      <div className="drawnDishSection">
        <button onClick={handleDraw} className="drawnDishSection__drawBtn">
          Losuj
        </button>
        {showDishSection}
      </div>
    </>
  );
};

export default DrawnDishList;
