import Header from '../Header/Header';
import { EMAILPATTERN, NAMEPATTERN } from '../../utils/const';
import { errorNameText, errorEmailText } from '../../utils/errors';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { updateUser } from '../../utils/api/MainApi';
import './Profile.css';

function Profile({ onSignOut, isAuth, onSetCurrentUserData }) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [messageDone, setMessageDone] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  
  useEffect(() => {
    setUserName(currentUser.name);
    setUserEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);
  
  useEffect(() => {
    if ( errorName || errorEmail ) {
      setSubmitDisabled(true);
    } else if ((userName === currentUser.name) && (userEmail === currentUser.email)) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [ errorEmail, errorName, userName, userEmail, currentUser.name, currentUser.email]);
  
  function handleChangeName(e) {
    setUserName(e.target.value);
    validationName(e.target.value);
  }
  
  function handleChangeEmail(e) {
    setUserEmail(e.target.value);
    validationEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    updateUser( userName, userEmail )
      .then((res) => {
        onSetCurrentUserData(res);
        setMessageDone('Данные успешно изменены');
        setTimeout(() => {
          setMessageDone('');
        }, 2000);
      })
      .catch((err) => console.log(err));
  }
  
  const validationEmail = (val) => {
    if (!EMAILPATTERN.test(val)) {
      setErrorEmail(errorEmailText);
    } else {
      setErrorEmail("");
    }
  };
  
  const validationName = (val) => {
    if (val.length < 2 || val.length > 30 || !NAMEPATTERN.test(val)) {
      setErrorName(errorNameText);
    } else {
      setErrorName("");
    }
  };

  return (
    <main className='landing'>
      <Header isAuth = {isAuth} />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form action="submit" className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__container">
            <label className="profile__label">
              Имя
              <input
                name="name"
                type="text"
                onChange={handleChangeName}
                value={userName}
                className="profile__input"
              ></input>
            </label>
            <label className="profile__label">
              E-mail
              <input
                name="email"
                type="text"
                onChange={handleChangeEmail}
                value={userEmail}
                className="profile__input"
              ></input>
            </label>
            <div className="profile__errors">
              <span className="profile__error">{errorName}</span>
              <span className="profile__error">{errorEmail}</span>
              <span className="profile__success">{messageDone}</span>
            </div>
          </div>
          <button type="submit" disabled={submitDisabled} className="profile__submit">
            Редактировать
          </button>
        </form>
        <Link to="/signout"  onClick={onSignOut} className="profile__logout">
          Выйти из аккаунта
        </Link>
      </section>
    </main>
  );
}

export default Profile;