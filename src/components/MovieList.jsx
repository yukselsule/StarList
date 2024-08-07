import { motion } from "framer-motion";

import { useError } from "../contexts/ErrorContext";
import { useMovies } from "../contexts/MoviesContext";

import Error from "./Error";
import MovieCard from "./MovieCard";
import SpinnerFullPage from "./SpinnerFullPage";

import styles from "./MovieList.module.scss";

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, translateY: 10 },
  visible: {
    opacity: 1,
    translateY: 0,
  },
};

function MovieList() {
  const { error } = useError();
  const { movies, isLoading } = useMovies();
  const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);

  if (isLoading) return <SpinnerFullPage />;

  if (error) return <Error error={error} />;

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <ul className={styles["movie-list"]}>
        {sortedMovies.map((movie) => (
          <motion.div key={movie.id} variants={itemVariants}>
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </ul>
    </motion.div>
  );
}

export default MovieList;
