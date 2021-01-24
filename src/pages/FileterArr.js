import React, { useState } from "react";
import Filter from "../components/Filter";

const FileterArr = ({ allDishes, updateUserDishes }) => {
  const [filterName, setFilterName] = useState("");
  const [filter, setFileter] = useState([
    { name: "mieso", active: false, id: 2 },
    { name: "pierogi", active: false, id: 3 },
  ]);
  const [customedArr, setCustomedArr] = useState("");
  console.log(customedArr);

  const handleChange = (element) => {
    const checked = element.active;
    const value = element.name;
    if (checked) {
      let arr = customedArr ? [...customedArr] : [...allDishes];
      let newArr = arr.filter((element) =>
        checked ? element.skladniki !== value : element
      );
      setCustomedArr(newArr);
      updateUserDishes(newArr);
    } else {
      let arr = [...allDishes];
      let dish = arr.filter((element) => element.skladniki === value);
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
  const addNewFilter = (e) => {
    e.preventDefault();
    const newFilter = {
      name: filterName,
      active: true,
      id: Math.floor(Math.random() * 123),
    };
    handleChange(newFilter);
    setFileter([newFilter, ...filter]);
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
  };
  const handleInputValue = (e) => {
    const value = e.target.value;
    setFilterName(value);
  };

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
      <form action="" onSubmit={addNewFilter}>
        <input
          type="text"
          placeholder={"wpisz swój filtr"}
          onChange={handleInputValue}
          value={filterName}
        />
        <button onSubmit={addNewFilter}>dodaj</button>
      </form>
      {filterArr}
    </>
  );
};

export default FileterArr;
