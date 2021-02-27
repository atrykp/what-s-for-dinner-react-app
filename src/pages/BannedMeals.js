import React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import "../styles/BannedMeals.css";
import { useSelector, useDispatch } from "react-redux";
import { changeBanStatus } from "../actions/actions";

const BannedMeals = ({ setLocalStorage }) => {
  const dispatch = useDispatch();
  const mealsStore = useSelector((state) => state.mealsReducer);
  const bannedMeals = mealsStore.filter((dish) => dish.ban.status);

  const removeFromBanned = (id) => {
    dispatch(
      changeBanStatus(id, { status: false, sinceWhen: "", howLong: "" })
    );
    setLocalStorage(mealsStore, "allMeals");
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
