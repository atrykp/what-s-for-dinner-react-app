import React, { useState } from "react";
import Filter from "../components/Filter";

const FileterArr = ({ userDishes, allDishes, setUserDishes }) => {
  const [filter, setFileter] = useState([
    { name: "ser", active: false, id: 1 },
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
    } else {
      let arr = [...allDishes];
      let dish = arr.filter((element) => element.skladniki === value);
      setCustomedArr([...dish, ...customedArr]);
    }
    setUserDishes(customedArr);
  };
  const changeFilterActivity = (id) => {
    let filters = [...filter];
    const elementId = filters.findIndex((elem) => elem.id === id);
    filters[elementId].active = !filters[elementId].active;
    handleChange(filters[elementId]);
    setFileter(filters);
  };
  const filterArr = filter.map((element) => (
    <Filter
      filter={element}
      changeFilterActivity={changeFilterActivity}
      key={element.id}
    />
  ));
  return <>{filterArr}</>;
};

export default FileterArr;
