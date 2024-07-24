import { useEffect, useState } from "react";

import { useMovies } from "../contexts/MoviesContext";

import AddToList from "./AddToList";
import Button from "./Button";
import Modal from "./Modal";

import imageNotFound from "../assets/img/imageNotFound.png";

import styles from "./MovieItem.module.scss";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieItem({ id }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddToList, setShowAddToList] = useState(false);
  const [showAllCast, setShowAllCast] = useState(false);
  const [movie, setMovie] = useState({});
  const { getMovieDetails, getMovieCredits } = useMovies();

  useEffect(() => {
    const fetchMovie = async function () {
      try {
        const [credits, details] = await Promise.all([
          getMovieCredits(id),
          getMovieDetails(id),
        ]);
        setMovie({ ...credits, ...details });
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovie();
  }, [id, getMovieDetails, getMovieCredits]);

  const {
    title,
    release_date: released = "",
    poster_path: poster = "",
    overview = "",
    vote_average: voted = "",
    spoken_languages: languages = [],
    runtime = "",
    genres = [],
    production_countries: countries = [],
    tagline = "",
    cast = [],
    crew = [],
  } = movie;

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
    <div className={styles.movie}>
      <div className={styles["movie__poster-container"]}>
        <img
          src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
          alt={`Poster of ${title}`}
        />
      </div>

      <div className={styles["movie-details"]}>
        <div className={styles["movie-details-heading"]}>
          <span className={styles["movie-details__title"]}>{title}</span>
          {released !== "" && (
            <span className={styles["movie-details__released"]}>
              ({released.split("").slice(0, 4)})
            </span>
          )}
          <span className={styles["movie-details__voted"]}>
            ⭐ {Number(voted).toFixed(1)}
          </span>
        </div>

        <span className={styles["movie-details__runtime"]}>
          {runtime} <span>minutes</span>
        </span>

        {tagline !== "" && (
          <p className={styles["movie-details__tagline"]}>
            &quot; {tagline} &quot;
          </p>
        )}

        <p className={styles["movie-details__overview"]}>{overview}</p>

        <ul className={styles["movie-details__list"]}>
          <li>
            Genres:{" "}
            {genres.length > 0
              ? genres.map((genre) => <span key={genre.id}>{genre.name} </span>)
              : "N/A"}
          </li>
          <li>
            Languages:{" "}
            {languages.length > 0
              ? languages.map((language) => (
                  <span key={language.iso_639_1}>{language.english_name} </span>
                ))
              : "N/A"}
          </li>
          <li>
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
          </li>
          <li>
            Directed by:
            {crew
              .filter((crew) => crew.job === "Director")
              .map((director) => {
                return <span key={director.credit_id}> {director.name} </span>;
              })}
          </li>
          <li>
            Written by:
            {crew
              .filter(
                (crew) => crew.job === "Writer" || crew.job === "Screenplay"
              )
              .map((writer) => {
                return <span key={writer.credit_id}> {writer.name} </span>;
              })}
          </li>
          <li className={styles["movie-details__list__cast"]}>
            Starring:
            <ul>
              {castToShow.map((cast) => (
                <li key={cast.id}> {cast.name} </li>
              ))}
              {cast.length > 10 && (
                <Button type="show-all" onClick={handleShowAllCast}>
                  {showAllCast ? "show less" : "show all"}
                </Button>
              )}
            </ul>
          </li>
        </ul>
      </div>

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

export default MovieItem;
