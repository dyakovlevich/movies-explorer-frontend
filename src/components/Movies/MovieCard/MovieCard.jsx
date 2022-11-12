import './MovieCard.css';
function MovieCard({ movie, saved, onLike, onDelete, isLiked = false }) {
  const moviesApiAddress = "https://api.nomoreparties.co";
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  

  function handleClickButton(e) {
    const button = e.target;
    if(saved){
      onDelete(movie);
    }
    else{
      if (button.classList.contains("card__like-active")) {
        button.classList.remove("card__like-active");
        onDelete(movie);
      } else {
        onLike(movie);
        button.classList.add("card__like-active");
      }
    }
  }

  return (
    <article className="card">
      <a className="card__preview" href={movie.trailerLink} target="_blank" rel="noreferrer">
      <img className="card__img" src={movie.thumbnail || moviesApiAddress + movie.image.formats.thumbnail.url} alt={movie.nameRU} />
      </a>
      <h3 className="card__title">{movie.nameRU}</h3>
      <button className={`card__button ${isLiked? "card__like-active" : "" } ${saved? "card__remove" : "card__like" }`} onClick={handleClickButton}></button>
      <p className="card__duration">{`${(hours > 0)? hours + 'ч ' : ""}${minutes}м`}</p>
    </article>
  );
}

export default MovieCard;