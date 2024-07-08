const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

import imageNotFound from "../assets/img/imageNotFound.png";
import { useLists } from "../contexts/ListsContext";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function ListItem({ movie, index, listName }) {
  const { poster, date, title, userNotes, userRating } = movie;
  const { deleteMovie } = useLists();

  function handleDelete() {
    deleteMovie(listName, movie.id);
  }

  return (
    <li key={index}>
      <img
        src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
        alt={`Poster of ${title}`}
      />
      <h3>{title}</h3>
      <p> {date === "unknown" ? "unknown" : formatDate(date)}</p>
      <p>{userNotes} </p>
      <p>
        <span> ⭐ </span>
        <span> {userRating} </span>
      </p>
      <Button key={movie.id} type="delete" onClick={handleDelete}>
        Delete
      </Button>
    </li>
  );
}

export default ListItem;
