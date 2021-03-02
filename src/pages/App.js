import { useEffect, useState } from "react";
import "../styles/App.css";

import DrawnDishList from "./DrawnDishList";
import AddDish from "./AddDish";
import Dish from "./Dish";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import UserProducts from "./UserProducts";
import BannedMeals from "./BannedMeals";
import MoreMenu from "../components/MoreMenu";
import { useDispatch, useSelector } from "react-redux";
import { changeBanStatus } from "../actions/actions";
import NewFilterArr from "../pages/NewFilterArr";
import EditDish from "../components/EditDish";

export const setLocalStorage = (arr, name) => {
  localStorage.setItem(name, JSON.stringify(arr));
};

function App() {
  const dispatch = useDispatch();
  const mealsStore = useSelector((state) => state.mealsReducer);
  const filterStore = useSelector((state) => state.filtersReducer);
  const productsStore = useSelector((state) => state.productsReducer);
  const [allMeals, setAllMeals] = useState(
    JSON.parse(localStorage.getItem("allMeals")) || mealsStore
  );
  const [isUserProductsActive, setIsUserProductsActive] = useState(false);
  const [selectedDish, setSelectedDish] = useState(
    JSON.parse(localStorage.getItem("selectedDish")) || ""
  );

  useEffect(() => {
    const banInterval = setInterval(() => {
      checkBanStatus();
    }, 6000);
    return () => {
      clearInterval(banInterval);
    };
  }, []);

  const removeBanStatus = (dish) => {
    dispatch(
      changeBanStatus(dish.id, { status: false, howLong: "", sinceWhen: "" })
    );
  };

  const checkBanStatus = () => {
    const banMeals = mealsStore.filter(
      (element) => element.ban.status && element.ban.howLong !== "permament"
    );
    if (banMeals.length !== 0) {
      let date = new Date().getTime();
      banMeals.forEach((element) => {
        if (date - (element.ban.howLong + element.ban.sinceWhen) > 0) {
          removeBanStatus(element);
        }
      });
    }
  };

  const filterMeals = (arr, activeFilters) => {
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
  const getMealsArray = () => {
    let activeFilters = getActiveElements(filterStore);
    let activeProducts = getActiveElements(productsStore);

    // remove banned
    let arr = mealsStore.filter((element) => !element.ban.status);

    if (isUserProductsActive) {
      // if products section is active
      return filterMeals(arr, activeProducts);
    }

    if (activeFilters.length > 0) {
      return filterMeals(arr, activeFilters);
    }
    return arr;
  };

  const mealsCounter = (
    <p>
      Liczba dań <span>{getMealsArray().length}</span>
    </p>
  );
  const mainPageStructure = (
    <div className="appWrapper">
      <div className="upperNav">
        <div className="upperNav__userProducts">
          <UserProducts setIsUserProductsActive={setIsUserProductsActive} />
        </div>
        <div className="upperNav__counter">{mealsCounter}</div>
        <div className="upperNav__filters">
          <NewFilterArr />
        </div>
      </div>
      <div>
        <DrawnDishList
          selectedDish={selectedDish}
          setSelectedDish={setSelectedDish}
          customedArr={getMealsArray()}
          setIsUserProductsActive={setIsUserProductsActive}
        />
      </div>

      <div className="lowerNav">
        <NavLink to="/addDish" className="lowerNav__add">
          <i className="fas fa-plus-circle"></i>
        </NavLink>
        <div className="menu">
          <MoreMenu />
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {mainPageStructure}
        </Route>
        <Route path="/bannedMeals">
          <BannedMeals setLocalStorage={setLocalStorage} />
        </Route>
        <Route path="/addDish">
          <AddDish />
        </Route>
        <Route path="/dish/:id">
          <Dish selectedDish={selectedDish} />
        </Route>
        <Route path="/edit/:id">
          <EditDish
            selectedDish={selectedDish}
            allMeals={allMeals}
            setAllMeals={setAllMeals}
            setSelectedDish={setSelectedDish}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
