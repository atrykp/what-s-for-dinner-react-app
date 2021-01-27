import React, { useState } from "react";
import "../styles/AddDish.css";

const AddDish = () => {
  const [dish, setDish] = useState({
    name: "",
    ingredient: [{ name: "", quantity: "" }],
    description: "",
    steps: [{ number: "", value: "" }],
    id: 1,
    ban: {
      status: false,
      howLong: "",
      sinceWhen: "",
    },
  });

  const changeIngredientInputs = (e, index) => {
    const { name, value } = e.target;
    const element = { ...dish };
    element.ingredient[index][name] = value;
    setDish(element);
  };
  const addNewIngredientInputs = (e) => {
    const element = { ...dish };
    const arr = [...element.ingredient, { name: "", quantity: "" }];
    element.ingredient = arr;
    setDish(element);
  };
  const removeIngredient = (index) => {
    const dishObj = { ...dish };
    const ingredientArr = dishObj.ingredient;
    ingredientArr.splice(index, 1);
    setDish(dishObj);
  };
  const changeStepInput = (e, index) => {
    const { name, value } = e.target;
    const dishObj = { ...dish };
    const stepsArr = dishObj.steps;
    stepsArr[index][name] = value;
  };
  const saveDish = (e) => {
    e.preventDefault();
  };
  let stepsInputs = dish.steps.map((x, i) => {
    return (
      <div className="stepsBox">
        <span>{i + 1}.</span>
        <input type="text" placeholder="opisz krok" />
        <div className="stepsBtns">
          {dish.steps.length - 1 === i && <button>dodaj kolejny krok</button>}
          {dish.steps.length !== 1 && <button>Usuń</button>}
        </div>
      </div>
    );
  });

  let ingredientImputs = dish.ingredient.map((x, i) => {
    return (
      <div className="skladnikibox">
        <input
          type="text"
          placeholder="składnik"
          onChange={(e) => changeIngredientInputs(e, i)}
          name="name"
          value={x.name}
        />
        <input
          type="text"
          placeholder="ilość"
          onChange={(e) => changeIngredientInputs(e, i)}
          name="quantity"
          value={x.quantity}
        />
        <div className="buttons">
          {dish.ingredient.length !== 1 && (
            <button onClick={() => removeIngredient(i)}>Usuń</button>
          )}
          {dish.ingredient.length - 1 === i && (
            <button onClick={addNewIngredientInputs}>Dodaj</button>
          )}
        </div>
      </div>
    );
  });
  return (
    <form action="" className="addDish" onSubmit={saveDish}>
      <input type="text" placeholder="wpisz nazwę" />
      <input type="text" placeholder="podaj opis" />
      <p>Podaj składniki</p>
      {ingredientImputs}
      <p>Opisz sposób przyrządzenia</p>
      {stepsInputs}
    </form>
  );
};
export default AddDish;
