import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchQuery } from "./SearchQueryContext";

const API_KEY = "218dc8f636aa2082cc10293321c67dd5";
const BASE_URL = "https://api.themoviedb.org/3/";

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

async function getMovieDetails(id) {
  const res = await fetch(
    `${BASE_URL}movie/${id}?language=en-US&api_key=${API_KEY}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useSearchQuery();

  const getMovies = useCallback(
    async function () {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${BASE_URL}search/movie?query=${query}&api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovies(data.results);

        data.results.forEach(async (movie) => {
          const details = await getMovieDetails(movie.id);
          setMovieDetails((prevDetails) => ({
            ...prevDetails,
            [movie.id]: { ...movie, ...details },
          }));
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [query]
  );

  const debouncedGetMovies = useCallback(debounce(getMovies, 1000), [
    getMovies,
  ]);

  useEffect(
    function () {
      if (query) debouncedGetMovies();
    },
    [query, debouncedGetMovies]
  );

  return (
    <MoviesContext.Provider
      value={{ movies, movieDetails, getMovieDetails, isLoading }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("Movies context was used outside the movies provider");
  }
  return context;
}

export { MoviesProvider, useMovies };
