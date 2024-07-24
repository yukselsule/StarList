import { Outlet, useLocation } from "react-router-dom";

import { useSearchQuery } from "../contexts/SearchQueryContext";

import BackgroundVideo from "../components/BackgroundVideo";

import styles from "./HomePage.module.scss";

function HomePage() {
  const { query } = useSearchQuery();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={styles.homepage}>
      {isHomePage && <BackgroundVideo />}
      {query && <Outlet />}
    </div>
  );
}
export default HomePage;
