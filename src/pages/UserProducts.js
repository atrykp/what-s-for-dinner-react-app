import React, { useState } from "react";
import "../styles/App.css";

const UserProducts = ({ allDishes, updateUserDishes }) => {
  const [dishesList, setDishesList] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [productsFilters, setProductsFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const showSection = () => {
    setIsActive((prevValue) => !prevValue);
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
  const filterDishes = (filterObj) => {
    const { active, name } = filterObj;
    console.log(name);
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
      <button onClick={showSection}>{isActive ? "ukryj" : "rozwiń"}</button>
      {section}
    </>
  );
};

export default UserProducts;
