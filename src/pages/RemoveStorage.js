import { useState } from "react";

const storageItems = [
  "userDishes",
  "allDishes",
  "filterArr",
  "userFilterArr",
  "selectedDish",
  "productsList",
  "isSelected",
];

const RemoveStorage = () => {
  const [popupActive, setPopupActive] = useState(false);
  const confirm = () => {
    setPopupActive(true);
  };

  const reset = () => {
    storageItems.forEach((item) => localStorage.removeItem(item));
    setPopupActive(false);
    window.location.reload();
  };

  const cancel = () => {
    setPopupActive(false);
  };

  const popup = (
    <>
      <p>czy na pweno usunąć wszystkie dane aplikacji?</p>
      <button onClick={reset}>tak</button>
      <button onClick={cancel}>nie</button>
    </>
  );
  return (
    <>
      <button onClick={confirm}>Usuń pamięć</button>
      {popupActive && popup}
    </>
  );
};

export default RemoveStorage;
