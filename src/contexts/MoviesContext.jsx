import { createContext, useContext, useEffect, useState } from "react";

const API_KEY = "218dc8f636aa2082cc10293321c67dd5";
const BASE_URL = "https://api.themoviedb.org/3/";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);

  useEffect(function () {
    async function getMovie() {
      const res = await fetch(
        `${BASE_URL}search/movie?query=Inception&api_key=${API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results);
    }
    getMovie();
  }, []);

  console.log(movies);

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
