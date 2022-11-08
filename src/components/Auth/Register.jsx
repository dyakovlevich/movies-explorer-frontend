import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EMAILPATTERN, NAMEPATTERN } from '../../utils/const';
import { errorNameText, errorEmailText, errorPasswordText } from '../../utils/errors';
import logo from "../../images/logo_header.svg";
import Input from "./Input/Input";
import './Auth.css';

function Register({onRegister, signinPageUrl}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  
  useEffect(() => {
    if ( errorName || errorEmail || errorPassword ) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [ errorName, errorEmail, errorPassword]);
  
  function handleChangeName(e) {
    setName(e.target.value);
    validationName(e.target.value);
  }
  
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    validationEmail(e.target.value);
  }
  
  function handleChangePassword(e) {
    setPassword(e.target.value);
    validationPassword(e.target.value);
  }
  
  const validationName = (val) => {
    if (val.length < 2 || val.length > 30 || !NAMEPATTERN.test(val)) {
      setErrorName(errorNameText);
    } else {
      setErrorName("");
    }
  };
  
  const validationEmail = (val) => {
    if (!EMAILPATTERN.test(val)) {
      setErrorEmail(errorEmailText);
    } else {
      setErrorEmail("");
    }
  };
  
  const validationPassword = (val) => {
    if (val.length < 1) {
      setErrorPassword(errorPasswordText);
    } else {
      setErrorPassword("");
    }
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    if (name.length < 2 || name.length > 30 || !NAMEPATTERN.test(name)) {
      setErrorName(errorNameText);
    } else if(!EMAILPATTERN.test(email)){
      setErrorEmail(errorEmailText);
    } else if (password.length < 1){
      setErrorPassword(errorPasswordText);
    } else {
      onRegister(name, email, password);
    }
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
            onChange={handleChangeName}
          />
          <Input
            type="email"
            name="email"
            title="E-mail"
            onChange={handleChangeEmail}
            placeholder="pochta@yandex.ru"
          />
          <Input
            type="password"
            name="password"
            title="Пароль"
            onChange={handleChangePassword}
          />
          <div className="auth__errors">
            <span className="auth__error">{errorName}</span>
            <span className="auth__error">{errorEmail}</span>
            <span className="auth__error">{errorPassword}</span>
          </div>
        </div>
        <button disabled={submitDisabled} className="auth__submit">Зарегистрироваться</button>
        <div className="auth__link-container">
          <p className="auth__link-description">Уже зарегистрированы?</p>
          <Link to={signinPageUrl} className="auth__link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;