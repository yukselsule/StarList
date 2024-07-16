const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

import styles from "./Movie.module.scss";
import imageNotFound from "../assets/img/imageNotFound.png";
import Button from "./Button";
import Modal from "./Modal";
import AddToList from "./AddToList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Movie({ movie }) {
  const { title, poster_path: poster, id } = movie;
  const [showAddToList, setShowAddToList] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    <div>
      <a className={styles["movie-img"]} onClick={handleImageClick}>
        <img
          className={styles["movie-img__poster"]}
          src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
          alt={`Poster of ${title}`}
        />
      </a>
      <h2> {title} </h2>
      <Button type="add" onClick={handleAddToList}>
        Add to list
      </Button>
      {showAddToList && (
        <Modal onClose={handleCloseModal}>
          <AddToList onCloseModal={handleCloseModal} movie={selectedMovie} />
        </Modal>
      )}
    </div>
  );
}

export default Movie;
