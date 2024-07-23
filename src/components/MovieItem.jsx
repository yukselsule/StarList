import { useState } from "react";

import AddToList from "./AddToList";
import Button from "./Button";
import Modal from "./Modal";

import imageNotFound from "../assets/img/imageNotFound.png";

import styles from "./MovieItem.module.scss";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieItem({ movie }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddToList, setShowAddToList] = useState(false);
  const [showAllCast, setShowAllCast] = useState(false);

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
    tagline,
  } = details;

  const { cast = [], crew = [] } = credits;
  const castToShow = showAllCast ? cast : cast.slice(0, 10);

  function handleAddToList() {
    setSelectedMovie(movie);
    setShowAddToList(!showAddToList);
    document.body.style.overflow = "hidden";
  }

  function handleCloseModal() {
    setShowAddToList(false);
    document.body.style.overflow = "unset";
  }

  function handleShowAllCast() {
    setShowAllCast(!showAllCast);
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
            <span className={styles["movie-details__title"]}>
              {title} (
              {released !== "" && (
                <span className={styles["movie-details__released"]}>
                  {released.split("").slice(0, 4)}
                </span>
              )}
              )
            </span>
            <span className={`styles["movie-details__voted"] margin-left-sm`}>
              ⭐ {voted.toFixed(1)}
            </span>
          </div>

          <span className={styles["movie-details__runtime"]}>
            {runtime} minutes
          </span>

          {tagline !== "" && <h3> &quot;{tagline}&quot; </h3>}

          <p className={styles["movie-details__overview"]}>{overview}</p>

          <div>
            <h3>
              Directed by:
              {crew
                .filter((crew) => crew.job === "Director")
                .map((director) => {
                  return (
                    <span key={director.credit_id}> {director.name} </span>
                  );
                })}
            </h3>
            <h3>
              Written by:
              {crew
                .filter(
                  (crew) => crew.job === "Writer" || crew.job === "Screenplay"
                )
                .map((writer) => {
                  return <span key={writer.credit_id}> {writer.name} </span>;
                })}
            </h3>
          </div>

          <div>
            Starring:
            <ul>
              {castToShow.map((cast) => (
                <li key={cast.id}> {cast.name} </li>
              ))}
              {cast.length > 10 && (
                <Button onClick={handleShowAllCast}>
                  {showAllCast ? "show less" : "show all"}
                </Button>
              )}
            </ul>
          </div>

          <p className={styles["movie-details__genres"]}>
            Genres:{" "}
            {genres.length > 0
              ? genres.map((genre) => <span key={genre.id}>{genre.name} </span>)
              : "N/A"}
          </p>

          <p className={styles["movie-details__languages"]}>
            Languages:{" "}
            {languages.length > 0
              ? languages.map((language) => (
                  <span
                    className={styles["movie-details__languages_lng"]}
                    key={language.iso_639_1}
                  >
                    {language.english_name}{" "}
                  </span>
                ))
              : "N/A"}
          </p>

          <p className={styles["movie-details__countries"]}>
            Countries:{" "}
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
