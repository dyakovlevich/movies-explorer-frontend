import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from './Search/Search';
import MoviesList from './MoviesList/MoviesList';

/* import Header from '../Header/Header';
import MainHeader from '../Header/MainHeader/MainHeader';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab'; */

function Movies({saved}) {
  return (
    <main className='landing'>
      <Header isAuth = 'true' />
      <Search />
      <MoviesList saved={saved} />
      <Footer />
    </main>
  );
}

export default Movies;