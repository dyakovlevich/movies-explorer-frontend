import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <a
              className='portfolio__website'
              href='https://github.com/dyakovlevich/russian-travel'
              target='_blank'
              rel='noreferrer'
            >
              <span>Статичный сайт</span> 
              <span>↗</span>
            </a>
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__website'
              href='https://github.com/dyakovlevich/russian-travel'
              target='_blank'
              rel='noreferrer'
            >
              <span>Адаптивный сайт</span> 
              <span>↗</span>
            </a>
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__website'
              href='https://github.com/dyakovlevich/react-mesto-api-full'
              target='_blank'
              rel='noreferrer'
            >
              <span>Одностраничное приложение</span> 
              <span>↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
