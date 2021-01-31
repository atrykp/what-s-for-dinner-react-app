import React, { useState } from "react";

const UserProducts = ({ allDishes, updateUserDishes }) => {
  const [isActive, setIsActive] = useState(false);
  const [productsFilters, setProductsFilters] = useState([]);

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
    console.log(singleFiltersArr);

    setProductsFilters(singleFiltersArr);
  };
  const section = isActive && (
    <div>
      <p>Zaznacz poniżej, które produkty już masz</p>
      <div>{productsFilters}</div>
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
