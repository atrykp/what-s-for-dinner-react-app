import React, { useState } from "react";
import { v4 } from "uuid";
import "../styles/UserProducts.css";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../actions/actions";

const UserProducts = ({
  allMeals,
  setMatchMeals,
  setIsUserProductsActive,
  setSelectedDish,
}) => {
  const dispatch = useDispatch();
  const productsStore = useSelector((state) => state.productsReducer);

  const [mealsList, setMealsList] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const showSection = () => {
    setIsActive((prevValue) => {
      if (prevValue) {
        setMealsList([]);
        setMatchMeals([]);
      } else if (!localStorage.getItem("selectedDish")) {
        setSelectedDish("");
      }
      setIsUserProductsActive(!prevValue);
      return !prevValue;
    });
  };

  const changeActiveStatus = (id, status) => {
    dispatch(editProduct(id, !status));
  };
  const filters = productsStore.map((item) => (
    <li key={v4()} className="userProducts__filter">
      <button
        className={`${
          item.active ? "activeFilter" : ""
        } userProducts__filterBtn`}
        onClick={() => changeActiveStatus(item.id, item.active)}
      >
        {item.name}
      </button>
    </li>
  ));
  const section = (
    <CSSTransition
      in={isActive}
      timeout={300}
      classNames="sample"
      unmountOnExit
      appear
    >
      <div className="userProducts__filters">
        <p>Zaznacz poniżej, które produkty już masz</p>
        <ul className="userProducts__filtersList">{filters}</ul>
      </div>
    </CSSTransition>
  );

  return (
    <>
      <div className="userProducts">
        <button
          onClick={showSection}
          className={`userProducts__activeBtn ${
            isActive && "userProducts__activeBtn--active"
          }`}
        >
          Produkty
        </button>
        {section}
      </div>
    </>
  );
};

export default UserProducts;
