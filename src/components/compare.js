import { setLocalStorage } from "../pages/App";

export const compare = (element, setUserMeals, allMeals) => {
  let userMealsArray = [];

  const filtersArray =
    JSON.parse(localStorage.getItem("userFilterArr")) || null;

  if (filtersArray) {
    const activeFilters = filtersArray.filter((item) => item.active);
    let flag = false;

    element.ingredient.forEach((item) => {
      activeFilters.forEach((elem) => {
        if (elem.name === item.name) {
          console.log("przefiltrowane");
          flag = true;
        }
      });
    });

    if (!flag) {
      setUserMeals((prevValue) => {
        userMealsArray = [...prevValue, element];
      });
      setLocalStorage(userMealsArray, "userMeals");
    }
  } else {
    setUserMeals((prevValue) => {
      if (prevValue) {
        userMealsArray = [...prevValue, element];
      } else {
        userMealsArray = [...allMeals, element];
      }
      return userMealsArray;
    });
    setLocalStorage(userMealsArray, "userMeals");
  }
};
