import './MoviesList.css';
import { useEffect, useState } from "react";
import MovieCard from '../MovieCard/MovieCard';
import savedMoviesArray from '../../../utils/moviessaved';
import MoviesArray from '../../../utils/movies';

function MoviesList({ saved }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesToLoad, setMoviesToLoad] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState(0);
  const moviesList = saved? savedMoviesArray : MoviesArray;
  
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (!saved) {
      console.log(windowWidth);
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
  }, [windowWidth, saved]);
  
  function handleClickMoreMovies() {
    setDisplayedMovies(displayedMovies + moviesToLoad);
  }

  return (
    <div className="cards__container">
      
      <div className="cards__list">
        {moviesList.slice(0, displayedMovies).map((movie) => (
          <MovieCard saved={saved} movie={movie} key={movie.id} />
        ))}
      </div>

      {displayedMovies < moviesList.length && (
        <button className="cards__more" onClick={handleClickMoreMovies}>Ещё</button>
      )}
      
    </div>
  );
}

export default MoviesList;