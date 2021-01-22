import { useState } from "react";
import "../styles/App.css";
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

  return (
    <>
      <h1>wylosowana potrawa to:</h1>
      <DrawnDishList customedArr={allDishes} />
    </>
  );
}

export default App;
