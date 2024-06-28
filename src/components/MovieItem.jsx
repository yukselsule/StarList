const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
import imageNotFound from "../assets/img/imageNotFound.jpg";
import "./MovieItem.scss";

function MovieItem({ movie }) {
  const {
    title,
    release_date: released,
    poster_path: poster,
    overview,
  } = movie;

  return (
    <li className="movie">
      <div>
        <img
          className="movie__poster"
          src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
          alt={`Poster of ${title}`}
        />
        <h2 className="movie__title">{title}</h2>
        <span className="movie__released">{released}</span>
        <p className="movie__overview">{overview}</p>
      </div>
    </li>
  );
}

export default MovieItem;
