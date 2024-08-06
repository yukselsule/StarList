import { motion } from "framer-motion";

import { useError } from "../contexts/ErrorContext";
import { useMovies } from "../contexts/MoviesContext";

import Error from "./Error";
import MovieCard from "./MovieCard";
import SpinnerFullPage from "./SpinnerFullPage";

import styles from "./MovieList.module.scss";

function MovieList() {
  const { error } = useError();
  const { movies, isLoading } = useMovies();
  const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, translateY: 15 },
    visible: {
      opacity: 1,
      translateY: 0,
    },
  };

  if (isLoading) return <SpinnerFullPage />;

  if (error) return <Error error={error} />;

  return (
    <motion.div initial="hidden" animate="visible" variants={container}>
      <ul className={styles["movie-list"]}>
        {sortedMovies.map((movie) => (
          <motion.div key={movie.id} variants={item}>
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </ul>
    </motion.div>
  );
}

export default MovieList;
