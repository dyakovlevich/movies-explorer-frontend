import './MoviesList.css';
import { useEffect, useState } from "react";
import MovieCard from '../MovieCard/MovieCard';
import { 
  SM_BREAKPOINT,
  SM_DISPLAYED,
  SM_TO_LOAD,
  MD_BREAKPOINT,
  MD_DISPLAYED,
  MD_TO_LOAD,
  LG_BREAKPOINT,
  LG_DISPLAYED,
  LG_TO_LOAD,
  XL_DISPLAYED,
  XL_TO_LOAD,
  } from '../../../utils/const';


function MoviesList({ saved, allMoviesRes, savedMoviesRes, savedMovies, onLike, onDelete }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesToLoad, setMoviesToLoad] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState(0);
  
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (!saved) {
      if (windowWidth <= SM_BREAKPOINT) {
        setDisplayedMovies(SM_DISPLAYED);
        setMoviesToLoad(SM_TO_LOAD);
      } else if (windowWidth <= MD_BREAKPOINT) {
        setDisplayedMovies(MD_DISPLAYED);
        setMoviesToLoad(MD_TO_LOAD);
      } else if (windowWidth <= LG_BREAKPOINT) {
        setDisplayedMovies(LG_DISPLAYED);
        setMoviesToLoad(LG_TO_LOAD);
      } else {
        setDisplayedMovies(XL_DISPLAYED);
        setMoviesToLoad(XL_TO_LOAD);
      };
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowWidth, saved, allMoviesRes]);
  
  
  
  function handleClickMoreMovies() {
    setDisplayedMovies(displayedMovies + moviesToLoad);
  }

  
  

  return (
    <div className="cards__container">
      
      <div className="cards__list">
        {!saved && allMoviesRes.slice(0, displayedMovies).map((movie) => {
          const liked = (savedMovies.find((item) => Number(item.movieId) === ( movie.id || movie.movieId)))? true : false;
          return (
            <MovieCard saved={saved} movie={movie} isLiked={liked} key={movie.id || movie._id} onLike={onLike} onDelete={onDelete}/>
          )
        }
        )}
        {saved && savedMoviesRes.map((movie) => {
          return (
            <MovieCard saved={saved} movie={movie} key={movie.id || movie._id} onLike={onLike} onDelete={onDelete}/>
          )
        }
        )}
        {((saved && savedMoviesRes.length === 0) || (!saved && allMoviesRes.length === 0)) && (
          <div className="cards__empty">Фильмов не найдено</div>
        )}
      </div>

      {!saved && displayedMovies < allMoviesRes.length && (
        <button className="cards__more" onClick={handleClickMoreMovies}>Ещё</button>
      )}
      
    </div>
  );
}

export default MoviesList;