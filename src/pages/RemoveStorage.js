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
  const [isAccepted, setIsAccepted] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const confirm = () => {
    setPopupActive(true);
  };
  const popup = (
    <>
      <p>czy na pweno usunąć wszystkie dane aplikacji?</p>
      <button>tak</button>
      <button>nie</button>
    </>
  );

  const reset = () => {
    storageItems.forEach((item) => localStorage.removeItem(item));
  };

  return (
    <>
      <button onClick={confirm}>Usuń pamięć</button>
      {popupActive && popup}
    </>
  );
};

export default RemoveStorage;
