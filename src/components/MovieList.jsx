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

  if (isLoading) return <SpinnerFullPage />;

  if (error) return <Error error={error} />;

  return (
    <div>
      <ul className={styles["movie-list"]}>
        {sortedMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
