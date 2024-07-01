import { useMovies } from "../contexts/MoviesContext";
import "./MovieList.scss";

import MovieItem from "./MovieItem";

function MovieList() {
  const { movies } = useMovies();
  return (
    <ul className="container movie-list">
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

export default MovieList;
