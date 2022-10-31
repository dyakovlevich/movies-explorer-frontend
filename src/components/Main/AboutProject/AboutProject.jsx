import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about'>
      <div className='about__container'>
        <h2 className='about__title'>О проекте</h2>
        <ul className='about__list'>
          <li className='about__item'>
            <h3 className='about__item-title'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='about__item-text'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className='about__item'>
            <h3 className='about__item-title'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='about__item-text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className='about__line'>
          <li className='about__line-item'>
            <p className='about__line-time about__line-time_blue'>
              1 неделя
            </p>
            <p className='about__line-technology'>Back-end</p>
          </li>
          <li className='about__line-item'>
            <p className='about__line-time about__line-time_grey'>
              4 недели
            </p>
            <p className='about__line-technology'>Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;