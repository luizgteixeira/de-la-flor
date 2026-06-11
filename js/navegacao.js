const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".site-nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (siteHeader && navToggle && siteNav) {
  const setMenuOpen = (isOpen) => {
    siteHeader.classList.toggle("site-header--nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest(".site-nav__link")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 761px)").matches) {
      setMenuOpen(false);
    }
  });
}

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle("back-to-top--visible", window.scrollY > 360);
  };

  toggleBackToTop();
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
}
