import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import LoginPage from '../Auth/Login';
import RegistrationPage from '../Auth/Register';
import {register, login, signOut, checkToken} from '../../utils/api/MainApi';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useEffect, useState } from "react";

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  
  const history = useNavigate();
  
  //User logged
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  
  //Path
  const signupPageUrl = '/signup';
  const signinPageUrl = '/signin';
  const profilePageUrl = '/profile';
  const mainPageUrl = '/';
  const moviesPageUrl = '/movies';
  const savedMoviesPageUrl = '/saved-movies';
  
  useEffect(() => {
    checkToken()
      .then((resp) => {
        setCurrentUser(resp);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        if (err === '400') {
          console.log("400 — Токен не передан или передан не в том формате");
        }
        else if (err === '401') {
          console.log("401 — Переданный токен некорректен");
        }
      });
    
  }, [isLoggedIn]);
  
  //Авторизация
  function handleLoginSubmit(email, password) {
    login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        //setEmail(email);
        history("/movies");
      })
      .catch((err) => {
        if (err === '400') {
          console.log("400 - не передано одно из полей");
        } 
        else if (err === '401') {
          console.log("401 - пользователь с email не найден");
        }
        //setIsInfoTooltipOpen(true);
        //setIsSuccess(false);
      });
  }  
  
  //Регистрация
  function handleRegisterSubmit(name, email, password) {
    register(name, email, password)
      .then((res) => {
        handleLoginSubmit(email, password);
      })
      .catch((err) => {
        if (err === '400') {
          console.log("400 - некорректно заполнено одно из полей");
        }
      });
  }
  
  //Установка данных пользователя  
  const setCurrentUserHandler = (data) => {
    setCurrentUser(data);
  };
  
  //Выход из аккаунта
  function handleSignOut() {
    signOut()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("allMovies");
        localStorage.removeItem("allMoviesResult");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("savedMoviesResult");
        localStorage.removeItem("phrase");
        localStorage.removeItem("savedPhrase");
        localStorage.removeItem("short");
        localStorage.removeItem("savedShort");
        history("/");
      })
      .catch((err) => {
        console.log(`Ошибка при выходе. ${err}`);
      })    
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>

        <Routes>
          <Route 
            path={mainPageUrl} 
            element={<Main isAuth={isLoggedIn} />}
          
          />
          <Route 
            path={moviesPageUrl} 
            element={
              <ProtectedRoute isLogged={isLoggedIn} isUnauthNavigateTo={mainPageUrl}>
                <Movies saved={false} isAuth={isLoggedIn} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path={savedMoviesPageUrl} 
            element={
              <ProtectedRoute isLogged={isLoggedIn} isUnauthNavigateTo={mainPageUrl}>
                <Movies saved={true} isAuth={isLoggedIn}  />
              </ProtectedRoute>
            } 
          />
          <Route 
            path={profilePageUrl} 
            element={
              <ProtectedRoute isLogged={isLoggedIn} isUnauthNavigateTo={mainPageUrl}>
                <Profile onSignOut={handleSignOut} isAuth={isLoggedIn} onSetCurrentUserData={setCurrentUserHandler}  />
              </ProtectedRoute>
            }
          />
          <Route 
            path={signupPageUrl} 
            element={isLoggedIn? (<Navigate to={mainPageUrl} />) : (<RegistrationPage onRegister={handleRegisterSubmit} signinPageUrl={signinPageUrl} />)}
           />
          <Route 
            path={signinPageUrl} 
            element={isLoggedIn? (<Navigate to={mainPageUrl} />) : (<LoginPage onLogin={handleLoginSubmit} signupPageUrl={signupPageUrl} />)} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;