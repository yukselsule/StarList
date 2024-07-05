import { useParams } from "react-router-dom";
import { useLists } from "../contexts/ListsContext.jsx";
import ListItem from "./ListItem.jsx";

function List() {
  const { lists } = useLists();
  const { listId } = useParams();
  const movies = lists[listId] || [];

  return (
    <div>
      <h2>{listId}</h2>
      <ul>
        {movies.map((movie, index) => (
          <ListItem movie={movie} key={index} />
        ))}
      </ul>
    </div>
  );
}

export default List;
