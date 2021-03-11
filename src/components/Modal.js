import "../styles/Modal.css";
const Modal = ({ txt }) => {
  return (
    <div className="modal">
      <p className="modal__txt">{txt}</p>
      <button className="modal__btn">Ok</button>
    </div>
  );
};

export default Modal;
