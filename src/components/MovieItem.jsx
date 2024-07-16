import { useState } from "react";
import imageNotFound from "../assets/img/imageNotFound.png";

import Button from "./Button";
import AddToList from "./AddToList";

import styles from "./MovieItem.module.scss";
import Modal from "./Modal";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieItem({ movie }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddToList, setShowAddToList] = useState(false);

  const {
    title,
    release_date: released,
    poster_path: poster,
    overview,
    vote_average: voted,
    details,
    credits,
  } = movie;

  const {
    spoken_languages: languages = [],
    runtime,
    genres = [],
    production_countries: countries = [],
  } = details;

  const { cast = [], crew = [] } = credits;

  function handleAddToList() {
    setSelectedMovie(movie);
    setShowAddToList(!showAddToList);
    document.body.style.overflow = "hidden";
  }

  function handleCloseModal() {
    setShowAddToList(false);
    document.body.style.overflow = "unset";
  }

  return (
    <li className={styles["movie-item"]}>
      <div className={styles.movie}>
        <div className={styles["movie-img"]}>
          <img
            className={styles["movie-img__poster"]}
            src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
            alt={`Poster of ${title}`}
          />
        </div>

        <div className={styles.movie__details}>
          <div>
            <span className={styles["movie-details__title"]}>{title}</span>
            <span className={`styles["movie-details__voted"] margin-left-sm`}>
              ⭐ {voted.toFixed(1)}
            </span>
          </div>

          <span className={styles["movie-details__runtime"]}>
            Runtime: {runtime} minutes
          </span>
          <span className={styles["movie-details__released"]}>{released}</span>
          <p className={styles["movie-details__languages"]}>
            Languages:
            {languages.length > 0
              ? languages.map((language) => (
                  <span
                    className={styles["movie-details__languages_lng"]}
                    key={language.iso_639_1}
                  >
                    {language.english_name}
                  </span>
                ))
              : "N/A"}
          </p>

          <p className={styles["movie-details__genres"]}>
            Genres:
            {genres.length > 0
              ? genres.map((genre) => <span key={genre.id}>{genre.name} </span>)
              : "N/A"}
          </p>
          <p className={styles["movie-details__countries"]}>
            Countries:
            {countries.length > 0
              ? countries.map((country) => (
                  <span key={country.iso_3166_1}>
                    {country.name === "United States of America"
                      ? "USA"
                      : country.name}{" "}
                  </span>
                ))
              : "N/A"}
          </p>
          <div>
            {cast.map((cast) => (
              <p key={cast.id}> Cast: {cast.name} </p>
            ))}{" "}
          </div>
          <div>
            {crew.map((crew) => (
              <p key={crew.credit_id}> Crew: {crew.name} </p>
            ))}{" "}
          </div>
          <p className={styles["movie-details__overview"]}>{overview}</p>
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
