import './AboutMe.css';
import student from '../../../images/student.jpg';

function aboutMe() {
  return (
    <section className='aboutme'>
      <div className='aboutme__container'>
        <h2 className='aboutme__title'>Студент</h2>
        <div className='aboutme__block'>
          <div className='aboutme__info'>
            <h3 className='aboutme__name'>Виталий</h3>
            <p className='aboutme__specialization'>
              Фронтенд-разработчик, 30 лет
            </p>
            <p className='aboutme__description'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a
              className='aboutme__github-link'
              href='https://github.com/dyakovlevich'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </div>
          <img className='aboutme__photo' src={student} alt='Фото студента' />
        </div>
      </div>
    </section>
  );
}

export default aboutMe;
