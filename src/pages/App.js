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
  const reset = () => {
    localStorage.removeItem("userDishes");
    localStorage.removeItem("allDishes");
    localStorage.removeItem("filterArr");
    localStorage.removeItem("userFilterArr");
  };

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

  const checkBanStatus = () => {
    console.log("sprawdzam");

    const dishes = [...allDishes];
    const banDishes = dishes.filter(
      (element) => element.ban.status && element.ban.howLong !== "permament"
    );
    if (banDishes.length !== 0) {
      let date = new Date().getTime();

      banDishes.forEach((element) => {
        if (date - (element.ban.howLong + element.ban.sinceWhen) > 0) {
          element.ban.status = false;
          element.ban.sinceWhen = "";
          element.ban.howLong = "";

          const index = dishes.findIndex((elem) => elem.id === element.id);
          dishes[index] = element;
          setAllDishes(dishes);
          setAllDishesStorage(dishes);
          let userDishesArray = [];
          const filtersArray =
            JSON.parse(localStorage.getItem("userFilterArr")) || null;
          if (filtersArray) {
            const activeFilters = filtersArray.filter((item) => item.active);
            let flag = false;
            let showMe = element.ingredient.forEach((item) => {
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
                return userDishesArray;
              });
              setUserStorage(userDishesArray);
            }
          } else {
            setUserDishes((prevValue) => {
              userDishesArray = [...prevValue, element];
              return userDishesArray;
            });
            setUserStorage(userDishesArray);
          }
        }
      });
    }
  };

  useEffect(() => {
    window.setInterval(checkBanStatus, 6000);
  }, []);

  const updateUserDishes = (arr) => {
    setUserDishes(arr);
    setUserStorage(arr);
  };
  const banDish = (id, time, howLong) => {
    const dishes = userDishes ? [...userDishes] : [...allDishes];
    const dishIndex = dishes.findIndex((elem) => elem.id === id);
    const dish = dishes[dishIndex];
    dish.ban = {
      status: true,
      sinceWhen: time,
      howLong,
    };
    setUserDishes(dishes.filter((element) => !element.ban.status));
    setUserStorage(dishes.filter((element) => !element.ban.status));
    setAllDishesStorage(dishes);
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
    />
  );

  const updateAllDishes = (dish) => {
    const allDishesArr = [...allDishes];
    allDishesArr.push(dish);
    setAllDishes(allDishesArr);
    setAllDishesStorage(allDishesArr);
  };
  const setUserStorage = (arr) => {
    localStorage.setItem("userDishes", JSON.stringify(arr));
  };
  const setAllDishesStorage = (arr) => {
    localStorage.setItem("allDishes", JSON.stringify(arr));
  };

  console.log(selectedDish);
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
    <p>Liczba potraw do wylosowania ({getDishesArray().length})</p>
  );

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <RemoveStorage />
          <NavLink to="/addDish">Dodaj swój przepis</NavLink>
          <button onClick={reset}>usuń pamięć</button>
          <p>co masz w lodówce</p>
          {UserProductsSection}

          <p>powiedz nam czego Ci nie pokazywać</p>
          {fileterSection}
          {dishesCounter}

          <h1>wylosowana potrawa to:</h1>
          <DrawnDishList
            selectedDish={selectedDish}
            setSelectedDish={setSelectedDish}
            customedArr={getDishesArray()}
            banDish={banDish}
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
