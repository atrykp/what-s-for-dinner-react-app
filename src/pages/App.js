import { useEffect, useState } from "react";
import "../styles/App.css";
import FilterArr from "./FileterArr";
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
import RemoveStorage from "./RemoveStorage";
import checkBanStatus from "../components/checkBanStatus";
import BannedDishes from "./BannedDishes";

let mainArr = [
  {
    name: "Serowa petarda",
    ingredient: [
      { name: "ser", quantity: "250g" },
      { name: "szynka", quantity: "100g" },
      { name: "pieczarki", quantity: "400g" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    steps: [{ number: "1", value: "weź i pokrój petardę" }],
    id: 1,
    ban: {
      status: false,
      howLong: "",
      sinceWhen: "",
    },
  },
  {
    name: "Pierogi",
    ingredient: [
      { name: "biały ser", quantity: "250g" },
      { name: "mąka", quantity: "100g" },
      { name: "ziemniaki", quantity: "400g" },
    ],
    id: 3,
    ban: {
      status: false,
      howLong: "",
      sinceWhen: "",
    },
  },
  {
    name: "Kotlet z ziemniakami",
    ingredient: [
      { name: "mieso", quantity: "300g" },
      { name: "ziemniaki", quantity: "100g" },
      { name: "surowka", quantity: "400g" },
    ],
    id: 2,
    ban: {
      status: false,
      howLong: "",
      sinceWhen: "",
    },
  },
];

function App() {
  const [allDishes, setAllDishes] = useState(
    JSON.parse(localStorage.getItem("allDishes")) || [...mainArr]
  );
  const [userDishes, setUserDishes] = useState(
    JSON.parse(localStorage.getItem("userDishes")) || null
  );
  const [matchDishes, setMatchDishes] = useState([]);
  const [isUserProductsActive, setIsUserProductsActive] = useState(false);
  const [selectedDish, setSelectedDish] = useState(
    JSON.parse(localStorage.getItem("selectedDish")) || ""
  );

  // checks if dish can be added
  const compare = (element) => {
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
      // jeżeli żaden aktywny filtr nie wyklucza składnika sprawdzanego elemetnu dodajemy element do tablicy
      // jakiś błąd is not iterable w 104 linii jak się zbanuje dwa i czeka się na ich powrót
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

  useEffect(() => {
    const banInterval = setInterval(() => {
      checkBanStatus(allDishes, setAllDishes, setLocalStorage, compare);
    }, 6000);
    return () => {
      clearInterval(banInterval);
    };
  }, [allDishes]);

  const updateUserDishes = (arr) => {
    setUserDishes(arr);
    setLocalStorage(arr, "userDishes");
  };
  const banDish = (id, time, howLong) => {
    const dishes = [...allDishes];
    const dishIndex = dishes.findIndex((elem) => elem.id === id);
    const dish = dishes[dishIndex];
    dish.ban = {
      status: true,
      sinceWhen: time,
      howLong,
    };
    setAllDishes(dishes);
    setLocalStorage(dishes, "allDishes");

    if (userDishes) {
      let arr = [...userDishes];
      const userDishIndex = arr.findIndex((element) => element.id === id);
      if (userDishIndex !== -1) {
        arr.splice(userDishIndex, 1);
        setUserDishes(arr);
        setLocalStorage(arr, "userDishes");
      }
    } else {
      const arrWithActive = dishes.filter((element) => !element.ban.status);
      setUserDishes(arrWithActive);
      setLocalStorage(arrWithActive, "userDishes");
    }
  };
  const UserProductsSection = (
    <UserProducts
      setSelectedDish={setSelectedDish}
      userDishes={userDishes}
      allDishes={allDishes}
      setMatchDishes={setMatchDishes}
      setIsUserProductsActive={setIsUserProductsActive}
    />
  );

  const fileterSection = (
    <FilterArr
      setSelectedDish={setSelectedDish}
      userDishes={userDishes}
      allDishes={allDishes}
      updateUserDishes={updateUserDishes}
      isUserProductsActive={isUserProductsActive}
    />
  );

  const updateAllDishes = (dish) => {
    const allDishesArr = [...allDishes];
    allDishesArr.push(dish);
    setAllDishes(allDishesArr);
    setLocalStorage(allDishesArr, "allDishes");
    compare(dish);
  };
  const setLocalStorage = (arr, name) => {
    localStorage.setItem(name, JSON.stringify(arr));
  };

  const getDishesArray = () => {
    if (isUserProductsActive) {
      return matchDishes;
    }
    if (userDishes) {
      return userDishes;
    } else {
      return allDishes;
    }
  };

  const dishesCounter = (
    <p>
      Liczba dań <span>{getDishesArray().length}</span>
    </p>
  );
  const mainPageStructure = (
    <>
      <div className="upperNav">
        <div className="upperNav__userProducts">{UserProductsSection}</div>
        <div className="upperNav__counter">{dishesCounter}</div>
        <div className="upperNav__filters">{fileterSection}</div>
      </div>
      <div className="drawnDish">
        <DrawnDishList
          selectedDish={selectedDish}
          setSelectedDish={setSelectedDish}
          customedArr={getDishesArray()}
          banDish={banDish}
          setIsUserProductsActive={setIsUserProductsActive}
        />
      </div>

      <div className="lowerNav">
        <NavLink to="/bannedDishes" className="lowerNav__banned">
          Baned
        </NavLink>
        <NavLink to="/addDish" className="lowerNav__add">
          Dodaj
        </NavLink>
        <RemoveStorage />
      </div>
    </>
  );

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {mainPageStructure}
        </Route>
        <Route path="/bannedDishes">
          <BannedDishes
            allDishes={allDishes}
            setAllDishes={setAllDishes}
            setLocalStorage={setLocalStorage}
            compare={compare}
          />
        </Route>
        <Route path="/addDish">
          <AddDish updateAllDishes={updateAllDishes} />
        </Route>
        <Route path="/dish/:id">
          <Dish selectedDish={selectedDish} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
