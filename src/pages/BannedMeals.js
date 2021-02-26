import React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import "../styles/BannedMeals.css";
import { compare } from "../components/compare";

const BannedMeals = ({
  allMeals,
  setAllMeals,
  setLocalStorage,
  setUserMeals,
}) => {
  const bannedMeals = allMeals.filter((dish) => dish.ban.status);
  const removeFromBanned = (id) => {
    const mealsArr = [...allMeals];
    const index = mealsArr.findIndex((element) => element.id === id);
    mealsArr[index].ban = { status: false, sinceWhen: "", howLong: "" };
    setAllMeals(mealsArr);
    setLocalStorage(mealsArr, "allMeals");
    compare(mealsArr[index], setUserMeals, allMeals);
  };

  const mealsList = bannedMeals.map((dish) => {
    const dateObj = new Date(dish.ban.howLong + dish.ban.sinceWhen);

    return (
      <li key={v4()} className="bannedMeals_listElement">
        <p className="bannedMeals_listName">{dish.name}</p>{" "}
        <p>
          nieaktywna do:{" "}
          {!isNaN(dateObj.getDate()) ? dateObj.toLocaleString() : "nie lubię"}
        </p>
        <button
          onClick={() => removeFromBanned(dish.id)}
          className="bannedMeals_listElementBtn"
        >
          usuń
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="bannedMeals">
        <Link className="bannedMeals__backBtn" to="/">
          Wróć
        </Link>
        <ul className="bannedMeals_list">
          {bannedMeals.length > 0 ? mealsList : "brak"}
        </ul>
      </div>
    </>
  );
};

export default BannedMeals;
