import "../styles/Modal.css";
const Modal = ({ txt, setView }) => {
  return (
    <div className="modal">
      <p className="modal__txt">{txt}</p>
      <button className="modal__btn" onClick={() => setView(false)}>
        Ok
      </button>
    </div>
  );
};

export default Modal;
