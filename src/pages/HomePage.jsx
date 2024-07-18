import { Outlet } from "react-router-dom";

import { useSearchQuery } from "../contexts/SearchQueryContext";

import BackgroundVideo from "../components/BackgroundVideo";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "./HomePage.module.scss";

function HomePage() {
  const { query } = useSearchQuery();
  return (
    <div className={!query ? styles.homepage : ""}>
      <Header />
      {!query && <BackgroundVideo />}
      <main className="container">{query && <Outlet />}</main>
      {query && <Footer />}
    </div>
  );
}
export default HomePage;
