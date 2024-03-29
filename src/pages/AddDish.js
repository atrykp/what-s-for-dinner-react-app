import React, { createRef, useState } from "react";
import { Prompt } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/AddDish.css";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { addDish } from "../actions/actions";
import Modal from "../components/Modal";

const validation = (dish) => {
  if (dish.name.trim().length < 2) {
    return "Nazwa jest obowiązkowa";
  }
  return null;
};
const addTxt = "Przepis został dodany";

const AddDish = () => {
  const nameDishInput = createRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [modalView, setModalView] = useState(false);
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
  const dispatch = useDispatch();

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
    const arr = [...element.ingredient, { name: "", quantity: "", id: v4() }];
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
    const stepsArr = [...dishObj.steps, { number: "", value: "", id: v4() }];
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
      nameDishInput.current.focus();
      return;
    } else {
      setErrorMsg("");
    }
    const completeDish = dish;
    completeDish.id = v4();

    dispatch(addDish(completeDish));
    // ------------------------------------------------

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
    setModalView(true);
  };

  let stepsInputs = dish.steps.map((x, i) => {
    return (
      <div className="addDishForm__stepsBox" key={x.id}>
        <span className="addDishForm__txt">{i + 1}.</span>
        <input
          className="addDishForm__stepInput"
          type="text"
          placeholder="opisz krok"
          onChange={(e) => changeStepInput(e, i)}
          value={x.value}
          name="value"
        />
        <div className="addDishForm__stepsBtns">
          {dish.steps.length - 1 === i && (
            <button onClick={addStepsInput} className="addDishForm__stepsBtn">
              dodaj krok
            </button>
          )}
          {dish.steps.length !== 1 && (
            <button
              onClick={() => removeStep(i)}
              className="addDishForm__stepsBtn"
            >
              Usuń
            </button>
          )}
        </div>
      </div>
    );
  });

  let ingredientImputs = dish.ingredient.map((x, i) => {
    return (
      <div className="addDishForm__ingredientsBox" key={x.id}>
        <input
          className="addDishForm__ingredientsInput"
          type="text"
          placeholder="składnik"
          onChange={(e) => changeIngredientInputs(e, i)}
          name="name"
          value={x.name}
        />
        <input
          className="addDishForm__ingredientsInput"
          type="text"
          placeholder="ilość"
          onChange={(e) => changeIngredientInputs(e, i)}
          name="quantity"
          value={x.quantity}
        />
        <div className="addDishForm__ingredientsBtns">
          {dish.ingredient.length !== 1 && (
            <button
              onClick={() => removeIngredient(i)}
              className="addDishForm__ingredientsBtn"
            >
              Usuń
            </button>
          )}
          {dish.ingredient.length - 1 === i && (
            <button
              onClick={addNewIngredientInputs}
              className="addDishForm__ingredientsBtn"
            >
              Dodaj
            </button>
          )}
        </div>
      </div>
    );
  });
  const setView = (status) => {
    setModalView(status);
  };
  const modal = modalView && <Modal txt={addTxt} setView={setView} />;
  return (
    <>
      <div className="addDish">
        <Prompt
          when={
            dish.name ||
            dish.description ||
            dish.ingredient[0].name ||
            dish.steps[0].value
          }
          message="Czy na pewno chcesz opuścić stronę?"
        />
        {modal}
        <Link className="backBtn" to="/">
          Wróć
        </Link>
        <form action="" className="addDishForm" onSubmit={saveDish}>
          <input
            className="addDishForm__txtInput"
            ref={nameDishInput}
            type="text"
            placeholder="Nazwa"
            onChange={handleInputChange}
            value={dish.name}
            name="name"
          />
          {errorMsg && <p>{errorMsg}</p>}
          <textarea
            className="addDishForm__txtArea"
            type="text"
            placeholder="Opis"
            onChange={handleInputChange}
            value={dish.description}
            name="description"
          />
          <p className="addDishForm__txt">Podaj składniki</p>
          {ingredientImputs}
          <p className="addDishForm__txt">Opisz sposób przyrządzenia</p>
          {stepsInputs}
          <button className="addDishForm__submitBtn" onSubmit={saveDish}>
            Zapisz przepis
          </button>
        </form>
      </div>
    </>
  );
};
export default AddDish;
