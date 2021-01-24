import { useState } from "react";
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
    id: "123",
  },
  {
    nazwa: "Kotlet z ziemniakami",
    skladniki: [
      { name: "mieso", quantity: "300g" },
      { name: "ziemniaki", quantity: "100g" },
      { name: "surowka", quantity: "400g" },
    ],
  },
  {
    nazwa: "Pierogi",
    skladniki: [
      { name: "biały ser", quantity: "250g" },
      { name: "mąka", quantity: "100g" },
      { name: "ziemniaki", quantity: "400g" },
    ],
  },
];
function App() {
  const [allDishes, setAllDishes] = useState(mainArr);
  const [userDishes, setUserDishes] = useState(null);
  const [filterSection, setFilterSection] = useState(false);
  console.log(userDishes);

  const showFilterArr = () => {
    setFilterSection((prevValue) => !prevValue);
  };
  const updateUserDishes = (arr) => {
    setUserDishes(arr);
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
      <DrawnDishList customedArr={userDishes ? userDishes : allDishes} />
    </>
  );
}

export default App;
