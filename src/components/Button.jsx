import "./Button.scss";

function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`btn btn-${type}`}>
      {children}
    </button>
  );
}

export default Button;
