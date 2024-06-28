import { useMovies } from "../contexts/MoviesContext";

import MovieItem from "./MovieItem";

function MovieList() {
  const { movies } = useMovies();
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

export default MovieList;
