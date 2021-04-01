import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPass, setRegisterPass] = React.useState("");

  const handleChangeEmail = (evt) => {
    setRegisterEmail(evt.target.value);
  };
  const handleChangePass = (evt) => {
    setRegisterPass(evt.target.value);
  };

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
    props.handleRegisterUser(registerPass, registerEmail);
  }

  return (
    <section className="register">
      <form className="register__form" onSubmit={handleSubmitRegister}>
        <h2 className="register__title">Регистрация</h2>
        <input
          placeholder="Email"
          type="email"
          className="register__input"
          name="email"
          value={registerEmail}
          onChange={handleChangeEmail}
        ></input>
        <input
          placeholder="Пароль"
          type="password"
          className="register__input"
          name="password"
          value={registerPass}
          onChange={handleChangePass}
        ></input>
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
        <span className="register__text">
          Уже зарегистированы?{" "}
          <Link className="register__link" to="/sign-in">
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
}
export default Register;
