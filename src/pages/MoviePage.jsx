import { useParams } from "react-router-dom";
import { useMovies } from "../contexts/MoviesContext";
import MovieItem from "../components/MovieItem";

function MoviePage() {
  const { id } = useParams();
  const { getMovieById } = useMovies();
  const movie = getMovieById(id);

  return <div>{<MovieItem movie={movie} />}</div>;
}

export default MoviePage;
