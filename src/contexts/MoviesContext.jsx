import { createContext, useContext, useEffect, useState } from "react";

import { useError } from "./ErrorContext";
import { useSearchQuery } from "./SearchQueryContext";

const API_KEY = "218dc8f636aa2082cc10293321c67dd5";
const BASE_URL = "https://api.themoviedb.org/3/";

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

  if (!res.ok) {
    throw new Error(data.status_message || "Error fetching movie details");
  }

  return data;
}

async function getMovieCredits(id) {
  const res = await fetch(
    `${BASE_URL}movie/${id}/credits?language=en-US&api_key=${API_KEY}`,

    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.status_message || "Error fetching movie credits");
  }
  return data;
}

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { query } = useSearchQuery();
  const { handleError, clearError } = useError();

  useEffect(
    function () {
      async function getMovies() {
        setIsLoading(true);
        clearError();
        try {
          const res = await fetch(
            `${BASE_URL}search/movie?query=${query}&page=${page}&api_key=${API_KEY}`
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.status_message || "Error fetching movies");
          }

          if (data.results.length === 0) {
            throw new Error(data.status_message || "No movies for your query");
          }

          const moviesDetailsCredits = await Promise.all(
            data.results.map(async (movie) => {
              const details = await getMovieDetails(movie.id);
              const credits = await getMovieCredits(movie.id);
              return {
                ...movie,
                details,
                credits,
              };
            })
          );

          setMovies(moviesDetailsCredits);

          setTotalPages(data.total_pages);
        } catch (err) {
          handleError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query) getMovies();
    },
    [query, page, handleError, clearError]
  );

  return (
    <MoviesContext.Provider
      value={{
        movies,
        getMovieDetails,
        getMovieCredits,
        isLoading,
        page,
        setPage,
        totalPages,
      }}
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
