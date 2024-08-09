import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useMovies } from "../contexts/MoviesContext";
import { useSearchQuery } from "../contexts/SearchQueryContext";

import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

import styles from "./ResultsPage.module.scss";

function ResultsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const { setQuery } = useSearchQuery();
  const { totalPages } = useMovies();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery, setQuery]);

  return (
    <div className={`container ${styles["results-page"]}  `}>
      <MovieList />
      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default ResultsPage;
