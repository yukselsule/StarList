// const BASE_ID_URL = `https://api.themoviedb.org/3/movie/{movie_id}/external_ids`;

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

import imageNotFound from "../assets/img/imageNotFound.png";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function ListItem({ movie, index }) {
  const { poster, id, date, title, userNotes, userRating } = movie;

  return (
    <li key={index}>
      <img
        className="list-movie__poster"
        src={poster ? `${IMG_BASE_URL}${poster}` : imageNotFound}
        alt={`Poster of ${title}`}
      />
      <p>{id}</p>
      <h3>{title}</h3>
      <p> {date === "unknown" ? "unknown" : formatDate(date)}</p>
      <p>{userNotes} </p>
      <p>
        <span> ⭐ </span>
        <span> {userRating} </span>
      </p>
    </li>
  );
}

export default ListItem;
