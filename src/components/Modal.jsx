import Button from "./Button";
import "./Modal.scss";

function Modal({ children, onClose }) {
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        {children}
        <Button type="close" onClick={onClose}>
          Close
        </Button>
      </div>
    </>
  );
}

export default Modal;
