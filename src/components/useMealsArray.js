import { useSelector } from "react-redux";
const filterMeals = (arr, activeFilters, isUserProductsActive) => {
  const mealsArr = [];
  for (let i = 0; i < arr.length; i++) {
    let flag = false;
    for (let j = 0; j < arr[i].ingredient.length; j++) {
      if (activeFilters.indexOf(arr[i].ingredient[j].name) !== -1) {
        flag = true;
      }
    }
    if (isUserProductsActive && flag) {
      mealsArr.push(arr[i]);
    } else if (!isUserProductsActive && !flag) {
      mealsArr.push(arr[i]);
    }
  }
  return mealsArr;
};
const getActiveElements = (arr) => {
  let active = [];
  arr.forEach((element) => {
    if (element.active) {
      active.push(element.name);
    }
  });
  return active;
};

export const useMealsArray = () => {
  const mealsStore = useSelector((state) => state.mealsReducer);
  const filterStore = useSelector((state) => state.filtersReducer);
  const productsStore = useSelector((state) => state.productsReducer);
  const isSectionActive = useSelector((state) => state.activeSectionReducer);
  const { isUserProductsActive } = isSectionActive;
  let activeFilters = getActiveElements(filterStore);
  let activeProducts = getActiveElements(productsStore);

  // remove banned
  let arr = mealsStore.filter((element) => !element.ban.status);

  if (isUserProductsActive) {
    // if products section is active
    return filterMeals(arr, activeProducts, isUserProductsActive);
  }

  if (activeFilters.length > 0) {
    return filterMeals(arr, activeFilters, isUserProductsActive);
  }
  return arr;
};
