import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { useSearchQuery } from "../contexts/SearchQueryContext";

import BackgroundVideo from "../components/BackgroundVideo";

import styles from "./HomePage.module.scss";

function HomePage() {
  const { query } = useSearchQuery();
  return (
    <div className={!query && styles.homepage}>
      <Header />
      {!query && <BackgroundVideo />}
      <main className="container">
        <SearchBar />
        {query ? <Outlet /> : null}
      </main>
      {query && <Footer />}
    </div>
  );
}
export default HomePage;
