const testimonialsCarousel = document.querySelector(".testimonials-section__carousel");
const testimonialsTrack = document.querySelector(".testimonials-section__cards");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialsPreviousButton = document.querySelector(".testimonials-section__arrow--previous");
const testimonialsNextButton = document.querySelector(".testimonials-section__arrow--next");
const testimonialsDots = document.querySelector(".testimonials-section__dots");
const testimonialsInterval = 4500;
let currentTestimonialIndex = 0;
let testimonialsTimer = null;

const getTestimonialsPerView = () => {
  if (!testimonialsTrack) {
    return 1;
  }

  const cardsPerView = Number.parseInt(
    getComputedStyle(testimonialsTrack).getPropertyValue("--testimonials-per-view"),
    10
  );
  return Number.isNaN(cardsPerView) ? 1 : cardsPerView;
};

const getMaxTestimonialIndex = () => {
  return Math.max(testimonialCards.length - getTestimonialsPerView(), 0);
};

const getTestimonialStep = () => {
  const firstCard = testimonialCards[0];

  if (!testimonialsTrack || !firstCard) {
    return 0;
  }

  const trackStyles = getComputedStyle(testimonialsTrack);
  const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
  return firstCard.getBoundingClientRect().width + gap;
};

const updateTestimonialsDots = () => {
  if (!testimonialsDots) {
    return;
  }

  const dots = testimonialsDots.querySelectorAll(".testimonials-section__dot");

  dots.forEach((dot, index) => {
    const isActive = index === currentTestimonialIndex;
    dot.classList.toggle("testimonials-section__dot--active", isActive);
    dot.toggleAttribute("aria-current", isActive);
  });
};

const goToTestimonialSlide = (index) => {
  if (!testimonialsTrack) {
    return;
  }

  const maxIndex = getMaxTestimonialIndex();
  currentTestimonialIndex = Math.min(Math.max(index, 0), maxIndex);
  testimonialsTrack.scrollTo({
    left: getTestimonialStep() * currentTestimonialIndex,
    behavior: "smooth",
  });
  updateTestimonialsDots();
};

const stopTestimonialsAutoplay = () => {
  if (!testimonialsTimer) {
    return;
  }

  window.clearInterval(testimonialsTimer);
  testimonialsTimer = null;
};

const startTestimonialsAutoplay = () => {
  stopTestimonialsAutoplay();

  if (getMaxTestimonialIndex() === 0) {
    return;
  }

  testimonialsTimer = window.setInterval(() => {
    const nextIndex = currentTestimonialIndex >= getMaxTestimonialIndex() ? 0 : currentTestimonialIndex + 1;
    goToTestimonialSlide(nextIndex);
  }, testimonialsInterval);
};

const resetTestimonialsAutoplay = () => {
  stopTestimonialsAutoplay();
  startTestimonialsAutoplay();
};

const renderTestimonialsDots = () => {
  if (!testimonialsDots) {
    return;
  }

  const slidesCount = getMaxTestimonialIndex() + 1;
  testimonialsDots.innerHTML = "";

  for (let index = 0; index < slidesCount; index += 1) {
    const dot = document.createElement("button");
    dot.className = "testimonials-section__dot";
    dot.type = "button";
    dot.dataset.slideIndex = String(index);
    dot.setAttribute("aria-label", `Mostrar depoimento ${index + 1}`);

    dot.addEventListener("click", () => {
      goToTestimonialSlide(index);
      resetTestimonialsAutoplay();
    });

    testimonialsDots.appendChild(dot);
  }

  updateTestimonialsDots();
};

if (testimonialsTrack && testimonialCards.length > 0) {
  renderTestimonialsDots();
  goToTestimonialSlide(0);
  startTestimonialsAutoplay();

  testimonialsPreviousButton?.addEventListener("click", () => {
    const previousIndex = currentTestimonialIndex <= 0 ? getMaxTestimonialIndex() : currentTestimonialIndex - 1;
    goToTestimonialSlide(previousIndex);
    resetTestimonialsAutoplay();
  });

  testimonialsNextButton?.addEventListener("click", () => {
    const nextIndex = currentTestimonialIndex >= getMaxTestimonialIndex() ? 0 : currentTestimonialIndex + 1;
    goToTestimonialSlide(nextIndex);
    resetTestimonialsAutoplay();
  });

  testimonialsCarousel?.addEventListener("mouseenter", stopTestimonialsAutoplay);
  testimonialsCarousel?.addEventListener("mouseleave", startTestimonialsAutoplay);
  testimonialsCarousel?.addEventListener("focusin", stopTestimonialsAutoplay);
  testimonialsCarousel?.addEventListener("focusout", startTestimonialsAutoplay);

  window.addEventListener("resize", () => {
    const maxIndex = getMaxTestimonialIndex();
    currentTestimonialIndex = Math.min(currentTestimonialIndex, maxIndex);
    renderTestimonialsDots();
    goToTestimonialSlide(currentTestimonialIndex);
    resetTestimonialsAutoplay();
  });
}
