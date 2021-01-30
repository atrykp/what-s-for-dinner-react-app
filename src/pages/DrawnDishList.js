import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ingredient from "../components/Ingredients";
// tutaj otrzymuje przefiltrowaną tablicę dostosowaną do użytkownika bez potraw których nie lubi.

const DrawnDishList = ({ customedArr, banDish }) => {
  const [drawnDish, setDrawnDish] = useState("");
  const [ingredientsView, setIngredientView] = useState(false);

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
    setDrawnDish(notYetArr[index]);
    notYetArr.slice(index, 1);
  };

  const ban = (id, howLong = "permament") => {
    const sinceWhenDate = getDate();
    banDish(id, sinceWhenDate, howLong);
    setDrawnDish("");
  };
  const showIngredients = () => {
    setIngredientView((prevValue) => !prevValue);
    console.log(drawnDish);
  };
  const ingredientBtnTxt = ingredientsView
    ? "ukryj składniki"
    : "pokaż składniki";

  const ingredientSection = ingredientsView ? (
    <Ingredient drawnDish={drawnDish} />
  ) : null;

  const showDish = drawnDish && (
    <div className="drawnDish">
      <button onClick={showIngredients}>{ingredientBtnTxt}</button>
      {ingredientSection}
      <h1>{drawnDish.name}</h1>
      <Link
        to={`dish/${drawnDish.name}${drawnDish.id}`}
        onClick={() => ban(drawnDish.id, 15000)}
      >
        Ok
      </Link>
      <button onClick={() => ban(drawnDish.id, 7000)}>Nie dzisiaj</button>
      <button onClick={() => ban(drawnDish.id)}>Nie lubię</button>
    </div>
  );

  return (
    <>
      <button onClick={handleDraw}>Losuj</button>
      {showDish}
    </>
  );
};

export default DrawnDishList;
