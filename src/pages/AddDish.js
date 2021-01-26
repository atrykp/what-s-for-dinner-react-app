import React from "react";
import "../styles/AddDish.css";

const AddDish = () => {
  return (
    <form action="" className="addDish">
      <input type="text" placeholder="wpisz nazwę" />
      <input type="text" placeholder="podaj opis" />
      <p>Podaj składniki</p>
      <input type="text" placeholder="składnik" />
      <input type="number" placeholder="ilość" />
      <button>dodaj kolejny składnik</button>
      <p>Opisz sposób przyrządzenia</p>
      <input type="text" placeholder="opisz krok pierwszy" />
      <button>dodaj kolejny krok</button>
    </form>
  );
};
export default AddDish;
