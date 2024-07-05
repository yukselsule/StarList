import { useEffect, useState } from "react";
import { useLists } from "../contexts/ListsContext";

import Button from "./Button";
import { useMovies } from "../contexts/MoviesContext";
import { useNavigate } from "react-router-dom";

function Summary() {
  const navigate = useNavigate();

  const { lists } = useLists();
  const { getMovieDetails } = useMovies();

  const [movieDetails, setMovieDetails] = useState([]);
  const [summary, setSummary] = useState({
    totalRuntime: 0,
    allCountries: [],
    allGenres: [],
    allLanguages: [],
  });

  const handleButtonClick = () => {
    navigate("/profile/detailed-summary");
  };

  useEffect(() => {
    const fetchMovieDetails = async function () {
      const uniqueMovieIds = [
        ...new Set(
          Object.values(lists)
            .flat()
            .map((movie) => movie.id)
        ),
      ];
      const detailsPromises = uniqueMovieIds.map((id) => getMovieDetails(id));
      const details = await Promise.all(detailsPromises);
      setMovieDetails(details);
    };
    fetchMovieDetails();
  }, []);

  useEffect(() => {
    if (movieDetails.length > 0) {
      const totalRuntime = movieDetails.reduce(
        (acc, movie) => (acc += movie.runtime),
        0
      );

      const allCountries = [
        ...new Set(
          movieDetails.flatMap((movie) =>
            movie.production_countries.map((country) => country.name)
          )
        ),
      ];
      const allGenres = [
        ...new Set(
          movieDetails.flatMap((movie) =>
            movie.genres.map((genre) => genre.name)
          )
        ),
      ];
      const allLanguages = [
        ...new Set(
          movieDetails.flatMap((movie) =>
            movie.spoken_languages.map((language) => language.name)
          )
        ),
      ];

      setSummary({ totalRuntime, allCountries, allGenres, allLanguages });
    }
  }, [movieDetails]);

  return (
    <div>
      <h2>You have watched</h2>
      <p> {movieDetails.length} movies</p>
      <p> {summary.totalRuntime} minutes </p>
      <p> {summary.allCountries.length} countries </p>
      <p> {summary.allGenres.length} genres </p>
      <p> {summary.allLanguages.length} languages </p>

      <Button type="details" onClick={handleButtonClick}>
        see details
      </Button>
    </div>
  );
}

export default Summary;
