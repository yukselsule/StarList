import Header from "../components/Header";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  return (
    <main className="homePage">
      <Header />
      <SearchBar />
      <MovieList />
    </main>
  );
}
