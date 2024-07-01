import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <Logo />
      <ul className="header__list">
        <li className="header__list-item">
          <NavLink to="/friends"> Friends </NavLink>
        </li>
        <li className="header__list-item">
          <NavLink to="/profile"> Profile </NavLink>
        </li>
        <li className="header__list-item">
          <NavLink to="/gopremium"> GoPremium </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
