import { useState } from "react";
import "../styles/App.css";
import FilterArr from "./FileterArr";
import DrawnDishList from "./DrawnDishList";
let mainArr = [
  "Domowa pizza",
  "Serowa petarda",
  "Zapiekanka makaronowa z mięsem mielonym i cukinią",
  "Kotlet z ziemniakami",
  "Wytrawne naleśniki",
  "Makaron z cukinią i mascarpone",
  "Zapiekanka ziemniaczna",
  " Zupa warzywna",
  " Schab w sosie koperkowym",
  "Pierogi",
  "Krokiety po meksykańsku",
  "Kurczak w cieście z warzywami",
  "Gulasz",
  " Naleśniki",
  "Łazanki",
  "Rosół",
  "Chilli con carne",
  "Zapiekanka gyros",
  "Sałatka  z kurczakiem",
  "Mielone",
];
function App() {
  const [allDishes, setAllDishes] = useState(mainArr);
  const [userDishes, setUserDishes] = useState("");
  const [filterSection, setFilterSection] = useState(false);

  const showFilterArr = () => {
    setFilterSection((prevValue) => !prevValue);
  };

  const fileterSection = filterSection && <FilterArr />;
  return (
    <>
      <p>powiedz nam czego Ci nie pokazywać</p>
      <button onClick={showFilterArr}>
        {filterSection ? "ukryj" : "rozwiń"}
      </button>
      {fileterSection}
      <h1>wylosowana potrawa to:</h1>
      <DrawnDishList customedArr={allDishes} />
    </>
  );
}

export default App;
