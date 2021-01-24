import React, { useState } from "react";
import Filter from "../components/Filter";

const FileterArr = ({ allDishes, updateUserDishes }) => {
  console.log("jestem w filter");
  const [filterSection, setFilterSection] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filter, setFileter] = useState(
    JSON.parse(localStorage.getItem("filterArr")) || []
  );
  const [customedArr, setCustomedArr] = useState("");
  console.log(customedArr);
  const showFilterArr = () => {
    setFilterSection((prevValue) => !prevValue);
  };
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
    let filters = [...filter];
    const elementId = filters.findIndex((elem) => elem.id === id);
    filters[elementId].active = !filters[elementId].active;
    handleChange(filters[elementId]);
    setFileter(filters);
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
    const allFilters = [newFilter, ...filter];
    setFileter(allFilters);
    setFilterStorage(allFilters);
    setFilterName("");
  };
  const removeFilter = (id) => {
    let filters = [...filter];
    const elementId = filters.findIndex((elem) => elem.id === id);
    const element = filters[elementId];
    if (element.active) {
      element.active = false;
      handleChange(element);
    }
    filters.splice(elementId, 1);
    setFileter(filters);
    setFilterStorage(filters);
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

  const filterArr = filter.map((element) => (
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
