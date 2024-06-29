import { createContext, useContext, useEffect, useState } from "react";
import { useSearchQuery } from "./SearchQueryContext";

const API_KEY = "218dc8f636aa2082cc10293321c67dd5";
const BASE_URL = "https://api.themoviedb.org/3/";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const { query } = useSearchQuery();

  useEffect(
    function () {
      async function getMovie() {
        const res = await fetch(
          `${BASE_URL}search/movie?query=${query}&api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovies(data.results);
      }
      getMovie();
    },
    [query]
  );

  return (
    <MoviesContext.Provider value={{ movies }}>
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  return context;
}

export { MoviesProvider, useMovies };
