const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.site-nav-toggle');
const siteNav = document.querySelector('#site-nav');

if (siteHeader && navToggle && siteNav) {
  const setMenuOpen = (isOpen) => {
    siteHeader.classList.toggle('site-header--nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('.site-nav__link')) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 761px)').matches) {
      setMenuOpen(false);
    }
  });
}

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle('back-to-top--visible', window.scrollY > 360);
  };

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
}

const hero = document.querySelector('.hero');
const heroDots = Array.from(document.querySelectorAll('.hero__dot'));
const heroAnnouncer = document.querySelector('#hero-slide-announcer');
let heroActiveIndex = 0;
let heroAutoplayId = null;
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const setHeroSlide = (index, options = {}) => {
  if (!hero || heroDots.length === 0) {
    return;
  }

  const normalizedIndex = (index + heroDots.length) % heroDots.length;

  hero.classList.toggle('hero--slide-1', normalizedIndex === 1);
  hero.classList.toggle('hero--slide-2', normalizedIndex === 2);

  heroDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === normalizedIndex;
    dot.classList.toggle('hero__dot--active', isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });

  if (heroAnnouncer) {
    heroAnnouncer.textContent = `Banner ${normalizedIndex + 1} exibido.`;
  }

  heroActiveIndex = normalizedIndex;

  if (options.userInteraction && !prefersReducedMotion) {
    stopHeroAutoplay();
    startHeroAutoplay();
  }
};

const nextHeroSlide = () => setHeroSlide(heroActiveIndex + 1);
const startHeroAutoplay = () => {
  if (heroAutoplayId !== null) {
    return;
  }

  heroAutoplayId = window.setInterval(nextHeroSlide, 7000);
};

const stopHeroAutoplay = () => {
  if (heroAutoplayId !== null) {
    window.clearInterval(heroAutoplayId);
    heroAutoplayId = null;
  }
};

if (hero && heroDots.length) {
  setHeroSlide(0);

  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () =>
      setHeroSlide(index, { userInteraction: true })
    );

    dot.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setHeroSlide(heroActiveIndex + 1, { userInteraction: true });
        heroDots[(heroActiveIndex + 1) % heroDots.length].focus();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setHeroSlide(heroActiveIndex - 1, { userInteraction: true });
        heroDots[
          (heroActiveIndex - 1 + heroDots.length) % heroDots.length
        ].focus();
      }

      if (event.key === 'Home') {
        event.preventDefault();
        setHeroSlide(0, { userInteraction: true });
        heroDots[0].focus();
      }

      if (event.key === 'End') {
        event.preventDefault();
        setHeroSlide(heroDots.length - 1, { userInteraction: true });
        heroDots[heroDots.length - 1].focus();
      }
    });
  });

  hero.addEventListener('mouseenter', stopHeroAutoplay);
  hero.addEventListener('focusin', stopHeroAutoplay);
  hero.addEventListener('mouseleave', () => {
    if (!prefersReducedMotion) {
      startHeroAutoplay();
    }
  });
  hero.addEventListener('focusout', () => {
    if (!prefersReducedMotion) {
      startHeroAutoplay();
    }
  });

  if (!prefersReducedMotion) {
    startHeroAutoplay();
  }
}
const contatoForm = document.querySelector('.form-contato');
const contatoFields = contatoForm
  ? Array.from(contatoForm.querySelectorAll('[aria-required="true"]'))
  : [];

const getErrorMessage = (input) => {
  if (input.validity.valueMissing) {
    return 'Este campo é obrigatório.';
  }

  if (input.type === 'email' && input.validity.typeMismatch) {
    return 'Informe um email válido, por favor.';
  }

  return 'Por favor, corrija este campo.';
};

const clearFieldError = (input) => {
  input.removeAttribute('aria-invalid');
  const errorId = input.getAttribute('aria-describedby');
  const errorElement = errorId ? document.getElementById(errorId) : null;

  if (errorElement) {
    errorElement.textContent = '';
  }
};

const setFieldError = (input) => {
  input.setAttribute('aria-invalid', 'true');
  const errorId = input.getAttribute('aria-describedby');
  const errorElement = errorId ? document.getElementById(errorId) : null;

  if (errorElement) {
    errorElement.textContent = getErrorMessage(input);
  }
};

if (contatoForm) {
  contatoFields.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.validity.valid) {
        clearFieldError(input);
      }
    });
  });

  contatoForm.addEventListener('submit', (event) => {
    let hasError = false;

    contatoFields.forEach((input) => {
      if (!input.validity.valid) {
        setFieldError(input);
        hasError = true;
      } else {
        clearFieldError(input);
      }
    });

    if (hasError) {
      event.preventDefault();
      const firstError = contatoFields.find((input) => !input.validity.valid);
      if (firstError) {
        firstError.focus();
      }
    }
  });
}
