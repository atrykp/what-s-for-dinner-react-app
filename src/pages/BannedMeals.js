import React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import "../styles/BannedMeals.css";
import { useSelector, useDispatch } from "react-redux";
import { changeBanStatus } from "../actions/actions";
import { useState } from "react";
import Modal from "../components/Modal";
const modalTxt = "Przepis usunięty ze wstrzymanych";
const BannedMeals = () => {
  const dispatch = useDispatch();
  const mealsStore = useSelector((state) => state.mealsReducer);
  const bannedMeals = mealsStore.filter((dish) => dish.ban.status);
  const [modalView, setModalView] = useState(false);

  const removeFromBanned = (id) => {
    dispatch(
      changeBanStatus(id, { status: false, sinceWhen: "", howLong: "" })
    );
    setModalView(true);
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
  const modal = modalView && <Modal txt={modalTxt} setView={setModalView} />;
  return (
    <>
      <div className="bannedMeals">
        {modal}
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
