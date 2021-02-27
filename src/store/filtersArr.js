import { mealsArr } from "./mealsArr";
import { v4 } from "uuid";
export const filtersArray = () => {
  let mealsArray = JSON.parse(localStorage.getItem("allMeals")) || mealsArr;
  const setElem = new Set();

  mealsArray.forEach((element) => {
    for (let i = 0; i < element.ingredient.length; i++) {
      if (
        !element.ingredient[i].name.includes("sól") &&
        element.ingredient[i].name.length > 0
      )
        setElem.add(element.ingredient[i].name);
    }
  });
  const arr = [...setElem];
  const filters = arr.map((element) => {
    return {
      name: element,
      active: false,
      id: v4(),
    };
  });
  return filters;
};
