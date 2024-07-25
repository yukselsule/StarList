import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useLocalStorageState } from "../hooks/useLocalStorageHook";
import { useError } from "./ErrorContext";
import { useMovies } from "./MoviesContext";

const ListsContext = createContext();

function ListsProvider({ children }) {
  const [listNames, setListNames] = useLocalStorageState([], "listNames");
  const [lists, setLists] = useLocalStorageState({}, "lists");
  const { getMovieDetails } = useMovies();
  const { clearError, handleError } = useError();
  const [summary, setSummary] = useState({
    totalRuntime: 0,
    allCountries: [],
    allGenres: [],
    allLanguages: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useLocalStorageState(
    [],
    "movieDetails"
  );
  const [topPicks, setTopPicks] = useState({
    mostPopular: {},
    mostRuntime: {},
    leastRuntime: {},
    mostBudget: {},
    oldest: {},
    newest: {},
  });

  useEffect(() => {
    const fetchMovieDetails = async function () {
      try {
        setIsLoading(true);
        clearError();
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
      } catch (err) {
        handleError(err.message);
      }
    };

    if (Object.keys(lists).length > 0) {
      fetchMovieDetails();
    }
  }, [lists, getMovieDetails, handleError, clearError, setMovieDetails]);

  useEffect(() => {
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
        movieDetails.flatMap((movie) => movie.genres.map((genre) => genre.name))
      ),
    ];
    const allLanguages = [
      ...new Set(
        movieDetails.flatMap((movie) =>
          movie.spoken_languages.map((language) => language.english_name)
        )
      ),
    ];

    const mostPopular = movieDetails.reduce(
      (movie, curMovie) =>
        movie.popularity > curMovie.popularity ? movie : curMovie,
      movieDetails[0]
    );

    const mostRuntime = movieDetails.reduce(
      (movie, curMovie) =>
        movie.runtime > curMovie.runtime ? movie : curMovie,
      movieDetails[0]
    );

    const leastRuntime = movieDetails.reduce(
      (movie, curMovie) =>
        movie.runtime < curMovie.runtime ? movie : curMovie,
      movieDetails[0]
    );

    const mostBudget = movieDetails.reduce(
      (movie, curMovie) => (movie.budget > curMovie.budget ? movie : curMovie),
      movieDetails[0]
    );

    const oldest = movieDetails
      .filter((movie) => movie.release_date !== "")
      .reduce(
        (movie, curMovie) =>
          new Date(movie.release_date) < new Date(curMovie.release_date)
            ? movie
            : curMovie,
        movieDetails[0]
      );

    const newest = movieDetails
      .filter((movie) => movie.release_date !== "")
      .reduce(
        (movie, curMovie) =>
          new Date(movie.release_date) > new Date(curMovie.release_date)
            ? movie
            : curMovie,
        movieDetails[0]
      );

    setSummary({ totalRuntime, allCountries, allGenres, allLanguages });
    setTopPicks({
      mostPopular,
      mostRuntime,
      leastRuntime,
      mostBudget,
      oldest,
      newest,
    });
    setIsLoading(false);
  }, [movieDetails]);

  function deleteList(listName, callback) {
    return Swal.fire({
      title: "This action will delete the list",
      text: "Are you sure you want to proceed?",
      icon: "warning",
      iconColor: "#991b1b",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#991b1b",
      cancelButtonText: "No, keep it",
      cancelButtonColor: "#a16207",
    }).then((result) => {
      if (result.isConfirmed) {
        setListNames(listNames.filter((list) => listName !== list));
        const newLists = { ...lists };
        delete newLists[listName];
        setLists(newLists);

        callback();

        Swal.fire({
          title: "Deleted!",
          text: "Your list has been deleted.",
          icon: "success",
          iconColor: "#a16207",
          timer: 1500,
          showConfirmButton: false,
        });

        if (listNames.length === 1) setMovieDetails([]);
        return;
      }
    });
  }

  function deleteMovie(listName, movieId, callback) {
    if (lists[listName].length === 1) {
      deleteList(listName, callback);
      return;
    }

    if (lists[listName].length > 1) {
      Swal.fire({
        title: "This action will delete the movie from your list",
        text: "Are you sure you want to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#991b1b",
        cancelButtonText: "No, keep it",
        cancelButtonColor: "#a16207",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your movie has been deleted.",
            icon: "success",
            iconColor: "#a16207",
            timer: 1500,
            showConfirmButton: false,
          });
          const updatedList = lists[listName].filter(
            (movie) => movie.id !== movieId
          );
          setLists({ ...lists, [listName]: updatedList });
        }
      });
    }
  }

  return (
    <ListsContext.Provider
      value={{
        listNames,
        setListNames,
        lists,
        setLists,
        summary,
        isLoading,
        movieDetails,
        topPicks,
        deleteMovie,
        deleteList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

function useLists() {
  const context = useContext(ListsContext);
  return context;
}

export { ListsProvider, useLists };
