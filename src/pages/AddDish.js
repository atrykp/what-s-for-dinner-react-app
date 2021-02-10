import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AddDish.css";

const validation = (dish) => {
  if (dish.name.trim().length < 2) {
    return "Nazwa jest obowiązkowa";
  }
  return null;
};

const AddDish = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let dishObj = { ...dish };
    dishObj[name] = value;
    setDish(dishObj);
  };

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
    dishObj.steps[index].number = index + 1;
    dishObj.steps[index][name] = value;
    setDish(dishObj);
  };
  const addStepsInput = () => {
    const dishObj = { ...dish };
    const stepsArr = [...dishObj.steps, { number: "", value: "" }];
    dishObj.steps = stepsArr;
    setDish(dishObj);
  };
  const removeStep = (index) => {
    const dishObj = { ...dish };
    const stepsArr = [...dishObj.steps];
    stepsArr.splice(index, 1);
    dishObj.steps = stepsArr;
    setDish(dishObj);
  };
  const saveDish = (e) => {
    e.preventDefault();
    const message = validation(dish);
    if (message) {
      setErrorMsg(message);

      return;
    } else {
      setErrorMsg("");
    }
    props.updateAllDishes(dish);
    setDish({
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
  };
  let stepsInputs = dish.steps.map((x, i) => {
    return (
      <div className="stepsBox">
        <span>{i + 1}.</span>
        <input
          type="text"
          placeholder="opisz krok"
          onChange={(e) => changeStepInput(e, i)}
          value={x.value}
          name="value"
        />
        <div className="stepsBtns">
          {dish.steps.length - 1 === i && (
            <button onClick={addStepsInput}>dodaj kolejny krok</button>
          )}
          {dish.steps.length !== 1 && (
            <button onClick={() => removeStep(i)}>Usuń</button>
          )}
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
    <>
      <Link to="/">Ukryj</Link>
      <form action="" className="addDish" onSubmit={saveDish}>
        <input
          type="text"
          placeholder="wpisz nazwę"
          onChange={handleInputChange}
          value={dish.name}
          name="name"
        />
        {errorMsg && <p>{errorMsg}</p>}
        <input
          type="text"
          placeholder="podaj opis"
          onChange={handleInputChange}
          value={dish.description}
          name="description"
        />
        <p>Podaj składniki</p>
        {ingredientImputs}
        <p>Opisz sposób przyrządzenia</p>
        {stepsInputs}
        <button onSubmit={saveDish}>Zapisz przepis</button>
      </form>
    </>
  );
};
export default AddDish;
