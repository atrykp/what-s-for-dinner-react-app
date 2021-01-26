import { useEffect, useState } from "react";
import "../styles/App.css";
import FilterArr from "./FileterArr";
import DrawnDishList from "./DrawnDishList";
import AddDish from "./AddDish";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
} from "react-router-dom";
let mainArr = [
  {
    nazwa: "Serowa petarda",
    skladniki: [
      { name: "ser", quantity: "250g" },
      { name: "szynka", quantity: "100g" },
      { name: "pieczarki", quantity: "400g" },
    ],
    opis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    kroki: [
      { krok1: "Lorem ipsum dolor sit amet" },
      { krok2: "Lorem ipsum dolor sit amet," },
    ],
    id: 1,
    ban: {
      status: false,
      howLong: "",
      sinceWhen: "",
    },
  },
  {
    nazwa: "Kotlet z ziemniakami",
    skladniki: [
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
  {
    nazwa: "Pierogi",
    skladniki: [
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
];
function App() {
  const reset = () => {
    localStorage.removeItem("userDishes");
    localStorage.removeItem("allDishes");
  };
  reset();

  const [allDishes, setAllDishes] = useState(
    JSON.parse(localStorage.getItem("allDishes")) || [...mainArr]
  );
  const [userDishes, setUserDishes] = useState(
    JSON.parse(localStorage.getItem("userDishes")) || null
  );
  // sprawdzaj dla wielu a nie tylko dla jednej potrawy
  const checkBanStatus = () => {
    const dishes = [...allDishes];
    const banDishes = dishes.filter(
      (element) => element.ban.status && element.ban.howLong !== "permament"
    );
    if (banDishes.length !== 0) {
      let date = new Date().getTime();

      banDishes.forEach((element) => {
        if (
          element.ban.howLong !== "permament" &&
          date - (element.ban.howLong + element.ban.sinceWhen) > 0
        ) {
          element.ban.status = false;
          element.ban.sinceWhen = "";
          element.ban.howLong = "";

          const index = dishes.findIndex((elem) => elem.id === element.id);
          dishes[index] = element;
          setAllDishes(dishes);
          let userDishesArray = [];
          const filtersArray =
            JSON.parse(localStorage.getItem("filterArr")) || null;
          if (filtersArray) {
            const activeFilters = filtersArray.filter((item) => item.active);
            let flag = false;
            let showMe = element.skladniki.forEach((item) => {
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

  const fileterSection = (
    <FilterArr
      userDishes={userDishes}
      allDishes={allDishes}
      updateUserDishes={updateUserDishes}
    />
  );
  const dishesCounter = (
    <p>
      Liczba potraw do wylosowania (
      {userDishes ? userDishes.length : allDishes.length})
    </p>
  );
  const setUserStorage = (arr) => {
    console.log(arr);

    localStorage.setItem("userDishes", JSON.stringify(arr));
  };
  const setAllDishesStorage = (arr) => {
    localStorage.setItem("allDishes", JSON.stringify(arr));
  };

  return (
    <Router>
      <NavLink to="/addDish">hello</NavLink>
      <Route path="/addDish" component={AddDish} />

      <button onClick={reset}>usuń pamięć</button>
      <p>powiedz nam czego Ci nie pokazywać</p>
      {fileterSection}
      {dishesCounter}

      <h1>wylosowana potrawa to:</h1>
      <DrawnDishList
        customedArr={userDishes ? userDishes : allDishes}
        banDish={banDish}
      />
    </Router>
  );
}

export default App;
