//import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo_header.svg";
import Input from "./Input/Input";
import './Auth.css';

function Register() {
  
  const handleChange = (e) => {
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="auth">
      <Link to="/" className='auth__logo'>
        <img src={logo} alt="Логотип" />
      </Link>
      <h2 className="auth__title">Добро пожаловать!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <Input
            type="text"
            name="name"
            title="Имя"
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            title="E-mail"
            onChange={handleChange}
            placeholder="pochta@yandex.ru"
          />
          <Input
            type="password"
            name="password"
            title="Пароль"
            onChange={handleChange}
          />
        </div>
        <button className="auth__submit">Зарегистрироваться</button>
        <div className="auth__link-container">
          <p className="auth__link-description">Уже зарегистрированы?</p>
          <Link to="/signin" className="auth__link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;