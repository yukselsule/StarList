import Header from "../components/Header";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main className="home-page">
        <SearchBar />
        <MovieList />
      </main>
    </div>
  );
}
