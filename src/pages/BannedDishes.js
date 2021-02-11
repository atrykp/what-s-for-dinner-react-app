import React from "react";
import { Link } from "react-router-dom";

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
      <li>
        nazwa: {dish.name} nieaktywna do: {dateObj.toLocaleString()}
        <button onClick={() => removeFromBanned(dish.id)}>usuń</button>
      </li>
    );
  });

  return (
    <>
      <Link to="/">Wróć do strony głównej</Link>
      <ul className="bannedDishes">
        {bannedDishes.length > 0 ? dishesList : "brak"}
      </ul>
    </>
  );
};

export default BannedDishes;
