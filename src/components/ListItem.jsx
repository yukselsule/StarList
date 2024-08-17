import { useNavigate } from "react-router-dom";

import { useLists } from "../contexts/ListsContext";

import Button from "./Button";

import imageNotFound from "../assets/img/imageNotFound.webp";

import styles from "./ListItem.module.scss";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function ListItem({ movie, listName }) {
  const { poster, date, title, userNotes, userRating, id } = movie;
  const { deleteMovie } = useLists();
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(-1);
  }

  function handleDelete() {
    deleteMovie(listName, movie.id, handleNavigate);
  }

  function handleImageClick() {
    navigate(`/search/movie/${id}`);
  }

  return (
    <div className={styles["list-item"]}>
      <a name="movie item link" className={styles["list-item__poster"]}>
        <img
          onClick={handleImageClick}
          src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
          alt={`Poster of ${title}`}
        />
      </a>

      <div className={styles["list-item__details"]}>
        <div className={styles["list-item__details-heading"]}>
          <h3>{title}</h3>
          <p className={styles["list-item__details-rating"]}>
            <span> ⭐ </span>
            <span> {userRating} </span>
          </p>
        </div>

        <p className={styles["list-item__details-date"]}>
          {date === "unknown" ? "unknown date" : formatDate(date)}
        </p>
        <p className={styles["list-item__details-notes"]}>
          &#8220; {userNotes} &#8221;
        </p>
      </div>
      <Button key={movie.id} type="trash" onClick={handleDelete}>
        <ion-icon name="trash-outline"></ion-icon>
      </Button>
    </div>
  );
}

export default ListItem;
