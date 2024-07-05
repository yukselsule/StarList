import styles from "./Button.module.scss";

function Button({ children, onClick, type }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[`btn-${type}`]}`}
    >
      {children}
    </button>
  );
}

export default Button;
