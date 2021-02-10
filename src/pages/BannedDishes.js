import React from "react";
import { Link } from "react-router-dom";

const BannedDishes = ({ allDishes }) => {
  const bannedDishes = allDishes.filter((dish) => dish.ban.status);
  const dishesList = bannedDishes.map((dish) => {
    const dateObj = new Date(dish.ban.howLong + dish.ban.sinceWhen);
    return (
      <li>
        nazwa: {dish.name} nieaktywna do: {dateObj.toLocaleString()}
      </li>
    );
  });

  return (
    <>
      <Link to="/">Wróć do strony głównej</Link>
      <ul className="bannedDishes">{dishesList}</ul>
    </>
  );
};

export default BannedDishes;
