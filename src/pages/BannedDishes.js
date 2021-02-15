import React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import "../styles/BannedDishes.css";

const BannedDishes = ({
  allDishes,
  setAllDishes,
  setLocalStorage,
  compare,
}) => {
  const bannedDishes = allDishes.filter((dish) => dish.ban.status);
  const removeFromBanned = (id) => {
    const dishesArr = [...allDishes];
    const index = dishesArr.findIndex((element) => element.id === id);
    dishesArr[index].ban = { status: false, sinceWhen: "", howLong: "" };
    setAllDishes(dishesArr);
    setLocalStorage(dishesArr, "allDishes");
    compare(dishesArr[index]);
  };

  const dishesList = bannedDishes.map((dish) => {
    const dateObj = new Date(dish.ban.howLong + dish.ban.sinceWhen);

    return (
      <li key={v4()} className="bannedDishes_listElement">
        <p className="bannedDishes_listName">{dish.name}</p>{" "}
        <p>
          nieaktywna do:{" "}
          {!isNaN(dateObj.getDate()) ? dateObj.toLocaleString() : "nie lubię"}
        </p>
        <button
          onClick={() => removeFromBanned(dish.id)}
          className="bannedDishes_listElementBtn"
        >
          usuń
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="bannedDishes">
        <Link className="bannedDishes__backBtn" to="/">
          Wróć
        </Link>
        <ul className="bannedDishes_list">
          {bannedDishes.length > 0 ? dishesList : "brak"}
        </ul>
      </div>
    </>
  );
};

export default BannedDishes;
