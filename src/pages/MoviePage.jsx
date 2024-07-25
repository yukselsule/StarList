import { useParams } from "react-router-dom";

import MovieItem from "../components/MovieItem";

function MoviePage() {
  const { id } = useParams();

  return (
    <div className="container">
      <MovieItem id={id} />
    </div>
  );
}

export default MoviePage;
