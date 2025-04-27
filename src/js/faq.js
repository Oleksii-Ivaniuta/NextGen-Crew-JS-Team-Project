import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

new Accordion('.accordion');
const items = document.querySelectorAll('.ac-item');

items.forEach(item => {
  const question = item.querySelector('.ac-question');
  const button = item.querySelector('.ac-trigger');
  const answer = item.querySelector('.ac-answer');

  button.addEventListener('click', handleClick) {
    items.forEach(i =>
      i.querySelector('.ac-answer').classList.remove('active')
    );
    answer.classList.add('active');
  });
};
