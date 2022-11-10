import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from './Search/Search';
import Preloader from '../Preloader/Preloader';
import MoviesList from './MoviesList/MoviesList';
import { useEffect, useState, useContext } from "react";
import { useNavigate} from 'react-router-dom';
import { moviesApi } from '../../utils/api/MoviesApi';
import { likeMovie, getMovies, deleteMovie } from '../../utils/api/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SHOT_MOVIE_LONG } from '../../utils/const';

function Movies({saved, isAuth, movies}) {
  const history = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  
  const [allMoviesResult, setAllMoviesResult] = useState([]);
  const [savedMoviesResult, setSavedMoviesResult] = useState([]);
  
  const [phrase, setPhrase] = useState("");
  const [savedPhrase, setSavedPhrase] = useState("");
  const [short, setShort] = useState(false);
  const [savedShort, setSavedShort] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    if (isAuth) {
      setShowPreloader(true);
      if (localStorage.getItem("allMovies")) {
        setAllMovies(JSON.parse(localStorage.getItem("allMovies")));
        setAllMoviesResult(JSON.parse(localStorage.getItem("allMovies")));
      } else {
        moviesApi.getMovies().then((resp) => {
          localStorage.setItem("allMovies", JSON.stringify(resp));
          setAllMovies(resp);
          setAllMoviesResult(resp);
        })
        .catch((err) => console.log(err));
      }
      
      if (localStorage.getItem("savedMovies")) {
        setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
        setSavedMoviesResult(JSON.parse(localStorage.getItem("savedMovies")));
      } else {
        getMovies().then((resp) => {
          resp = resp.filter(
            (item) => item.owner === currentUser._id
          );
          localStorage.setItem("savedMovies", JSON.stringify(resp));
          setSavedMovies(resp);
          setSavedMoviesResult(resp);
        })
        .catch((err) => console.log(err));
      }
      
      if (localStorage.getItem("phrase")) {
        setPhrase(localStorage.getItem("phrase"));
      }
      if (localStorage.getItem("short")) {
        setShort(localStorage.getItem("short") === "true");
      }
      if (localStorage.getItem("allMoviesResult")) {
        setAllMoviesResult(JSON.parse(localStorage.getItem("allMoviesResult")));
      }
      setTimeout(() => {
        setShowPreloader(false);
      }, 500);
    }
  }, [isAuth, currentUser._id]);
  
  useEffect(() => {
    setSavedPhrase("");
    setSavedShort(false);
  }, [history]);
  
  useEffect(() => {
    const searchMoviesResult = searchMovies(savedMovies, savedPhrase, savedShort);
    setSavedMoviesResult(searchMoviesResult);
  }, [savedMovies, savedPhrase, savedShort]);

  useEffect(() => {
      const searchMoviesResult = searchMovies(allMovies, phrase, short);
      setAllMoviesResult(searchMoviesResult);
      localStorage.setItem("allMoviesResult", JSON.stringify(searchMoviesResult));
  }, [allMovies, phrase, short]);
  
  function handleLike(movie) {
    likeMovie(movie)
      .then((res) => {
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([res.movie, ...savedMovies])
        );
        setSavedMovies([res.movie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  };
  
  function handleDelete(movie) {    
    const removeMovie = savedMovies.find(
      (item) => Number(item.movieId) === ( movie.id || movie.movieId)
    );
    if (removeMovie === undefined) {
    } else {
      deleteMovie(removeMovie._id)
        .then(() => {
          const savedMoviesWithout = savedMovies.filter(
            (item) => item.movieId !== removeMovie.movieId
          );
          setSavedMovies(savedMoviesWithout);
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(savedMoviesWithout)
          );
        })
        .catch((err) => console.log(err));
    }
  };
  
  function handleShortToggle(val) {
    if(saved){
      setSavedShort(val.target.checked);
    } else {
      setShort(val.target.checked);
      localStorage.setItem("short", val.target.checked);
    }
  };
  
  function searchMovies(dataMovies = [], request = "", short = false) {
    let arrMovies = dataMovies ? Array.from(dataMovies) : [];
    if (short) {
      arrMovies = arrMovies.filter((item) => item.duration < SHOT_MOVIE_LONG);
    }
    return arrMovies.filter((item) => item.nameRU.toLowerCase().includes(request.toLowerCase()));
  };
  
  function handleSubmitSearch(phrase) {
    if(saved){
      setSavedPhrase(phrase);
    } else {
      setPhrase(phrase);
      localStorage.setItem("phrase", phrase);
    }
  }

  return (
    <main className='landing'>
      {showPreloader && <Preloader />}
      <Header isAuth = {isAuth} />
      <Search 
        saved={saved} 
        phrase={phrase} 
        savedPhrase={savedPhrase} 
        short={short}
        savedShort={savedShort}
        onSubmit={handleSubmitSearch}
        onShortToggle={handleShortToggle}
      />
      <MoviesList 
        saved={saved} 
        allMoviesRes={allMoviesResult} 
        savedMoviesRes={savedMoviesResult}
        savedMovies={savedMovies} 
        onLike={handleLike} 
        onDelete={handleDelete} 
      />
      <Footer />
    </main>
  );
}

export default Movies;