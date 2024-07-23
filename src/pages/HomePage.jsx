import { Outlet } from "react-router-dom";

import { useSearchQuery } from "../contexts/SearchQueryContext";

import BackgroundVideo from "../components/BackgroundVideo";

import styles from "./HomePage.module.scss";

function HomePage() {
  const { query } = useSearchQuery();
  return (
    <div className={!query ? styles.homepage : ""}>
      {!query && <BackgroundVideo />}
      {query && <Outlet />}
    </div>
  );
}
export default HomePage;
