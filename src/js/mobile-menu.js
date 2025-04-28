(() => {
  const refs = {
    menu: document.querySelector('[data-menu]'),
    openBtn: document.querySelector('[data-menu-open]'),
    closeBtn: document.querySelector('[data-menu-close]'),
    menuLinks: document.querySelectorAll('.menu-content nav a'),
  };

  const toggleMenu = () => {
    refs.menu.classList.toggle('is-open');
    if (refs.menu.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  refs.openBtn?.addEventListener('click', toggleMenu);
  refs.closeBtn?.addEventListener('click', toggleMenu);

  refs.menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      refs.menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) {
      refs.menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
})();
