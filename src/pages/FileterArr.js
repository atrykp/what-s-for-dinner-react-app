import React, { useState } from "react";
import Filter from "../components/Filter";

const FileterArr = ({ allDishes, updateUserDishes, userDishes }) => {
  const [filterSection, setFilterSection] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filters, setFileter] = useState(
    JSON.parse(localStorage.getItem("filterArr")) || []
  );
  const [allFilters, setAllFilters] = useState([]);
  const [usersFilters, setUserFilters] = useState(
    JSON.parse(localStorage.getItem("userFilterArr")) || []
  );

  const showFilterArr = () => {
    setFilterSection((prevValue) => !prevValue);
  };

  const filterDishes = (element) => {
    const checked = element.active;
    const value = element.name;
    if (checked) {
      let arr = userDishes ? [...userDishes] : [...allDishes];
      let newArr = arr.filter(
        (item) =>
          !item.ban.status &&
          !item.ingredient.find((elem) => elem.name === value)
      );
      updateUserDishes(newArr);
    } else if (!checked) {
      let arr = [...allDishes];
      let dish = arr.filter(
        (element) =>
          !element.ban.status &&
          element.ingredient.find((elem) => elem.name === value)
      );
      let userArr = userDishes ? [...userDishes] : [];
      updateUserDishes([...dish, ...userArr]);
    }
  };

  const changeFilterActivity = (id) => {
    let filtersArr = [...filters];
    const elementId = filtersArr.findIndex((elem) => elem.id === id);
    filtersArr[elementId].active = !filtersArr[elementId].active;
    filterDishes(filtersArr[elementId]);
    setFileter(filtersArr);
    setFilterStorage(filtersArr);
  };

  const setFilterStorage = (arr, name) => {
    localStorage.setItem(name, JSON.stringify(arr));
  };

  const addNewFilter = (e) => {
    e.preventDefault();
    const newFilter = {
      name: filterName,
      active: true,
      id: Math.floor(Math.random() * 123),
    };
    filterDishes(newFilter);
    const allFilters = [newFilter, ...filters];
    const userFiltersArr = [...usersFilters, newFilter];
    setFileter(allFilters);
    setUserFilters(userFiltersArr);
    setFilterStorage(allFilters, "filterArr");
    setFilterStorage(userFiltersArr, "userFilterArr");
    setFilterName("");
  };

  const removeFilter = (id) => {
    let filtersArr = [...filters];
    const elementId = filtersArr.findIndex((elem) => elem.id === id);
    const element = filtersArr[elementId];
    if (element.active) {
      element.active = false;
      filterDishes(element);
    }
    filtersArr.splice(elementId, 1);
    setFileter(filtersArr);
    setFilterStorage(filtersArr);
  };
  const handleInputValue = (e) => {
    const value = e.target.value;
    setFilterName(value);
  };
  const removeDuplicates = (arr) => {
    let dataArr = arr.map((item) => {
      return [item.name, item];
    }); // creates array of array
    let maparr = new Map(dataArr); // create key value pair from array of array
    let result = [...maparr.values()];
    return result; //converting back to array from mapobject
  };
  const showAllFilters = () => {
    const currentFilters = [...filters];
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
    const allFiltersArr = [...dishesFiltersArr, ...currentFilters];
    const singleFiltersArr = removeDuplicates(allFiltersArr);
    setAllFilters(singleFiltersArr);
    setFileter(singleFiltersArr);
  };
  const filterForm = filterSection && (
    <>
      <button onClick={showAllFilters}>pokaż wszystkie filtry</button>
      <form action="" onSubmit={addNewFilter}>
        <input
          type="text"
          placeholder={"wpisz swój filtr"}
          onChange={handleInputValue}
          value={filterName}
        />
        <button onSubmit={addNewFilter}>dodaj</button>
      </form>
    </>
  );

  const filterArr = filters.map((element) => (
    <Filter
      filter={element}
      changeFilterActivity={changeFilterActivity}
      removeFilter={removeFilter}
      key={element.id}
    />
  ));
  // const allFiltersArray = allFilters.map((element) => (
  //   <Filter
  //     filter={element}
  //     changeFilterActivity={changeFilterActivity}
  //     removeFilter={removeFilter}
  //     key={element.id}
  //   />
  // ));
  const reset = () => {
    localStorage.removeItem("filterArr");
  };
  return (
    <>
      <button onClick={showFilterArr}>
        {filterSection ? "ukryj" : "rozwiń"}
      </button>
      <button onClick={reset}>usuń pamięć</button>
      {filterForm}
      {filterSection && filterArr}
      {/* {allFiltersArray.length > 0 && allFiltersArray} */}
    </>
  );
};

export default FileterArr;
