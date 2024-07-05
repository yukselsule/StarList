import { useState } from "react";
import imageNotFound from "../assets/img/imageNotFound.png";

import Button from "./Button";
import AddToList from "./AddToList";

import styles from "./MovieItem.module.scss";
import Modal from "./Modal";
import { useMovies } from "../contexts/MoviesContext";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieItem({ movie }) {
  const { movieDetails } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddToList, setShowAddToList] = useState(false);

  const details = movieDetails[movie.id] || {};
  const {
    spoken_languages: languages = [],
    runtime,
    genres = [],
    production_countries: countries = [],
  } = details;

  const {
    title,
    release_date: released,
    poster_path: poster,
    overview,
    vote_average: voted,
  } = movie;

  function handleAddToList() {
    setSelectedMovie(movie);
    setShowAddToList(!showAddToList);
  }

  function handleCloseModal() {
    setShowAddToList(false);
  }

  return (
    <li>
      <div className={styles.movie}>
        <img
          className={styles.movie__poster}
          src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
          alt={`Poster of ${title}`}
        />
        <div className={styles.movie__details}>
          <h2 className={styles["movie__details-title"]}>{title}</h2>
          <span className={styles["movie__details-voted"]}>
            {voted.toFixed(1)}
          </span>
          <span className={styles["movie__details-runtime"]}>
            Runtime: {runtime} minutes
          </span>
          <p className={styles["movie__details-languages"]}>
            Languages:
            {languages.length > 0
              ? languages.map((language) => (
                  <span key={language.iso_639_1}>{language.english_name}</span>
                ))
              : "N/A"}
          </p>
          <span className={styles["movie__details-released"]}>{released}</span>
          <p className={styles["movie__details-genres"]}>
            Genres:
            {genres.length > 0
              ? genres.map((genre) => <span key={genre.id}>{genre.name} </span>)
              : "N/A"}
          </p>
          <p className={styles["movie__details-countries"]}>
            Countries:
            {countries.length > 0
              ? countries.map((country) => (
                  <span key={country.iso_3166_1}>{country.name} </span>
                ))
              : "N/A"}
          </p>
          <p className={styles["movie__details-overview"]}>{overview}</p>
          <Button type="add" onClick={handleAddToList}>
            Add to list
          </Button>
          {showAddToList && (
            <Modal onClose={handleCloseModal}>
              <AddToList
                onCloseModal={handleCloseModal}
                movie={selectedMovie}
              />
            </Modal>
          )}
        </div>
      </div>
    </li>
  );
}

export default MovieItem;
