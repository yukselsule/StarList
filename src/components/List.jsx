import { useLists } from "../contexts/ListsContext.jsx";
import ListItem from "./ListItem.jsx";

function List({ listName }) {
  const { lists } = useLists();
  const movies = lists[listName] || [];

  return (
    <div>
      <h2>{listName}</h2>
      <ul>
        {movies.map((movie, index) => (
          <ListItem movie={movie} key={index} />
        ))}
      </ul>
    </div>
  );
}

export default List;
