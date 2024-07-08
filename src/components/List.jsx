import { useNavigate, useParams } from "react-router-dom";
import { useLists } from "../contexts/ListsContext.jsx";
import ListItem from "./ListItem.jsx";
import Button from "./Button.jsx";

function List() {
  const { lists, deleteList } = useLists();
  const { listId } = useParams();
  const movies = lists[listId] || [];

  const navigate = useNavigate();

  function handleDeleteList() {
    deleteList(listId);
    navigate("/profile");
  }

  return (
    <div>
      <h2>{listId}</h2>
      <ul>
        {movies.map((movie, index) => (
          <>
            <ListItem movie={movie} key={index} />
          </>
        ))}
        <Button type="delete" onClick={handleDeleteList}>
          Delete list
        </Button>
      </ul>
    </div>
  );
}

export default List;
