import React, { useState } from "react";
import { v4 } from "uuid";
import "../styles/UserProducts.css";
import { CSSTransition } from "react-transition-group";

const UserProducts = ({
  allMeals,
  setMatchMeals,
  setIsUserProductsActive,
  setSelectedDish,
}) => {
  const [mealsList, setMealsList] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [productsFilters, setProductsFilters] = useState([]);
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
    const meals = [...allMeals];
    const mealsFiltersArr = meals
      .map((dish) =>
        dish.ingredient.map((elem) => ({
          name: elem.name,
          active: false,
          id: Math.floor(Math.random() * 12345),
        }))
      )
      .flat();
    const singleFiltersArr = removeDuplicates(mealsFiltersArr).filter(
      (item) => {
        return item.name.length > 1 && !item.name.includes("sól", "przypraw");
      }
    );
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
    filterMeals(filtersArr[index]);
    setActiveFilters(getActiveFilters(filtersArr));
    setProductsFilters(filtersArr);
  };
  const getMatchedMeals = (arr, name) => {
    let matchArr = [];
    arr.forEach((dish) => {
      let isMatch = false;
      for (let i = 0; i < dish.ingredient.length; i++) {
        if (dish.ingredient[i].name === name) isMatch = true;
      }
      if (isMatch) matchArr.push(dish);
    });
    console.log("dopasowane dania", matchArr);
    matchArr = matchArr.filter((dish) => !dish.ban.status);
    return matchArr;
  };
  const filterMeals = (filterObj) => {
    const { active, name } = filterObj;
    let selectedMealsArr = [];
    if (active) {
      const mealsArr = mealsList.length > 0 ? [...mealsList] : [...allMeals];
      selectedMealsArr = getMatchedMeals(mealsArr, name);
    } else {
      let allMealsArr = [...allMeals];
      const currentFilters = activeFilters;

      const index = currentFilters.findIndex((item) => item.name === name);
      currentFilters.splice(index, 1);
      if (currentFilters.length === 0) {
        selectedMealsArr = [];
      } else {
        currentFilters.forEach((element) => {
          allMealsArr = getMatchedMeals(allMealsArr, element.name);
        });

        selectedMealsArr = allMealsArr;
      }
    }
    setMealsList(selectedMealsArr);
    setMatchMeals(selectedMealsArr);
  };
  const filters = productsFilters.map((item) => (
    <li key={v4()} className="userProducts__filter">
      <button
        className={`${
          item.active ? "activeFilter" : ""
        } userProducts__filterBtn`}
        onClick={() => changeActiveStatus(item.id)}
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
