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
      if (!flag) {
        setUserDishes((prevValue) => {
          userDishesArray = [...prevValue, element];
        });
        setUserStorage(userDishesArray);
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
      setUserStorage(userDishesArray);
    }
  };

  useEffect(() => {
    const banInterval = setInterval(
      () =>
        checkBanStatus(
          allDishes,
          setAllDishes,
          setAllDishesStorage,
          setUserDishes,
          setUserStorage,
          compare
        ),
      6000
    );
    return () => clearInterval(banInterval);
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
    compare(dish);
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
            setIsUserProductsActive={setIsUserProductsActive}
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
