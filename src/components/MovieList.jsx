import { useMovies } from "../contexts/MoviesContext";
import "./MovieList.scss";

import MovieItem from "./MovieItem";
import SpinnerFullPage from "./SpinnerFullPage";

function MovieList() {
  const { movies, isLoading } = useMovies();

  if (isLoading) return <SpinnerFullPage />;

  if (!isLoading)
    return (
      <ul className="container movie-list">
        {movies.map((movie) => (
          <MovieItem movie={movie} key={movie.id} />
        ))}
      </ul>
    );
}

export default MovieList;
