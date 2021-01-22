import React, { useState } from "react";

const FileterArr = ({ allDishes, setUserDishes }) => {
  const [customedArr, setCustomedArr] = useState("");
  console.log(customedArr);

  const handleChange = (e) => {
    const checked = e.target.checked;
    console.log(checked);

    const value = e.target.id;
    let arr = [...allDishes];
    let newArr = arr.filter((element) =>
      checked ? element.skladniki !== value : element
    );
    setCustomedArr(newArr);
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
