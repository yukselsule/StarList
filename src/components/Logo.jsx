import { Link } from "react-router-dom";
import logo from "../assets/img/StarListLogo.png";
import "./Logo.scss";

function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="WorldWise logo" className="logo" />
    </Link>
  );
}

export default Logo;
