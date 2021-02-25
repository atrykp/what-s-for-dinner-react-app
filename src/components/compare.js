// checks if dish can be added
import { setLocalStorage } from "../pages/App";

export const compare = (element, setUserMeals, allMeals) => {
  let userMealsArray = [];
  // pobranie aktualnych filtrów użytkownika
  const filtersArray =
    JSON.parse(localStorage.getItem("userFilterArr")) || null;
  // jeżeli jakieś są
  if (filtersArray) {
    // aktywne filtry
    const activeFilters = filtersArray.filter((item) => item.active);
    let flag = false;
    // element czyli danie aktualnie sprawdzane jego składniki jeden po drugim
    element.ingredient.forEach((item) => {
      //porównanie każdego filtra aktywnego ze składnikiem jeżeli nazwa składnika będzie zgodna z nazwą aktywnego filtra flaga na true
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
