import { useState, useEffect } from "react";
import { emailPattern } from '../../utils/const';
import { errorEmailText, errorPasswordText } from '../../utils/errors';
import { Link } from "react-router-dom";
import logo from "../../images/logo_header.svg";
import Input from "./Input/Input";
import './Auth.css';

function Login({onLogin, signupPageUrl}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  
  useEffect(() => {
    if ( errorEmail || errorPassword ) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [ errorEmail, errorPassword]);
  
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    validationEmail(e.target.value);
  }
  
  function handleChangePassword(e) {
    setPassword(e.target.value);
    validationPassword(e.target.value);
  }
  
  const validationEmail = (val) => {
    if (!emailPattern.test(val)) {
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!emailPattern.test(email)){
      setErrorEmail(errorEmailText);
    } else if (password.length < 1){
      setErrorPassword(errorPasswordText);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <section className="auth">
      <Link to="/" className='auth__logo'>
        <img src={logo} alt="Логотип" />
      </Link>
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
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
            <span className="auth__error">{errorEmail}</span>
            <span className="auth__error">{errorPassword}</span>
          </div>
        </div>
        <button disabled={submitDisabled} className="auth__submit">Войти</button>
        <div className="auth__link-container">
          <p className="auth__link-description">Ещё не зарегистрированы?</p>
          <Link to={signupPageUrl} className="auth__link">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;