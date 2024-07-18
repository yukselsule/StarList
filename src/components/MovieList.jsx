import { useMovies } from "../contexts/MoviesContext";

import MovieCard from "./MovieCard";
import SpinnerFullPage from "./SpinnerFullPage";

import styles from "./MovieList.module.scss";

function MovieList() {
  const { movies, isLoading } = useMovies();
  const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);

  if (isLoading) return <SpinnerFullPage />;

  return (
    <ul className={styles["movie-list"]}>
      {sortedMovies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

export default MovieList;
