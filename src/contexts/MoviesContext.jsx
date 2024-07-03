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

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const { query } = useSearchQuery();

  const getMovieDetails = useCallback(async function getMovieDetails(id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMThkYzhmNjM2YWEyMDgyY2MxMDI5MzMyMWM2N2RkNSIsIm5iZiI6MTcxOTkxMTYzMy4xNDM1NzQsInN1YiI6IjY2N2U5YzZiOGExMTkxMTY4MjZkNDI3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QoIb9-KHmo3tRUnuf5C703-FVybJ1GODeah9lQiuoAs",
        },
      }
    );
    const data = await res.json();
    return data;
  }, []);

  useEffect(
    function () {
      async function getMovie() {
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
      }
      if (query) getMovie();
    },
    [query, getMovieDetails]
  );

  return (
    <MoviesContext.Provider value={{ movies, movieDetails, getMovieDetails }}>
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("Movies context was used ouside the movies provider");
  }
  return context;
}

export { MoviesProvider, useMovies };
