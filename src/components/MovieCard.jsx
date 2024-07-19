import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AddToList from "./AddToList";
import Modal from "./Modal";

import imageNotFound from "../assets/img/imageNotFound.png";

import styles from "./MovieCard.module.scss";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const { title, poster_path: poster, id } = movie;
  const [showAddToList, setShowAddToList] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  function handleAddToList() {
    setSelectedMovie(movie);
    setShowAddToList(!showAddToList);
    document.body.style.overflow = "hidden";
  }

  function handleCloseModal() {
    setShowAddToList(false);
    document.body.style.overflow = "unset";
  }

  function handleImageClick() {
    navigate(`/search/movie/${id}`);
  }

  return (
    <div className={styles.movie}>
      <div className={styles["movie-card"]}>
        <div className={styles["movie-card__poster-container"]}>
          <div className={styles["movie-card__poster-container"]}>
            <img
              className={styles["movie-card__poster"]}
              src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
              alt={`Poster of ${title}`}
              onClick={handleImageClick}
            />
          </div>
          <div
            className={`${
              isHovered ? styles["movie-card__poster--hovered"] : ""
            }`}
          ></div>
          <button
            type="add"
            onClick={handleAddToList}
            className={styles["movie-card__button"]}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            +
          </button>
        </div>

        <div className={styles["movie-card__title-container"]}>
          <h3> {title} </h3>
        </div>
      </div>

      {showAddToList && (
        <Modal onClose={handleCloseModal}>
          <AddToList onCloseModal={handleCloseModal} movie={selectedMovie} />
        </Modal>
      )}
    </div>
  );
}

export default MovieCard;
