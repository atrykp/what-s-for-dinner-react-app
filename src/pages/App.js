import { useEffect, useState } from "react";
import "../styles/App.css";
import FilterArr from "./FileterArr";
import DrawnDishList from "./DrawnDishList";
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
  const [allDishes, setAllDishes] = useState([...mainArr]);
  const [userDishes, setUserDishes] = useState(null);
  const [filterSection, setFilterSection] = useState(false);

  const checkBanStatus = () => {
    const dishes = [...allDishes];
    const banDishes = dishes.filter(
      (element) => element.ban.status && element.ban.howLong !== "permament"
    );
    if (banDishes.length !== 0) {
      let date = new Date().getTime();
      console.log(banDishes);

      banDishes.forEach((element) => {
        console.log(element);

        if (
          element.ban.howLong !== "permament" &&
          date - (element.ban.howLong + element.ban.sinceWhen) > 0
        ) {
          console.log("jestem w ifie");

          element.ban.status = false;
          const index = dishes.findIndex((elem) => elem.id === element.id);
          dishes[index] = element;
          setAllDishes(dishes);
          setUserDishes(dishes);
        }
      });
    }
  };
  useEffect(() => {
    window.setInterval(checkBanStatus, 6000);
  }, []);

  const showFilterArr = () => {
    setFilterSection((prevValue) => !prevValue);
  };
  const updateUserDishes = (arr) => {
    setUserDishes(arr);
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
  };

  const fileterSection = filterSection && (
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
  return (
    <>
      <p>powiedz nam czego Ci nie pokazywać</p>
      <button onClick={showFilterArr}>
        {filterSection ? "ukryj" : "rozwiń"}
      </button>
      {fileterSection}
      {dishesCounter}

      <h1>wylosowana potrawa to:</h1>
      <DrawnDishList
        customedArr={userDishes ? userDishes : allDishes}
        banDish={banDish}
      />
    </>
  );
}

export default App;
