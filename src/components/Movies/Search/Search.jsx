import './Search.css';
import { useState, useEffect } from "react";

function Search({saved, onSubmit, onShortToggle, phrase, savedPhrase, short, savedShort}) {
  const [typingPhrase, setTypingPhrase] = useState("");
  
  useEffect(() => {
    setTypingPhrase((saved? savedPhrase : phrase ));
  }, [saved, phrase, savedPhrase]);
  
  function handleTypingPhrase(e) {
    setTypingPhrase(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(typingPhrase);
  }
  
  
  return (
    <div className="search__container">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__form-wrap">
          <input type="text" className="search__input" value={typingPhrase} onChange={handleTypingPhrase} />
          <button className="search__submit" type="submit">Поиск</button>
        </div>
        <div className="search__small-wrap">
          <label className="search__switch">
            <input type="checkbox" checked={saved? savedShort : short } onChange={onShortToggle}/>
            <span className="search__slider"></span>      
          </label>
          <span className="search__small">Короткометражки</span>
        </div>
      </form>
    </div>
  );
}

export default Search;