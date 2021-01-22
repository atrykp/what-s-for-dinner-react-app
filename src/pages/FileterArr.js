import React, { useState } from "react";
// przefiltrować tablice z ustwionymi filtrami przekaza

const FileterArr = ({ userDishes, allDishes, setUserDishes }) => {
  const [filter, setFileter] = useState([]);
  const [customedArr, setCustomedArr] = useState("");
  console.log(customedArr);

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
  return (
    <>
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
      <button onClick={() => setUserDishes(allDishes)}>zapisz zmiany</button>
    </>
  );
};

export default FileterArr;
