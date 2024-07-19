import { NavLink } from "react-router-dom";

import { useSearchQuery } from "../contexts/SearchQueryContext";

import Logo from "./Logo";
import SearchBar from "./SearchBar";

import styles from "./Header.module.scss";

function Header() {
  const { query } = useSearchQuery();
  return (
    <header className={`${styles.header} ${!query ? styles["header-bg"] : ""}`}>
      <Logo />
      <SearchBar />
      <ul
        className={`${styles.header__list} ${
          !query ? styles["header-bg__list"] : ""
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
