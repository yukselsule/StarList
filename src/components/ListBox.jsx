import { useNavigate } from "react-router-dom";

import styles from "./ListBox.module.scss";

function ListBox({ listName, listId }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/profile/${listId}`);
  }

  return (
    <li className={styles["list-box"]} onClick={handleClick}>
      <h2 className={styles["list-box__name"]}> {listName} </h2>
    </li>
  );
}

export default ListBox;
