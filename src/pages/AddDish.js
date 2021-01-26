import React, { useState } from "react";
import "../styles/AddDish.css";

const AddDish = () => {
  const [dish, setDish] = useState({
    name: "",
    skladniki: [{ name: "", quantity: "" }],
    opis: "",
    kroki: [{ number: "", value: "" }],
    id: 1,
    ban: {
      status: false,
      howLong: "",
      sinceWhen: "",
    },
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    console.log(index);
    const element = { ...dish };
    element.skladniki[index][name] = value;
    setDish(element);
  };
  const addNewInputs = (e) => {
    const element = { ...dish };
    const arr = [...element.skladniki, { name: "", quantity: "" }];
    element.skladniki = arr;
    setDish(element);
  };

  let imputs = dish.skladniki.map((x, i) => {
    return (
      <div className="skladnikibox">
        <input
          type="text"
          placeholder="składnik"
          onChange={(e) => handleInputChange(e, i)}
          name="name"
          value={x.name}
        />
        <input
          type="number"
          placeholder="ilość"
          onChange={(e) => handleInputChange(e, i)}
          name="quantity"
          value={x.quantity}
        />
        <div className="buttons">
          {dish.skladniki.length !== 1 && <button>Usuń</button>}
          {dish.skladniki.length - 1 === i && (
            <button onClick={addNewInputs}>Dodaj</button>
          )}
        </div>
      </div>
    );
  });
  return (
    <form action="" className="addDish">
      <input type="text" placeholder="wpisz nazwę" />
      <input type="text" placeholder="podaj opis" />
      <p>Podaj składniki</p>
      {imputs}
      <p>Opisz sposób przyrządzenia</p>
      <input type="text" placeholder="opisz krok pierwszy" />
      <button>dodaj kolejny krok</button>
    </form>
  );
};
export default AddDish;
