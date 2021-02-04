import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ingredient from "../components/Ingredients";
// tutaj otrzymuje przefiltrowaną tablicę dostosowaną do użytkownika bez potraw których nie lubi.

const DrawnDishList = ({
  customedArr,
  banDish,
  setSelectedDish,
  selectedDish,
}) => {
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
    setSelectedDish(notYetArr[index]);
    notYetArr.slice(index, 1);
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

  const showDish = selectedDish && (
    <div className="drawnDish">
      <button onClick={showIngredients}>{ingredientBtnTxt}</button>
      {ingredientSection}
      <h1>{selectedDish.name}</h1>
      <Link
        to={`dish/${selectedDish.name}${selectedDish.id}`}
        onClick={() => {
          ban(selectedDish.id, 15000);
          setSelectedDish(selectedDish);
        }}
      >
        Ok
      </Link>
      <button onClick={() => ban(selectedDish.id, 7000)}>Nie dzisiaj</button>
      <button onClick={() => ban(selectedDish.id)}>Nie lubię</button>
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
