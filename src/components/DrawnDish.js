import React from "react";
import { Link } from "react-router-dom";
import Ingredient from "../components/Ingredients";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveStatus } from "../actions/actions";

const DrawnDish = ({
  showIngredients,
  showDish,
  ban,
  setSelectedDishReducer,
  markDishAsDone,
  showProductsList,

  productsListArr,
}) => {
  const dispatch = useDispatch();
  const isSectionActive = useSelector((state) => state.activeSectionReducer);
  const { ingredientsView, productsView } = isSectionActive;
  const drawnDishButtons = (
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

          dispatch(changeActiveStatus("isUserProductsActive", false));
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
  );
  const selectedDishButtons = (
    <>
      <div className="drawnDish__buttons">
        <button onClick={markDishAsDone} className="drawnDish__doneBtn">
          Zrobione
        </button>
        <Link
          to={`dish/${showDish.name}${showDish.id}`}
          className="drawnDish__choose"
          onClick={() => {
            dispatch(changeActiveStatus("isUserProductsActive", false));
            dispatch(changeActiveStatus("productsView", false));
          }}
        >
          pokaż
        </Link>
        <button onClick={showProductsList} className="drawnDish__productsBtn">
          {!productsView ? "zakupy" : "ukryj"}
        </button>
      </div>
      <div className="selectedDish__shoppingList">{productsListArr()}</div>
    </>
  );

  const ingredientSection = ingredientsView ? (
    <Ingredient drawnDish={showDish} />
  ) : null;
  const ingredientBtnTxt = ingredientsView
    ? "ukryj składniki"
    : "pokaż składniki";
  return (
    <>
      <button onClick={showIngredients} className="drawnDish__ingredientsBtn">
        {ingredientBtnTxt}
      </button>
      {ingredientSection}

      <div
        className={`drawnDish__name ${
          showDish.name
            ? showDish.name.length > 25
              ? "drawnDish__name--small"
              : ""
            : null
        }`}
      >
        <h1
          className={` ${
            showDish.name
              ? showDish.name.length > 25
                ? "drawnDish__name--small"
                : ""
              : null
          }`}
        >
          {showDish.name}
        </h1>
      </div>
      <div>{showDish.isSelected ? selectedDishButtons : drawnDishButtons}</div>
    </>
  );
};

export default DrawnDish;
