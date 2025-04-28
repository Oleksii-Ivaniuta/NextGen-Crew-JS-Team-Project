import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const items = document.querySelectorAll('.ac-item');

items.forEach(item => {
  const button = item.querySelector('.ac-trigger');
  const question = item.querySelector('.ac-question');
  const answer = item.querySelector('.answer');

  button.addEventListener('click', () => {
    items.forEach(i => {
      const otherAnswer = i.querySelector('.answer');
      otherAnswer.classList.remove('active');
    });
    answer.classList.toggle('active');
    items.classList.toggle('active');
  });
});

// items.forEach(item => {
//   const button = item.querySelector('.ac-trigger');
//   button.addEventListener('click', () => {
//     items.forEach(i => {
//       if (i !== item) {
//         i.classList.remove('active');
//       }
//     });
//     items.classList.toggle('active');
//   });
// });
