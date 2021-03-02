import React, { useState } from "react";
import "../styles/EditDish.css";

const EditDish = ({
  selectedDish,
  allMeals,
  setAllMeals,
  setSelectedDish,
  userMeals,
  setUserMeals,
}) => {
  const { name } = selectedDish;
  const [dish, setDish] = useState({ ...selectedDish });
  const handleChange = (e) => {
    setDish({ ...selectedDish, name: e.target.value });
  };
  const saveChanges = () => {
    setSelectedDish(dish);
    let allMealsIndex = findDishIndex(dish.id, allMeals);
    const allArr = [...allMeals];
    allArr[allMealsIndex].name = dish.name;
    setAllMeals(allArr);
    if (userMeals.length > 0) {
      let userMealsIndex = findDishIndex(dish.id, userMeals);
      const userArr = [...userMeals];
      userArr[userMealsIndex].name = dish.name;
      setUserMeals(userArr);
    }
  };
  const findDishIndex = (id, arr) => {
    return arr.findIndex((element) => element.id === id);
  };
  return (
    <div className="editDish">
      <div className="editDish__name">
        <h2>{name}</h2>
        <input
          type="text"
          value={dish.name}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={saveChanges}>Zapisz</button>
      </div>
    </div>
  );
};

export default EditDish;
