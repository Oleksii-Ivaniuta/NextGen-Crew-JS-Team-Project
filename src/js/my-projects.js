const projects = [
  {
    img: 'img/my-projects/energyflow_desc@1x.jpg',
    img2x: 'img/my-projects/energyflow_desc@2x.jpg',
    desc: 'React, JavaScript, Node JS, Git',
    subtitle: 'energy flow webservice',
    link: 'https://oleksii-ivaniuta.github.io/NextGen-Crew-JS-Team-Project/',
  },
  {
    img: 'img/my-projects/power_desc@1x.jpg',
    img2x: 'img/my-projects/power_desc@2x.jpg',
    desc: 'React, JavaScript, Node JS, Git',
    subtitle: 'power pulse webservice',
    link: 'https://oleksii-ivaniuta.github.io/NextGen-Crew-JS-Team-Project/',
  },
  {
    img: 'img/my-projects/fruitbox_desc@1x.jpg',
    img2x: 'img/my-projects/fruitbox_desc@2x.jpg',
    desc: 'React, JavaScript, Node JS, Git',
    subtitle: 'fruitbox online store',
    link: 'https://oleksii-ivaniuta.github.io/NextGen-Crew-JS-Team-Project/',
  },
  {
    img: 'img/my-projects/jewelry_desc@1x.jpg',
    img2x: 'img/my-projects/jewelry_desc@2x.jpg',
    desc: 'React, JavaScript, Node JS, Git',
    subtitle: 'chego jewelry website',
    link: 'https://oleksii-ivaniuta.github.io/NextGen-Crew-JS-Team-Project/',
  },
  {
    img: 'img/my-projects/mimino_desc@1x.jpg',
    img2x: 'img/my-projects/mimino_desc@2x.jpg',
    desc: 'React, JavaScript, Node JS, Git',
    subtitle: 'mimino website',
    link: 'https://oleksii-ivaniuta.github.io/NextGen-Crew-JS-Team-Project/',
  },
  {
    img: 'img/my-projects/starlight_desc@1x.jpg',
    img2x: 'img/my-projects/starlight_desc@2x.jpg',
    desc: 'React, JavaScript, Node JS, Git',
    subtitle: 'starlight studio landing page',
    link: 'https://oleksii-ivaniuta.github.io/NextGen-Crew-JS-Team-Project/',
  },
  {
    img: 'img/my-projects/vyshyvanka_desc@1x.jpg',
    img2x: 'img/my-projects/vyshyvanka_desc@2x.jpg',
    desc: 'React, JavaScript, Node JS, Git',
    subtitle: 'vyshyvanka vibes Landing Page',
    link: 'https://oleksii-ivaniuta.github.io/NextGen-Crew-JS-Team-Project/',
  },
];

const containerEl = document.querySelector('.projects-list');
const loadBtnEl = document.querySelector('.load-btn');

function createProjectMarkup(elements) {
  return elements
    .map(({ img, img2x, desc, subtitle, link }) => {
      return `<li class="projects-item">
        <img src="${img}" srcset="${img} 1x, ${img2x} 2x" alt="${subtitle}" />
        <p class="project-desc">${desc}</p>
        <div class="projects-subtitle-wrapper">
          <h3 class="projects-subtitle">${subtitle}</h3>
          <a href="${link}" target="_blank">
            Visit
            <svg class="project-icon">
              <use href="img/my-projects/arrow-sprite.svg#arrow-icon"></use>
            </svg>
          </a>
        </div>
      </li>`;
    })
    .join('');
}

let index = 0;

loadBtnEl.addEventListener('click', () => {
  const remainingProjects = projects.slice(index, index + 3);
  const currentItems = containerEl.querySelectorAll('.projects-item');
  const currentCount = currentItems.length;
  setTimeout(() => {
    containerEl.insertAdjacentHTML(
      'beforeend',
      createProjectMarkup(remainingProjects)
    );
    index += 3;

    if (index >= projects.length) {
      loadBtnEl.style.display = 'none';
    }

    const updatedItems = containerEl.querySelectorAll('.projects-item');
    const firstNewItem = updatedItems[currentCount];

    const img = firstNewItem?.querySelector('img');
    if (img) {
      if (img.complete) {
        scrollToElement(firstNewItem);
      } else {
        img.onload = () => scrollToElement(firstNewItem);
      }
    }
  }, 400);
});

function scrollToElement(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const offsetTop = rect.top + scrollTop;

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth',
  });
}
