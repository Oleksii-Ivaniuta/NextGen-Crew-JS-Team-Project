import Swiper from 'swiper';
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';

document.addEventListener('DOMContentLoaded', async () => {
  const reviewsList = document.getElementById('reviews-list');

  // Функция для загрузки отзывов с сервера
  async function fetchReviews() {
    try {
      const response = await fetch('https://portfolio-js.b.goit.study/api/reviews');
      if (!response.ok) {
        throw new Error('Server error');
      }

      const reviews = await response.json();

      if (!Array.isArray(reviews) || reviews.length === 0) {
        throw new Error('No reviews found');
      }

      renderReviews(reviews);
      initSwiper();  // Важно, чтобы эта функция вызывалась здесь, после загрузки отзывов
    } catch (error) {
      alert('Failed to load reviews: ' + error.message);
      reviewsList.innerHTML = '<li class="swiper-slide">Not found</li>';
    }
  }

  // Функция для рендеринга отзывов
  function renderReviews(reviews) {
    reviewsList.innerHTML = '';
  
    reviews.forEach(({ avatar_url, author, review }) => {
      const li = document.createElement('li');
      li.classList.add('swiper-slide');
      li.innerHTML = `
          <p class="reviews-article">${review}</p>
          <div style="display: flex; margin-top: 24px; align-items: center;">
            <img src="${avatar_url}" alt="Avatar of ${author}" width="40" height="40" style="border-radius: 50%; margin-right: 15px;">
            <h3 style="font-size: 16px;">${author}</h3>
          </div>
      `;
      reviewsList.appendChild(li);
    });
  }

  // Функция для инициализации Swiper
  function initSwiper() {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Keyboard, Mousewheel],
      slidesPerView: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 2,
        },
      },
    });

    // Сначала делаем кнопку влево скрытой
    const prevButton = document.querySelector('.swiper-button-prev');
    prevButton.classList.add('swiper-button-disabled');  // Кнопка слева неактивна изначально

    swiper.on('init', updateButtons);
    swiper.on('slideChange', updateButtons);

    function updateButtons() {
      const prevButton = document.querySelector('.swiper-button-prev');
      const nextButton = document.querySelector('.swiper-button-next');

      // Кнопка "предыдущий слайд" появляется, только если не на первом слайде
      if (swiper.isBeginning) {
        prevButton.classList.add('swiper-button-disabled');
      } else {
        prevButton.classList.remove('swiper-button-disabled');
      }

      // Кнопка "следующий слайд" скрывается, если на последнем слайде
      if (swiper.isEnd) {
        nextButton.classList.add('swiper-button-disabled');
      } else {
        nextButton.classList.remove('swiper-button-disabled');
      }
    }
  }

  // Вызов функции для загрузки отзывов
  fetchReviews();
});
