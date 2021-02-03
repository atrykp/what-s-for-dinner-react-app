import React, { useState } from "react";

import "../styles/App.css";

const UserProducts = ({
  allDishes,
  setMatchDishes,
  setIsUserProductsActive,
  setSelectedDish,
}) => {
  const [dishesList, setDishesList] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [productsFilters, setProductsFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const showSection = () => {
    setIsActive((prevValue) => {
      if (prevValue) {
        setDishesList([]);
        setMatchDishes([]);
      } else setSelectedDish("");

      setIsUserProductsActive(!prevValue);
      return !prevValue;
    });
    allFilters();
  };
  const removeDuplicates = (arr) => {
    let dataArr = arr.map((item) => {
      return [item.name, item];
    }); // creates array of array
    let maparr = new Map(dataArr); // create key value pair from array of array
    let result = [...maparr.values()];
    return result; //converting back to array from mapobject
  };
  const allFilters = () => {
    const dishes = [...allDishes];
    const dishesFiltersArr = dishes
      .map((dish) =>
        dish.ingredient.map((elem) => ({
          name: elem.name,
          active: false,
          id: Math.floor(Math.random() * 123),
        }))
      )
      .flat();
    const singleFiltersArr = removeDuplicates(dishesFiltersArr);
    setProductsFilters(singleFiltersArr);
  };
  const getActiveFilters = (arr) => {
    const activeFilters = arr.filter((element) => element.active);
    return activeFilters;
  };
  const changeActiveStatus = (id) => {
    const filtersArr = [...productsFilters];
    const index = filtersArr.findIndex((filter) => filter.id === id);

    filtersArr[index].active = !filtersArr[index].active;
    filterDishes(filtersArr[index]);
    setActiveFilters(getActiveFilters(filtersArr));
    setProductsFilters(filtersArr);
  };
  const getMatchedDishes = (arr, name) => {
    const matchArr = [];
    arr.forEach((dish) => {
      let isMatch = false;
      for (let i = 0; i < dish.ingredient.length; i++) {
        if (dish.ingredient[i].name === name) isMatch = true;
      }
      if (isMatch) matchArr.push(dish);
    });
    return matchArr;
  };
  const filterDishes = (filterObj) => {
    const { active, name } = filterObj;
    let selectedDishesArr = [];
    if (active) {
      const dishesArr =
        dishesList.length > 0 ? [...dishesList] : [...allDishes];
      selectedDishesArr = getMatchedDishes(dishesArr, name);
    } else {
      let allDishesArr = [...allDishes];
      const currentFilters = activeFilters;

      const index = currentFilters.findIndex((item) => item.name === name);
      currentFilters.splice(index, 1);
      if (currentFilters.length === 0) {
        selectedDishesArr = [];
      } else {
        currentFilters.forEach((element) => {
          allDishesArr = getMatchedDishes(allDishesArr, element.name);
        });

        selectedDishesArr = allDishesArr;
      }
    }
    setDishesList(selectedDishesArr);
    setMatchDishes(selectedDishesArr);
  };
  const filters = productsFilters.map((item) => (
    <li>
      <button
        className={item.active ? "activeFilter" : ""}
        onClick={() => changeActiveStatus(item.id)}
      >
        {item.name}
      </button>
    </li>
  ));
  const section = isActive && (
    <div>
      <p>Zaznacz poniżej, które produkty już masz</p>
      <ul>{filters}</ul>
    </div>
  );

  return (
    <>
      <p>czy chesz filtrować po produktach które masz?</p>
      <button onClick={showSection}>{isActive ? "wyłącz" : "włącz"}</button>
      {section}
    </>
  );
};

export default UserProducts;
