import { motion } from "framer-motion";

import Button from "./Button";

import styles from "./Modal.module.scss";

const modalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.5, 1],
    zIndex: [50, 500, 5000],
    transition: {
      duration: 0.1,
      ease: "easeIn",
      times: [0, 0.5, 1],
    },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

function Modal({ children, onClose }) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <motion.div
        className={styles["modal-container"]}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <div className={styles.modal}>
          {children}
          <Button type="close" onClick={onClose}>
            <span className={styles["modal__close"]}>
              <ion-icon name="close-outline"></ion-icon>
            </span>
          </Button>
        </div>
      </motion.div>
    </>
  );
}

export default Modal;
