import "../styles/Modal.css";
import { useEffect, useRef } from "react";
const Modal = ({ txt, setView, history = null }) => {
  const modalRef = useRef(null);
  const listener = (e) => {
    if (!modalRef.current || modalRef.current.contains(e.target)) {
      return;
    }
    setView(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, []);
  return (
    <div ref={modalRef} className="modal">
      <p className="modal__txt">{txt}</p>
      <button
        className="modal__btn"
        onClick={() => {
          setView(false);
          history && history.goBack();
        }}
      >
        Ok
      </button>
    </div>
  );
};

export default Modal;
