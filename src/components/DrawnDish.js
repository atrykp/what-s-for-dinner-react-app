import React from "react";
import { Link } from "react-router-dom";

const DrawnDish = ({
  showIngredients,
  ingredientsView,
  showDish,
  ban,
  setSelectedDishReducer,
  dispatch,
  changeActiveStatus,
  ingredientSection,
}) => {
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
    </>
  );
};

export default DrawnDish;
