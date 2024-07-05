import { useMovies } from "../contexts/MoviesContext";
import styles from "./MovieList.module.scss";

import MovieItem from "./MovieItem";
import SpinnerFullPage from "./SpinnerFullPage";

function MovieList() {
  const { movies, isLoading } = useMovies();

  if (isLoading) return <SpinnerFullPage />;

  if (!isLoading)
    return (
      <ul className={styles["movie-list"]}>
        {movies.map((movie) => (
          <MovieItem movie={movie} key={movie.id} />
        ))}
      </ul>
    );
}

export default MovieList;
