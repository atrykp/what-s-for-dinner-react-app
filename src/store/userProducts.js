import { mealsArr } from "./mealsArr";
import { v4 } from "uuid";
export const userProducts = () => {
  let localStore = JSON.parse(localStorage.getItem("state"));

  let mealsArray = localStore
    ? JSON.parse(localStorage.getItem("state")).mealsReducer
    : mealsArr;
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
  const products = arr.map((element) => {
    return {
      name: element,
      active: false,
      id: v4(),
    };
  });
  return products;
};
