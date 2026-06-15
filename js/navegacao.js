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
