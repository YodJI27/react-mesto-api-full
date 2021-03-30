import React from "react";

function Login(props) {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPass, setRegisterPass] = React.useState("");

  const handleChangeEmail = (evt) => {
    setRegisterEmail(evt.target.value);
  };
  const handleChangePass = (evt) => {
    setRegisterPass(evt.target.value);
  };

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    props.handleLoginUser(registerPass, registerEmail);
  }

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmitLogin}>
        <h2 className="login__title">Вход</h2>
        <input
          placeholder="Email"
          type="email"
          className="login__input"
          name="email"
          value={registerEmail}
          onChange={handleChangeEmail}
        ></input>
        <input
          placeholder="Пароль"
          type="password"
          className="login__input"
          name="password"
          value={registerPass}
          onChange={handleChangePass}
        ></input>
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </section>
  );
}
export default Login;
