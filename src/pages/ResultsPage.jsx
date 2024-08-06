import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useSearchQuery } from "../contexts/SearchQueryContext";

import MovieList from "../components/MovieList";

function ResultsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const { setQuery } = useSearchQuery();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery, setQuery]);

  return (
    <div className="container">
      <MovieList />
    </div>
  );
}

export default ResultsPage;
