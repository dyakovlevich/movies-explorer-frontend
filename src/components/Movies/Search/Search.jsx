import './Search.css';

function Search() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="search__container">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__form-wrap">
          <input type="text" className="search__input" placeholder="Фильм" required />
          <button className="search__submit" type="submit">Поиск</button>
        </div>
        <div className="search__small-wrap">
          <label class="search__switch">
            <input type="checkbox" />
            <span class="search__slider"></span>      
          </label>
          <span class="search__small">Короткометражки</span>
        </div>
      </form>
    </div>
  );
}

export default Search;