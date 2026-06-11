const eventsCarousel = document.querySelector(".events-section__carousel");
const eventsTrack = document.querySelector(".events-section__cards");
const eventCards = document.querySelectorAll(".event-card");
const eventsPreviousButton = document.querySelector(".events-section__arrow--previous");
const eventsNextButton = document.querySelector(".events-section__arrow--next");
const eventsDots = document.querySelector(".events-section__dots");
const eventsInterval = 4500;
let currentEventIndex = 0;
let eventsTimer = null;

const getEventsPerView = () => {
  if (!eventsTrack) {
    return 1;
  }

  const cardsPerView = Number.parseInt(getComputedStyle(eventsTrack).getPropertyValue("--events-per-view"), 10);
  return Number.isNaN(cardsPerView) ? 1 : cardsPerView;
};

const getMaxEventIndex = () => {
  return Math.max(eventCards.length - getEventsPerView(), 0);
};

const getEventStep = () => {
  const firstCard = eventCards[0];

  if (!eventsTrack || !firstCard) {
    return 0;
  }

  const trackStyles = getComputedStyle(eventsTrack);
  const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
  return firstCard.getBoundingClientRect().width + gap;
};

const updateEventsDots = () => {
  if (!eventsDots) {
    return;
  }

  const dots = eventsDots.querySelectorAll(".events-section__dot");

  dots.forEach((dot, index) => {
    const isActive = index === currentEventIndex;
    dot.classList.toggle("events-section__dot--active", isActive);
    dot.toggleAttribute("aria-current", isActive);
  });
};

const goToEventSlide = (index) => {
  if (!eventsTrack) {
    return;
  }

  const maxIndex = getMaxEventIndex();
  currentEventIndex = Math.min(Math.max(index, 0), maxIndex);
  eventsTrack.scrollTo({
    left: getEventStep() * currentEventIndex,
    behavior: "smooth",
  });
  updateEventsDots();
};

const stopEventsAutoplay = () => {
  if (!eventsTimer) {
    return;
  }

  window.clearInterval(eventsTimer);
  eventsTimer = null;
};

const startEventsAutoplay = () => {
  stopEventsAutoplay();

  if (getMaxEventIndex() === 0) {
    return;
  }

  eventsTimer = window.setInterval(() => {
    const nextIndex = currentEventIndex >= getMaxEventIndex() ? 0 : currentEventIndex + 1;
    goToEventSlide(nextIndex);
  }, eventsInterval);
};

const resetEventsAutoplay = () => {
  stopEventsAutoplay();
  startEventsAutoplay();
};

const renderEventsDots = () => {
  if (!eventsDots) {
    return;
  }

  const slidesCount = getMaxEventIndex() + 1;
  eventsDots.innerHTML = "";

  for (let index = 0; index < slidesCount; index += 1) {
    const dot = document.createElement("button");
    dot.className = "events-section__dot";
    dot.type = "button";
    dot.dataset.slideIndex = String(index);
    dot.setAttribute("aria-label", `Mostrar serviço para eventos ${index + 1}`);

    dot.addEventListener("click", () => {
      goToEventSlide(index);
      resetEventsAutoplay();
    });

    eventsDots.appendChild(dot);
  }

  updateEventsDots();
};

if (eventsTrack && eventCards.length > 0) {
  renderEventsDots();
  goToEventSlide(0);
  startEventsAutoplay();

  eventsPreviousButton?.addEventListener("click", () => {
    const previousIndex = currentEventIndex <= 0 ? getMaxEventIndex() : currentEventIndex - 1;
    goToEventSlide(previousIndex);
    resetEventsAutoplay();
  });

  eventsNextButton?.addEventListener("click", () => {
    const nextIndex = currentEventIndex >= getMaxEventIndex() ? 0 : currentEventIndex + 1;
    goToEventSlide(nextIndex);
    resetEventsAutoplay();
  });

  eventsCarousel?.addEventListener("mouseenter", stopEventsAutoplay);
  eventsCarousel?.addEventListener("mouseleave", startEventsAutoplay);
  eventsCarousel?.addEventListener("focusin", stopEventsAutoplay);
  eventsCarousel?.addEventListener("focusout", startEventsAutoplay);

  window.addEventListener("resize", () => {
    const maxIndex = getMaxEventIndex();
    currentEventIndex = Math.min(currentEventIndex, maxIndex);
    renderEventsDots();
    goToEventSlide(currentEventIndex);
    resetEventsAutoplay();
  });
}
