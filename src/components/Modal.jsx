import Button from "./Button";
import styles from "./Modal.module.scss";

function Modal({ children, onClose }) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        {children}
        <Button type="close" onClick={onClose}>
          Close
        </Button>
      </div>
    </>
  );
}

export default Modal;
