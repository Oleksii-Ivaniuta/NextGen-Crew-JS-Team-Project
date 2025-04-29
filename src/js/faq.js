import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const buttons = document.querySelectorAll('.ac-trigger');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const currentItem = button.closest('.ac-item');
    const isActive = currentItem.classList.contains('active');

    document.querySelectorAll('.ac-item').forEach(item => {
      item.classList.remove('active');
      const svgBtn = item.querySelector('.trigger-icon use');
      if (svgBtn)
        svgBtn.setAttribute('href', './img/sprite.svg#icon-down');
    });

    if (!isActive) {
      currentItem.classList.add('active');
      const svgBtn = currentItem.querySelector('.trigger-icon use');
      if (svgBtn)
        svgBtn.setAttribute('href', './img/sprite.svg#icon-up');
    }
  });
});

document.querySelector('.ac-item')?.classList.add('active');
const firstItem = document.querySelector('.ac-item');
const firstSvg = firstItem?.querySelector('.trigger-icon use');
if (firstSvg) firstSvg.setAttribute('href', '../img/faq/icons-faq.svg#icon-up');
