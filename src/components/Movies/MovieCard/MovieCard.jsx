import './MovieCard.css';
function MovieCard({ movie, saved }) {
  const moviesApiAddress = "https://api.nomoreparties.co";
  const imageUrl = movie.image.formats.thumbnail.url;
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  function handleClickButton(e) {
    const button = e.target;
    if(saved){
      
    }
    else{
      if (button.classList.contains("card__like-active")) {
        button.classList.remove("card__like-active");
      } else {
        button.classList.add("card__like-active");
      }
    }
  }

  return (
    <article className="card">
      <img className="card__img" src={`${moviesApiAddress}${imageUrl}`} alt={movie.nameRU} />
      <h3 className="card__title">{movie.nameRU}</h3>
      <button className={`card__button ${saved? "card__remove" : "card__like" }`} onClick={handleClickButton}></button>
      <p className="card__duration">{`${hours}ч ${minutes}м`}</p>
    </article>
  );
}

export default MovieCard;