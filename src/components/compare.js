// checks if dish can be added
import { setLocalStorage } from "../pages/App";

export const compare = (element, setUserDishes, allDishes) => {
  let userDishesArray = [];
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
      setUserDishes((prevValue) => {
        userDishesArray = [...prevValue, element];
      });
      setLocalStorage(userDishesArray, "userDishes");
    }
  } else {
    setUserDishes((prevValue) => {
      if (prevValue) {
        userDishesArray = [...prevValue, element];
      } else {
        userDishesArray = [...allDishes, element];
      }
      return userDishesArray;
    });
    setLocalStorage(userDishesArray, "userDishes");
  }
};
