// ogarnąć opcje z zapisywaniem filtrów przez to że dodałem tyle stanów pomieszało się to z zapisywaniem w local storage

import React, { useState } from "react";
import Filter from "../components/Filter";

const FileterArr = ({ allDishes, updateUserDishes, userDishes }) => {
  const [filterSection, setFilterSection] = useState(false);
  const [allFiltersSection, setAllFiltersSection] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filters, setFileter] = useState(
    JSON.parse(localStorage.getItem("userFilterArr")) || []
  );
  const [usersFilters, setUserFilters] = useState(
    JSON.parse(localStorage.getItem("userFilterArr")) || []
  );

  const showFilterArr = () => {
    setFilterSection((prevValue) => !prevValue);
  };

  const filterDishes = (element) => {
    const checked = element.active;
    const value = element.name;
    let dishes = [];

    if (checked) {
      let arr = userDishes ? [...userDishes] : [...allDishes];
      let newArr = arr.filter(
        (item) =>
          !item.ban.status &&
          !item.ingredient.find((elem) => elem.name === value)
      );

      updateUserDishes(newArr);
    } else if (!checked) {
      let arr = [...allDishes].filter((item) => !item.ban.status);

      arr.forEach((item) => {
        let flag = false;

        for (let i = 0; i < item.ingredient.length; i++) {
          if (item.ingredient[i].name === value) {
            flag = true;
          }
        }
        if (flag) {
          console.log("wrzucam do tablicy", item);
          dishes.push(item);
        }
      });

      const activeFilters = filters.filter((e) => e.active);

      if (activeFilters.length === 0) {
        let userArr = userDishes ? [...userDishes] : [];
        updateUserDishes([...dishes, ...userArr]);
      } else if (activeFilters.length > 0) {
        const filterNames = [];

        activeFilters.forEach((item) => filterNames.push(item.name));
        const dishesArr = [];
        for (let i = 0; i < dishes.length; i++) {
          for (let j = 0; j < dishes[i].ingredient.length; j++) {
            if (filterNames.indexOf(dishes[i].ingredient[j].name) !== -1) {
              dishesArr.push(i);
            }
          }
        }

        if (dishesArr.length > 0) {
          dishesArr.forEach((el) => dishes.splice(el, 1));
          let userArr = userDishes ? [...userDishes] : [];
          updateUserDishes([...dishes, ...userArr]);
        } else {
          let userArr = userDishes ? [...userDishes] : [];
          updateUserDishes([...dishes, ...userArr]);
        }
      }
    }
  };

  const findElementInArr = (arr, id) => {
    const elementId = arr.findIndex((elem) => elem.id === id);
    const item = arr[elementId];
    return { item, elementId };
  };

  const changeFilterActivity = (id) => {
    let filtersArr = [...filters];
    let userArr = usersFilters.length > 0 ? [...usersFilters] : [];
    const element = findElementInArr(filtersArr, id);
    element.item.active = !element.item.active;
    const userElement = findElementInArr(userArr, id);
    console.log(userElement);

    if (userElement.elementId !== -1) {
      console.log("aktualizuje filer user");
      console.log(userArr);

      setUserFilters(filtersArr);
      setFilterStorage(filtersArr, "userFilterArr");
    } else {
      userArr.push(element.item);
      setUserFilters(userArr);
      setFilterStorage(userArr, "userFilterArr");
    }
    filterDishes(element.item);
    setFileter(filtersArr);
    setFilterStorage(filtersArr, "filterArr");
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
    const user = usersFilters.length > 0 ? [...usersFilters] : [];
    const element = findElementInArr(filtersArr, id);
    const userElement = findElementInArr(user, id);
    console.log(userElement);

    user.splice(userElement.elementId, 1);
    setUserFilters(userElement);
    setFilterStorage(user, "userFilterArr");

    if (element.item.active) {
      element.item.active = false;
      filterDishes(element.item);
    }
    filtersArr.splice(element.elementId, 1);
    setFileter(filtersArr);
    setFilterStorage(filtersArr, "filterArr");
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
    setAllFiltersSection(true);
    setFileter(singleFiltersArr);
    setFilterStorage(singleFiltersArr, "filterArr");
  };
  const activeFilters = () => {
    const arr = [...filters];
    const active = arr.filter((item) => item.active);
    return active;
  };
  const showActiveFilters = () => {
    const allFilters = activeFilters();
    setAllFiltersSection(false);
    setFileter(allFilters);
    setFilterStorage(allFilters, "filterArr");
  };
  const showUserFilters = () => {
    const allFilters = usersFilters.length > 0 ? [...usersFilters] : [];
    setAllFiltersSection(false);
    setFileter(allFilters);
    setFilterStorage(allFilters, "filterArr");
  };
  const filterForm = filterSection && (
    <>
      {!allFiltersSection && (
        <button onClick={showAllFilters}>pokaż wszystkie filtry</button>
      )}
      {allFiltersSection && (
        <button onClick={showActiveFilters}>Pokaż tylko aktywne</button>
      )}
      <button onClick={showUserFilters}>pokaż moje filtry</button>

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
      key={Math.floor(Math.random() * 1233443252)}
    />
  ));
  const reset = () => {
    localStorage.removeItem("filterArr");
    localStorage.removeItem("userFilterArr");
  };
  return (
    <>
      <button onClick={showFilterArr}>
        {filterSection ? "ukryj" : "rozwiń"}
      </button>
      <p>
        Liczba aktywnych filtrów <span>({activeFilters().length})</span>
      </p>
      <button onClick={reset}>usuń pamięć</button>
      {filterForm}
      {filterSection && filterArr}
    </>
  );
};

export default FileterArr;
