import { Link } from "react-router-dom";

import logo from "../assets/img/StarListLogo.png";

import styles from "./Logo.module.scss";

function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
