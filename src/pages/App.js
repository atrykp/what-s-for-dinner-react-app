import { useState } from "react";
import "../styles/App.css";
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
  const [drawedDish, setDrawedDish] = useState("");
  let notYetArr;

  const handleDraw = () => {
    notYetArr = [...allDishes];
    let index = Math.floor(Math.random() * notYetArr.length);
    setDrawedDish(notYetArr[index]);
    notYetArr.slice(index, 1);
    setAllDishes(notYetArr);
  };
  return (
    <>
      <button onClick={handleDraw}>Losuj</button>
      <h1>wylosowana potrawa to:</h1>
      <p>{drawedDish}</p>
    </>
  );
}

export default App;
