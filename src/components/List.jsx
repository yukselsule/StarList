import { useNavigate, useParams } from "react-router-dom";

import { useLists } from "../contexts/ListsContext.jsx";

import Button from "./Button.jsx";
import ListItem from "./ListItem.jsx";

import styles from "./List.module.scss";

function List() {
  const { lists, deleteList } = useLists();
  const { listId } = useParams();
  const movies = lists[listId] || [];

  const navigate = useNavigate();

  function handleNavigate() {
    navigate(-1);
  }

  function handleDeleteList() {
    deleteList(listId, handleNavigate);
  }

  return (
    <div className={styles["list"]}>
      <div className={styles["list-heading"]}>
        <h2>{listId}</h2>
        <Button type="delete" onClick={handleDeleteList}>
          Delete list
        </Button>
      </div>

      <ul>
        {movies.map((movie, index) => (
          <ListItem movie={movie} key={index} listName={listId} />
        ))}
      </ul>
    </div>
  );
}

export default List;
