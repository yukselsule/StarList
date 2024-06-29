import { MoviesProvider } from "./contexts/MoviesContext";
import { SearchQueryProvider } from "./contexts/SearchQueryContext";

import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <SearchQueryProvider>
      <MoviesProvider>
        <SearchBar />
        <MovieList />
      </MoviesProvider>
    </SearchQueryProvider>
  );
}
