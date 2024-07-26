import Button from "./Button";

import styles from "./Modal.module.scss";

function Modal({ children, onClose }) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles["modal-container"]}>
        <div className={styles.modal}>
          {children}
          <Button type="close" onClick={onClose}>
            <span className={styles["modal__close"]}>
              <ion-icon name="close-outline"></ion-icon>
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Modal;
