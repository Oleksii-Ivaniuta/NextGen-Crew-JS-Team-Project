import Swiper from 'swiper';
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', async () => {
  const reviewsList = document.getElementById('reviews-list');

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
      initSwiper();
    } catch (error) {
      alert('Failed to load reviews: ' + error.message);
      reviewsList.innerHTML = '<li class="swiper-slide">Not found</li>';
    }
  }

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
  
    swiper.on('init', updateButtons);
    swiper.on('slideChange', updateButtons);
  
    function updateButtons() {
      const prevButton = document.querySelector('.swiper-button-prev');
      const nextButton = document.querySelector('.swiper-button-next');
  
      prevButton.disabled = swiper.isBeginning;
      nextButton.disabled = swiper.isEnd;
  
      prevButton.classList.toggle('disabled', swiper.isBeginning);
      nextButton.classList.toggle('disabled', swiper.isEnd);
    }
  }
  

  fetchReviews();
});
