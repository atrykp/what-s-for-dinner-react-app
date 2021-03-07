import { useState } from "react";
import "../styles/RemoveStorage.css";

const storageItems = ["state"];

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
      <div className="removeStorageFormat">
        <p className="removeStorageFormat__warning">
          Czy na pweno usunąć wszystkie dane aplikacji? Twoje dane zostaną
          usunięte bezpowrotnie.
        </p>
        <button
          onClick={reset}
          className="removeStorageFormat__button removeStorageFormat__button--yes"
        >
          tak
        </button>
        <button onClick={cancel} className="removeStorageFormat__button">
          nie
        </button>
      </div>
    </>
  );
  return (
    <>
      <button onClick={confirm} className="removeStorageBtn">
        Formatuj
      </button>
      {popupActive && popup}
    </>
  );
};

export default RemoveStorage;
