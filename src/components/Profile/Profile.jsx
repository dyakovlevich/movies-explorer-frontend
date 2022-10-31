import Header from '../Header/Header';
import { useState } from "react";
import { Link } from "react-router-dom";
import './Profile.css';

function Profile({ user = {'name': 'Виталий', 'email': 'pochta@yandex.ru'} }) {
  const [userInfo, setUserInfo] = useState({ name: user.name, email: user.email });

  function handleChange(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className='landing'>
      <Header isAuth = 'true' />
      <section className="profile">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form action="submit" className="profile__form">
          <label className="profile__label">
            Имя
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={userInfo.name}
              className="profile__input"
            ></input>
          </label>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              type="text"
              onChange={handleChange}
              value={userInfo.email}
              className="profile__input"
            ></input>
          </label>
          <button type="submit" className="profile__submit" onClick={handleSubmit}>
            Редактировать
          </button>
        </form>
        <Link to="/signout" className="profile__logout">
          Выйти из аккаунта
        </Link>
      </section>
    </main>
  );
}

export default Profile;