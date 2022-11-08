import { moviesApi } from "../const";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}`);
}

export const register = (name, email, password) => {
  return fetch(`${moviesApi}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: name,
      password: password,
      email: email,
    }),
  })
  .then(checkResponse)
};

export const login = (email, password) => {
  return fetch(`${moviesApi}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
  .then(checkResponse)
};

export const updateUser = (name, email) => {
  return fetch(`${moviesApi}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
  .then(checkResponse)
};

export const likeMovie = (movie) => {
  return fetch(`${moviesApi}/movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id.toString(),
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  })
    .then(checkResponse)
};

export const deleteMovie = (_id) => {
  return fetch(`${moviesApi}/movies/${_id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(checkResponse)
};

export const getMovies = () => {
  return fetch(`${moviesApi}/movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
};

export const signOut = () => {
  return fetch(`${moviesApi}/signout`, {
    method: "DELETE",
    credentials: "include",
  })
  .then(checkResponse)
};

export const checkToken = () => {
  return fetch(`${moviesApi}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })
    .then(checkResponse)
};

