import { moviesApiUrl } from "../const";

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers;
  }

  _checkResponseApi(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  
  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponseApi(res));
  }
}

export const moviesApi = new MoviesApi({
  url: moviesApiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})