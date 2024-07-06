import { useMovies } from "../contexts/MoviesContext";
import styles from "./MovieList.module.scss";

import MovieItem from "./MovieItem";
import SpinnerFullPage from "./SpinnerFullPage";

function MovieList() {
  const { movies, isLoading } = useMovies();
  const sortedMovies = [...movies].sort((a, b) => b.vote_count - a.vote_count);

  if (isLoading) return <SpinnerFullPage />;

  return (
    <ul className={styles["movie-list"]}>
      {sortedMovies.map((movie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

export default MovieList;
