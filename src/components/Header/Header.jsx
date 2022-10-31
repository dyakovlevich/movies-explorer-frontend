import { NavLink } from 'react-router-dom';
import logo from "../../images/logo_header.svg";
import { useRef } from "react";
import './Header.css';

function Header({ isAuth }) {
  
  const menuRef = useRef();
  
  const handleOpenMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "flex";
  };
  
  const handleCloseMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "";
  };
  
  return (
    <header className={`header ${isAuth ? "" : "header_dark"}`}>
      <div className='header__container'>
        <NavLink to="/" className='header__logo'>
          <img src={logo} alt="Логотип" />
        </NavLink>
        {isAuth ? (
          <nav className='header-links'>
            <ul className='header-links__list' ref={menuRef}>
              <li className='header-links__item'>
                <button className="header-links__burger-close" onClick={handleCloseMenu}></button>
              </li>
              <li className='header-links__item'>
                <NavLink to="/" className="header__link-main header-links__item-link" onClick={handleCloseMenu}>
                  Главная
                </NavLink>
              </li>
              <li className='header-links__item'>
                <NavLink to='/movies' 
                  className='header__link-movies header-links__item-link' onClick={handleCloseMenu}>
                  Фильмы
                </NavLink>
              </li>
              <li className='header-links__item'>
                <NavLink to='/saved-movies' className='header__link-saved header-links__item-link' onClick={handleCloseMenu}>
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li className='header-links__item'>
                <NavLink to='/profile' className='header__link-profile' onClick={handleCloseMenu}>
                  Аккаунт
                </NavLink>
              </li>
            </ul>
            <div className="header-links__burger" onClick={handleOpenMenu}>
              <div className="header-links__burger-line"></div>
              <div className="header-links__burger-line"></div>
              <div className="header-links__burger-line"></div>
            </div>
          </nav>
        ) : (
          <nav className='auth-links'>
            <ul className='auth-links__list'>
              <li className='auth-links__item'>
                <NavLink to='/signup' className='auth-links__registration'>
                  Регистрация
                </NavLink>
              </li>
              <li className='auth-links__item'>
                <NavLink to='/signin' className='auth-links__login'>
                  Войти
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
