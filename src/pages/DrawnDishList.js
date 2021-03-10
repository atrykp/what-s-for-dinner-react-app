import { useState } from "react";
import { v4 } from "uuid";
import "../styles/DrawnDishList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBanStatus,
  changeIsSelected,
  changeActiveStatus,
  removeShoppingList,
} from "../actions/actions";
import DrawnDish from "../components/DrawnDish";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const DrawnDishList = ({ customedArr }) => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.shoppingListReducer);
  const mealsStore = useSelector((state) => state.mealsReducer);
  const isSelectedDish = [...mealsStore].filter(
    (element) => element.isSelected
  );
  const isSectionActive = useSelector((state) => state.activeSectionReducer);
  const { ingredientsView, productsView } = isSectionActive;

  const [drawnDish, setDrawnDish] = useState("");

  const setSelectedDishReducer = (id, status) => {
    dispatch(changeIsSelected(id, status));
  };

  const showDish = isSelectedDish.length > 0 ? isSelectedDish[0] : drawnDish;

  const getDate = () => {
    let date = new Date();
    return date.getTime();
  };

  const banDish = (id, time, howLong) => {
    dispatch(changeBanStatus(id, { status: true, howLong, sinceWhen: time }));
  };

  const handleDraw = () => {
    let notYetArr = [...customedArr];

    if (notYetArr.length < 1) {
      return alert("Brak dań do losowania");
    }
    if (isSelectedDish.length > 0) {
      const { id, isSelected } = isSelectedDish[0];
      setSelectedDishReducer(id, isSelected);
    }

    let index = Math.floor(Math.random() * notYetArr.length);
    setDrawnDish(notYetArr[index]);
    dispatch(removeShoppingList());
  };

  const ban = (id, howLong = "permament") => {
    const sinceWhenDate = getDate();
    banDish(id, sinceWhenDate, howLong);
    setDrawnDish("");
  };

  const showIngredients = () => {
    dispatch(changeActiveStatus("ingredientsView", !ingredientsView));
  };

  const showProductsList = () => {
    dispatch(changeActiveStatus("productsView", !productsView));
  };
  const productsListArr = () => {
    if (productsView) {
      const list = productsList;
      if (list) {
        return list
          .filter((item) => item.isChecked)
          .map((item) => (
            <p key={v4()}>
              nazwa: <strong>{item.name}</strong> ilość:{" "}
              <strong>{item.quantity}</strong>
            </p>
          ));
      } else return;
    } else return;
  };
  const markDishAsDone = () => {
    setSelectedDishReducer(showDish.id, showDish.isSelected);
    dispatch(removeShoppingList());
  };

  return (
    <>
      <div className="drawnDishSection">
        <button onClick={handleDraw} className="drawnDishSection__drawBtn">
          Losuj
        </button>
        <CSSTransition
          in={Boolean(showDish)}
          timeout={500}
          classNames="display"
          unmountOnExit
          appear
        >
          <TransitionGroup>
            <CSSTransition
              key={showDish.id}
              timeout={500}
              classNames="display"
              unmountOnExit
              appear
            >
              <div className="drawnDish">
                <DrawnDish
                  showIngredients={showIngredients}
                  showDish={showDish}
                  ban={ban}
                  setSelectedDishReducer={setSelectedDishReducer}
                  markDishAsDone={markDishAsDone}
                  showProductsList={showProductsList}
                  productsListArr={productsListArr}
                />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </CSSTransition>
      </div>
    </>
  );
};

export default DrawnDishList;
