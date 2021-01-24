import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";

const FileterArr = ({ allDishes, updateUserDishes }) => {
  console.log("jestem w filter");
  const [filterSection, setFilterSection] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filters, setFileter] = useState(
    JSON.parse(localStorage.getItem("filterArr")) || []
  );
  const [customedArr, setCustomedArr] = useState("");
  console.log(filters);
  console.log(customedArr);

  const showFilterArr = () => {
    setFilterSection((prevValue) => !prevValue);
  };

  useEffect(() => {
    filters.forEach((element) => handleChange(element));
  }, [filters]);

  const handleChange = (element) => {
    const checked = element.active;
    const value = element.name;
    if (checked) {
      let arr = customedArr ? [...customedArr] : [...allDishes];
      let newArr = arr.filter(
        (element) => !element.skladniki.find((elem) => elem.name === value)
      );
      setCustomedArr(newArr);
      updateUserDishes(newArr);
    } else {
      let arr = [...allDishes];
      let dish = arr.filter((element) =>
        element.skladniki.find((elem) => elem.name === value)
      );
      setCustomedArr([...dish, ...customedArr]);
      updateUserDishes([...dish, ...customedArr]);
    }
  };
  const changeFilterActivity = (id) => {
    let filtersArr = [...filters];
    const elementId = filtersArr.findIndex((elem) => elem.id === id);
    filtersArr[elementId].active = !filtersArr[elementId].active;
    handleChange(filtersArr[elementId]);
    setFileter(filtersArr);
    setFilterStorage(filtersArr);
  };
  const setFilterStorage = (arr) => {
    localStorage.setItem("filterArr", JSON.stringify(arr));
  };
  const addNewFilter = (e) => {
    e.preventDefault();
    const newFilter = {
      name: filterName,
      active: true,
      id: Math.floor(Math.random() * 123),
    };
    handleChange(newFilter);
    const allFilters = [newFilter, ...filters];
    setFileter(allFilters);
    setFilterStorage(allFilters);
    setFilterName("");
  };
  const removeFilter = (id) => {
    let filtersArr = [...filters];
    const elementId = filtersArr.findIndex((elem) => elem.id === id);
    const element = filtersArr[elementId];
    if (element.active) {
      element.active = false;
      handleChange(element);
    }
    filtersArr.splice(elementId, 1);
    setFileter(filtersArr);
    setFilterStorage(filtersArr);
  };
  const handleInputValue = (e) => {
    const value = e.target.value;
    setFilterName(value);
  };
  const filterForm = filterSection && (
    <form action="" onSubmit={addNewFilter}>
      <input
        type="text"
        placeholder={"wpisz swój filtr"}
        onChange={handleInputValue}
        value={filterName}
      />
      <button onSubmit={addNewFilter}>dodaj</button>
    </form>
  );

  const filterArr = filters.map((element) => (
    <Filter
      filter={element}
      changeFilterActivity={changeFilterActivity}
      removeFilter={removeFilter}
      key={element.id}
    />
  ));
  return (
    <>
      <button onClick={showFilterArr}>
        {filterSection ? "ukryj" : "rozwiń"}
      </button>
      {filterForm}
      {filterSection && filterArr}
    </>
  );
};

export default FileterArr;
