import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useSearchQuery } from "../contexts/SearchQueryContext";
import Footer from "../components/Footer";

function HomePage() {
  const { query } = useSearchQuery();
  return (
    <div>
      <Header />
      <main className="container">
        <SearchBar />
        {query ? <Outlet /> : null}
      </main>
      <Footer />
    </div>
  );
}
export default HomePage;
