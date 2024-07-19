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
            <ion-icon
              className={styles["modal__icon"]}
              name="close-outline"
            ></ion-icon>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Modal;
