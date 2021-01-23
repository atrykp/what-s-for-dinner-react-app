import React, { useState } from "react";
import Filter from "../components/Filter";

const FileterArr = ({ userDishes, allDishes, setUserDishes }) => {
  const [filter, setFileter] = useState([
    { name: "ser", active: true, id: 1 },
    { name: "mięso", active: false, id: 2 },
    { name: "pierogi", active: false, id: 3 },
  ]);
  const [customedArr, setCustomedArr] = useState("");

  const handleChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.id;
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
  };
  const filterArr = filter.map((element) => <Filter filter={element} />);
  return (
    <>
      {filterArr}
      <form action="">
        <label htmlFor="ser">
          <input type="checkbox" id={"ser"} onChange={handleChange} />
          ser
        </label>
        <label htmlFor="mieso">
          <input type="checkbox" id={"mieso"} onChange={handleChange} />
          mięso
        </label>
        <label htmlFor="pierogi">
          <input type="checkbox" id={"pierogi"} onChange={handleChange} />
          pierogi
        </label>
      </form>
      <button onClick={() => setUserDishes(customedArr)}>zapisz zmiany</button>
    </>
  );
};

export default FileterArr;
