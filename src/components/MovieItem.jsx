import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useError } from "../contexts/ErrorContext";
import { useMovies } from "../contexts/MoviesContext";

import AddToList from "./AddToList";
import Button from "./Button";
import Error from "./Error";
import Modal from "./Modal";
import SpinnerFullPage from "./SpinnerFullPage";

import imageNotFound from "../assets/img/imageNotFound.webp";

import styles from "./MovieItem.module.scss";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, translateY: 20 },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0, translateY: 20 },
  visible: {
    opacity: [0, 0, 1],
    translateY: [20, 20, 0],
    transition: {
      duration: 1,
      ease: "easeIn",
      times: [0, 0.5, 1],
    },
  },
};

function MovieItem({ id }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddToList, setShowAddToList] = useState(false);
  const [showAllCast, setShowAllCast] = useState(false);
  const [movie, setMovie] = useState({
    title: "",
    release_date: "",
    poster_path: "",
    overview: "",
    vote_average: "",
    spoken_languages: [],
    runtime: "",
    genres: [],
    production_countries: [],
    tagline: "",
    cast: [],
    crew: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { getMovieDetails, getMovieCredits } = useMovies();
  const { error, handleError, clearError } = useError();

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      clearError();
      try {
        const [credits, details] = await Promise.all([
          getMovieCredits(id),
          getMovieDetails(id),
        ]);

        if (!details || !details.id) {
          throw new Error("No movie found with the given ID.");
        }

        setMovie({ ...credits, ...details });
      } catch (err) {
        handleError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id, getMovieDetails, getMovieCredits, handleError, clearError]);

  const {
    title,
    release_date: released,
    poster_path: poster,
    overview,
    vote_average: voted,
    spoken_languages: languages,
    runtime,
    genres,
    production_countries: countries,
    tagline,
    cast,
    crew,
  } = movie;

  const castToShow = showAllCast ? cast : cast.slice(0, 10);

  function handleAddToList() {
    setSelectedMovie(movie);
    setShowAddToList(!showAddToList);
    // document.body.style.overflow = "hidden";
  }

  function handleCloseModal() {
    setShowAddToList(false);
    // document.body.style.overflow = "unset";
  }

  function handleShowAllCast() {
    setShowAllCast(!showAllCast);
  }

  if (isLoading) return <SpinnerFullPage />;

  if (error) return <Error error={error} />;

  return (
    <motion.div
      className={styles.movie}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className={styles["movie-wrapper"]} variants={itemVariants}>
        <div className={styles["movie__poster-container"]}>
          <img
            src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
            alt={`Poster of ${title}`}
          />
        </div>
        <motion.div
          className={styles["movie__button-container"]}
          variants={buttonContainerVariants}
        >
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
        </motion.div>
      </motion.div>

      <motion.div className={styles["movie-details"]} variants={itemVariants}>
        <div className={styles["movie-details-heading"]}>
          <span className={styles["movie-details__title"]}>{title}</span>
          {released && (
            <span className={styles["movie-details__released"]}>
              ({released.split("-")[0]})
            </span>
          )}
          <span className={styles["movie-details__voted"]}>
            ⭐ {Number(voted).toFixed(1)}
          </span>
        </div>

        <span className={styles["movie-details__runtime"]}>
          {runtime} <span>minutes</span>
        </span>

        {tagline && (
          <p className={styles["movie-details__tagline"]}>
            &quot; {tagline} &quot;
          </p>
        )}

        <p className={styles["movie-details__overview"]}>{overview}</p>

        <ul className={styles["movie-details__list"]}>
          <li>
            Genres:{" "}
            <ul>
              {genres.length > 0
                ? genres.map((genre) => <li key={genre.id}>{genre.name} </li>)
                : "N/A"}
            </ul>
          </li>
          <li>
            Languages:{" "}
            <ul>
              {languages.length > 0
                ? languages.map((language) => (
                    <li key={language.iso_639_1}>{language.english_name} </li>
                  ))
                : "N/A"}
            </ul>
          </li>
          <li>
            Countries:{" "}
            <ul>
              {countries.length > 0
                ? countries.map((country) => (
                    <li key={country.iso_3166_1}>
                      {country.name === "United States of America"
                        ? "USA"
                        : country.name}{" "}
                    </li>
                  ))
                : "N/A"}
            </ul>
          </li>
          <li>
            Directed by:{" "}
            <ul>
              {crew.filter((crewMember) => {
                return crewMember.job === "Director";
              }).length === 0
                ? "N/A"
                : crew
                    .filter((crewMember) => {
                      return crewMember.job === "Director";
                    })
                    .map((director) => {
                      return (
                        <li key={director.credit_id}> {director.name} </li>
                      );
                    })}
            </ul>
          </li>
          <li>
            Written by:{" "}
            <ul>
              {crew.filter(
                (crewMember) =>
                  crewMember.job === "Writer" || crewMember.job === "Screenplay"
              ).length === 0
                ? "N/A"
                : crew
                    .filter(
                      (crewMember) =>
                        crewMember.job === "Writer" ||
                        crewMember.job === "Screenplay"
                    )
                    .map((writer) => {
                      return <li key={writer.credit_id}> {writer.name} </li>;
                    })}
            </ul>
          </li>
          <li>
            Starring:
            <ul>
              {castToShow.length === 0
                ? "N/A"
                : castToShow.map((cast) => (
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
      </motion.div>
    </motion.div>
  );
}

export default MovieItem;
