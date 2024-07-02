import { useState } from "react";
import imageNotFound from "../assets/img/imageNotFound.png";

import Button from "./Button";
import AddToList from "./AddToList";

import "./MovieItem.scss";
import Modal from "./Modal";
import { useMovies } from "../contexts/MoviesContext";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieItem({ movie }) {
  const { movieDetails } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddToList, setShowAddToList] = useState(false);

  const details = movieDetails[movie.id] || {};
  const {
    spoken_languages: languages = [],
    runtime,
    genres = [],
    origin_country: countries = [],
  } = details;

  const {
    title,
    release_date: released,
    poster_path: poster,
    overview,
    vote_average: voted,
  } = movie;

  function handleAddToList() {
    setSelectedMovie(movie);
    setShowAddToList(!showAddToList);
  }

  function handleCloseModal() {
    setShowAddToList(false);
  }

  return (
    <li>
      <div className="movie">
        <img
          className="movie__poster"
          src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
          alt={`Poster of ${title}`}
        />
        <div className="movie__details">
          <h2 className="movie__details-title">{title}</h2>
          <span className="movie__details-voted"> {voted} </span>
          <span className="movie__details-runtime">Runtime: {runtime} </span>
          <p className="movie__details-languages">
            Languages:
            {languages.map((language) => {
              return <span key={language.iso_639_1}>{language.name}</span>;
            })}
          </p>
          <span className="movie__details-released">{released}</span>
          <p className="movie__details-genres">
            Genres:
            {genres.map((genre) => {
              return <span key={genre.id}>{genre.name} </span>;
            })}
          </p>
          <p className="movie__details-countries">
            Countries:
            {countries.map((country) => {
              return <span key={country}>{country} </span>;
            })}
          </p>
          <p className="movie__details-overview">{overview}</p>
          <Button type="add" onClick={handleAddToList}>
            Add to list
          </Button>
          {showAddToList && (
            <Modal onClose={handleCloseModal}>
              <AddToList
                onCloseModal={handleCloseModal}
                movie={selectedMovie}
              />
            </Modal>
          )}
        </div>
      </div>
    </li>
  );
}

export default MovieItem;
