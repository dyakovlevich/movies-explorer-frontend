import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';
/* import Header from '../Header/Header';
import MainHeader from '../Header/MainHeader/MainHeader';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab'; */

function Main() {
  return (
    <main className='landing'>
      {/* <Header
        color={'header__theme_blue'}
        location={'header__container_landing'}
      >
        <MainHeader />*/}
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  );
}

export default Main;