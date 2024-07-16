import { NavLink } from "react-router-dom";

import { useSearchQuery } from "../contexts/SearchQueryContext";

import Logo from "./Logo";

import styles from "./Header.module.scss";

function Header() {
  const { query } = useSearchQuery();
  return (
    <header
      className={`${styles.header} ${!query ? styles["header-bg"] : ""} `}
    >
      <Logo />
      <ul
        className={`${styles.header__list} ${
          !query ? styles["header-bg__list"] : ""
        } `}
      >
        <li>
          <NavLink to="/friends">Friends</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/gopremium">GoPremium</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
