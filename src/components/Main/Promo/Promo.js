import './Promo.css';
import logo from "../../../images/logo.svg";

function promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
      
        <div className='promo__block'>
          <h2 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h2>
          <p className='promo__description'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a
            className='promo__link'
            href='https://github.com/dyakovlevich'
            target='_blank'
            rel='noreferrer'
          >Узнать больше</a>
        </div>
        
        <div className='promo__logo'>
          <img className='promo__logo-img' src={logo} alt="Логотип веб шара" />
        </div>
      </div>
    </section>
  );
}

export default promo;
