import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const buttons = document.querySelectorAll('.ac-trigger');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const currentItem = button.closest('.ac-item');
    const isActive = currentItem.classList.contains('active');

    document
      .querySelectorAll('.ac-item')
      .forEach(item => item.classList.remove('active'));

    if (!isActive) {
      currentItem.classList.add('active');
    }
  });
});

document.querySelector('.ac-item')?.classList.add('active');

// items.forEach(item => {
//   const button = item.querySelector('.ac-trigger');
//   const question = item.querySelector('.ac-question');
//   const answer = item.querySelector('.answer');

//   button.addEventListener('click', () => {
//     items.forEach(i => {
//       const otherAnswer = i.querySelector('.answer');
//       otherAnswer.classList.remove('active');
//     });
//     answer.classList.toggle('active');
//     items.classList.toggle('active');
//   });
// });

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
