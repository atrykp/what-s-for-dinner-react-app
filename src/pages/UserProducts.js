import React, { useState } from "react";

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
  const changeActiveStatus = (id) => {
    const filtersArr = [...productsFilters];
    const index = filtersArr.findIndex((filter) => filter.id === id);
    console.log(filtersArr[index].active);

    filtersArr[index].active = !filtersArr[index].active;
    console.log(filtersArr[index].active);
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
    <p>
      <button onClick={showSection}>{isActive ? "ukryj" : "rozwiń"}</button>
      {section}
    </p>
  );
};

export default UserProducts;
