const projects = document.querySelectorAll('.projects-item');
const loadBtnEl = document.querySelector('.load-btn');
const projectsToShow = 3;

let visibleCount = 0;

projects.forEach((project, index) => {
  if (index >= projectsToShow) {
    project.classList.add('hidden');
  } else {
    visibleCount++;
  }
});

loadBtnEl.addEventListener('click', () => {
  const nextCount = visibleCount + projectsToShow;
  const firstNewIndex = visibleCount;

  setTimeout(() => {
    for (let i = visibleCount; i < nextCount && i < projects.length; i++) {
      projects[i].classList.remove('hidden');
    }

    const targetEl = projects[firstNewIndex];
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      window.scrollBy({
        top: rect.top,
        behavior: 'smooth',
      });
    }

    visibleCount = nextCount;

    if (visibleCount >= projects.length) {
      loadBtnEl.style.display = 'none';
    }
  }, 250);
});
