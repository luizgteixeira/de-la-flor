const heroSection = document.querySelector(".hero");
const heroDots = document.querySelectorAll(".hero__dot[data-slide-index]");
const heroInterval = 4500;
let currentHeroSlide = 0;
let heroTimer = null;

const setHeroSlide = (index) => {
  if (!heroSection || heroDots.length === 0) {
    return;
  }

  currentHeroSlide = Math.min(Math.max(index, 0), heroDots.length - 1);

  heroDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === currentHeroSlide;
    dot.classList.toggle("hero__dot--active", isActive);
    dot.toggleAttribute("aria-current", isActive);
  });

  heroSection.classList.remove("hero--slide-0", "hero--slide-1", "hero--slide-2");
  heroSection.classList.add(`hero--slide-${currentHeroSlide}`);
};

const stopHeroAutoplay = () => {
  if (!heroTimer) {
    return;
  }

  window.clearInterval(heroTimer);
  heroTimer = null;
};

const startHeroAutoplay = () => {
  stopHeroAutoplay();

  if (heroDots.length <= 1) {
    return;
  }

  heroTimer = window.setInterval(() => {
    const nextSlide = currentHeroSlide >= heroDots.length - 1 ? 0 : currentHeroSlide + 1;
    setHeroSlide(nextSlide);
  }, heroInterval);
};

const resetHeroAutoplay = () => {
  stopHeroAutoplay();
  startHeroAutoplay();
};

if (heroSection && heroDots.length > 0) {
  setHeroSlide(0);
  startHeroAutoplay();

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIndex = Number.parseInt(dot.dataset.slideIndex, 10);
      setHeroSlide(Number.isNaN(slideIndex) ? 0 : slideIndex);
      resetHeroAutoplay();
    });
  });

  heroSection.addEventListener("mouseenter", stopHeroAutoplay);
  heroSection.addEventListener("mouseleave", startHeroAutoplay);
  heroSection.addEventListener("focusin", stopHeroAutoplay);
  heroSection.addEventListener("focusout", startHeroAutoplay);
}
