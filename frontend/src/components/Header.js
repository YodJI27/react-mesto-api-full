import React from "react";
import { useLocation } from "react-router";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const locationLink = useLocation();

  const linkSwitch = () =>
    locationLink.pathname === "/sign-in" ? (
      <Link className="header__text" to="/sign-up">
        Регистрация
      </Link>
    ) : (
      <Link className="header__text" to="/sign-in">
        Войти
      </Link>
    );

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место"></img>
      {props.loggedIn ? (
        <div className="header__box">
          <p className="header__email">{props.headerEmail}</p>
          <a className="header__title" onClick={props.logOut}>Выйти</a>
        </div>
      ) : (
        linkSwitch()
      )}
    </header>
  );
}
export default Header;
