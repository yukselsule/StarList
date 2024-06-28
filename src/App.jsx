import { MoviesProvider } from "./contexts/MoviesContext";

import MovieList from "./components/MovieList";

export default function App() {
  return (
    <MoviesProvider>
      <div>
        <MovieList />
      </div>
    </MoviesProvider>
  );
}
