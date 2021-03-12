import { useEffect } from "react";
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
import { useMealsArray } from "../components/useMealsArray";
import EditDish from "../components/EditDish";

function App() {
  const dispatch = useDispatch();
  const mealsStore = useSelector((state) => state.mealsReducer);

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

  const mealsCounter = (
    <p>
      Liczba dań <span>{useMealsArray().length}</span>
    </p>
  );
  const mainPageStructure = (
    <div className="appWrapper">
      <div className="upperNav">
        <div className="upperNav__userProducts">
          <UserProducts />
        </div>
        <div className="upperNav__counter">{mealsCounter}</div>
        <div className="upperNav__filters">
          <NewFilterArr />
        </div>
      </div>
      <div>
        <DrawnDishList customedArr={useMealsArray()} />
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
          <BannedMeals />
        </Route>
        <Route path="/addDish">
          <AddDish />
        </Route>
        <Route path="/dish/:id">
          <Dish />
        </Route>
        <Route path="/edit/:id">
          <EditDish />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
