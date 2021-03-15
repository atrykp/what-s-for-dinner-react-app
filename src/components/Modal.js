import "../styles/Modal.css";
const Modal = ({ txt, setView, history = null }) => {
  return (
    <div className="modal">
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
