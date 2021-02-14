import React, { useState } from "react";
import Filter from "../components/Filter";
import TypeAheadDropDown from "./TypeAheadDropDown";
import { v4 } from "uuid";
import "../styles/FilterArr.css";

const FileterArr = ({
  allDishes,
  updateUserDishes,
  userDishes,
  setSelectedDish,
  isUserProductsActive,
}) => {
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
    if (isUserProductsActive) return alert("wyłącz sortowanie po produktach");
    setFilterSection((prevValue) => {
      if (!prevValue && !localStorage.getItem("selectedDish")) {
        setSelectedDish("");
      }
      return !prevValue;
    });
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
  const findFilter = (name, arr) => {
    const newArr = arr.filter((item) => item.name === name);
    return newArr.length > 0 ? true : false;
  };

  const addNewFilter = (e) => {
    e.preventDefault();
    if (
      findFilter(filterName, filters) ||
      findFilter(filterName, usersFilters) ||
      filterName.length < 2
    ) {
      setFilterName("");
      alert("ten filtr już istnieje lub nazwa jest za krótka (min 2 znaki)");
      return;
    }

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
    console.log(element);

    const userElement = findElementInArr(user, id);

    console.log(userElement);

    user.splice(userElement.elementId, 1);
    setUserFilters(user);
    setFilterStorage(user, "userFilterArr");

    if (element.item.active) {
      element.item.active = false;
      filterDishes(element.item);
    }
    filtersArr.splice(element.elementId, 1);
    setFileter(filtersArr);
    setFilterStorage(filtersArr, "filterArr");
  };

  const removeDuplicates = (arr) => {
    let dataArr = arr.map((item) => {
      return [item.name, item];
    }); // creates array of array
    let maparr = new Map(dataArr); // create key value pair from array of array
    let result = [...maparr.values()];
    return result; //converting back to array from mapobject
  };
  const allFiltersArr = () => {
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
    return removeDuplicates(allFiltersArr).filter(
      (item) => item.name.length > 0
    );
  };
  const showAllFilters = () => {
    const singleFiltersArr = allFiltersArr();
    setAllFiltersSection(true);
    setFileter(singleFiltersArr);
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
      <div className="filtersSectionButtons">
        {!allFiltersSection && (
          <button onClick={showAllFilters} className="filters__allFiltersBnt">
            wszystkie filtry
          </button>
        )}
        {allFiltersSection && (
          <button
            onClick={showActiveFilters}
            className="filters__activeFiltersBnt"
          >
            tylko aktywne
          </button>
        )}
        <button onClick={showUserFilters} className="filters__userFiltersBnt">
          moje filtry
        </button>
      </div>

      <form action="" onSubmit={addNewFilter} className="filters__addForm">
        <TypeAheadDropDown
          filterName={filterName}
          allFiltersArr={allFiltersArr}
          setFilterName={setFilterName}
        />
        <button className="filters__addFormBtn">dodaj</button>
      </form>
    </>
  );

  const filterArr = filters.map((element) => (
    <Filter
      filter={element}
      changeFilterActivity={changeFilterActivity}
      removeFilter={removeFilter}
      key={v4()}
    />
  ));

  return (
    <>
      <div className="filters">
        <p className="filters__name">Filtry</p>
        <button onClick={showFilterArr} className="filters__activeBtn">
          {filterSection ? "ukryj" : "pokaż"}
        </button>
        <p className="filters__counter">
          Aktywne <span>{activeFilters().length}</span>
        </p>
      </div>

      {filterForm}
      <div className="filterArr">{filterSection && filterArr}</div>
    </>
  );
};

export default FileterArr;
