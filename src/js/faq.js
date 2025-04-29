import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const buttons = document.querySelectorAll('.ac-trigger');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const currentItem = button.closest('.ac-item');
    const isActive = currentItem.classList.contains('active');

    document.querySelectorAll('.ac-item').forEach(item => {
      item.classList.remove('active');
    });

    if (!isActive) {
      currentItem.classList.add('active');
    }
  });
});

document.querySelector('.ac-item')?.classList.add('active');
