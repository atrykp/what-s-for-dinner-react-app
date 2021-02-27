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
import checkBanStatus from "../components/checkBanStatus";
import BannedMeals from "./BannedMeals";
import MoreMenu from "../components/MoreMenu";
import { compare } from "../components/compare";

import { useDispatch, useSelector } from "react-redux";
import { changeBanStatus } from "../actions/actions";
import NewFilterArr from "../pages/NewFilterArr";

export const setLocalStorage = (arr, name) => {
  localStorage.setItem(name, JSON.stringify(arr));
};

function App() {
  const dispatch = useDispatch(changeBanStatus);
  const mealsStore = useSelector((state) => state.mealsReducer);
  const [allMeals, setAllMeals] = useState(
    JSON.parse(localStorage.getItem("allMeals")) || mealsStore
  );

  const [matchMeals, setMatchMeals] = useState([]);
  const [isUserProductsActive, setIsUserProductsActive] = useState(false);
  const [selectedDish, setSelectedDish] = useState(
    JSON.parse(localStorage.getItem("selectedDish")) || ""
  );

  useEffect(() => {
    const banInterval = setInterval(() => {
      checkBanStatus(allMeals, setAllMeals, setLocalStorage, removeBanStatus);
    }, 6000);
    return () => {
      clearInterval(banInterval);
    };
  }, [allMeals]);

  const removeBanStatus = (dish) => {
    dispatch(
      changeBanStatus(dish.id, { status: false, howLong: "", sinceWhen: "" })
    );
  };

  const UserProductsSection = (
    <UserProducts
      setSelectedDish={setSelectedDish}
      allMeals={allMeals}
      setMatchMeals={setMatchMeals}
      setIsUserProductsActive={setIsUserProductsActive}
    />
  );

  const fileterSection = <NewFilterArr />;

  const getMealsArray = () => {
    if (isUserProductsActive) {
      return matchMeals;
    }
    let arr = mealsStore.filter((element) => !element.ban.status);

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
        <div className="upperNav__userProducts">{UserProductsSection}</div>
        <div className="upperNav__counter">{mealsCounter}</div>
        <div className="upperNav__filters">{fileterSection}</div>
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
      </Switch>
    </Router>
  );
}

export default App;
