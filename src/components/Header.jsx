import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Logo from "./Logo";
import SearchBar from "./SearchBar";

import styles from "./Header.module.scss";

function Header() {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(true);
  const [isResultsPage, setIsResultsPage] = useState(false);

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    setIsHomePage(isHomePage);
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    const isResultsPage = location.pathname === "/search";
    setIsResultsPage(isResultsPage);
  }, [isResultsPage, location.pathname]);

  return (
    <header
      className={`${styles.header} ${isHomePage ? styles["header-bg"] : ""}`}
    >
      <Logo />

      {isHomePage || isResultsPage ? <SearchBar /> : <div></div>}
      <ul
        className={`${styles.header__list} ${
          isHomePage ? styles["header-bg__list"] : ""
        }`}
      >
        <li>
          <NavLink to="/profile">
            <ion-icon
              className={styles["header__list-icon"]}
              name="person-circle-outline"
            ></ion-icon>
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
