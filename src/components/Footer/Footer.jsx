import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <h3 className='footer__copyright'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <ul className='footer__list'>
          <li className='footer__item'>
            <a
              href='https://practicum.yandex.ru/'
              className='footer__link'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__item'>
            <a
              href='https://github.com/dyakovlevich'
              className='footer__link'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
          <li className='footer__item footer__date'>
            ©{new Date().getFullYear()}
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
