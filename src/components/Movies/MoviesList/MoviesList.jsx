import './MoviesList.css';
import { useEffect, useState } from "react";
import MovieCard from '../MovieCard/MovieCard';


function MoviesList({ saved, allMoviesRes, savedMoviesRes, savedMovies, onLike, onDelete }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesToLoad, setMoviesToLoad] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState(0);
  
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (!saved) {
      if (windowWidth <= '520') {
        setDisplayedMovies(5);
        setMoviesToLoad(2);
      } else if (windowWidth <= '768') {
        setDisplayedMovies(8);
        setMoviesToLoad(2);
      } else if (windowWidth <= '1024') {
        setDisplayedMovies(12);
        setMoviesToLoad(3);
      } else {
        setDisplayedMovies(16);
        setMoviesToLoad(4);
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