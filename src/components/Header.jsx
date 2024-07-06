import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <ul className={styles.header__list}>
        <li className={styles["header__list-item"]}>
          <NavLink to="/friends">Friends</NavLink>
        </li>
        <li className={styles["header__list-item"]}>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li className={styles["header__list-item"]}>
          <NavLink to="/gopremium">GoPremium</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
