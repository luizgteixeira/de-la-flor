const onlineProductCards = document.querySelectorAll(".online-product-card");
const onlineProductButtons = document.querySelectorAll(".online-product-card__button[data-target]");
const onlineShopCarousel = document.querySelector(".online-shop-section__carousel");
const onlineShopTrack = document.querySelector(".online-shop-section__grid");
const onlineShopPreviousButton = document.querySelector(".online-shop-section__arrow--previous");
const onlineShopNextButton = document.querySelector(".online-shop-section__arrow--next");
const onlineShopDots = document.querySelector(".online-shop-section__dots");
const productZoomScale = 3.35;
const carouselInterval = 4500;
let currentCarouselIndex = 0;
let carouselTimer = null;

const setProductZoomPosition = (card, media, image, clientX, clientY) => {
  const rect = media.getBoundingClientRect();
  const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
  const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  card.style.setProperty("--zoom-x", `${xPercent}%`);
  card.style.setProperty("--zoom-y", `${yPercent}%`);
  card.style.setProperty("--zoom-bg-x", `${xPercent}%`);
  card.style.setProperty("--zoom-bg-y", `${yPercent}%`);
  card.style.setProperty("--zoom-bg-size", `${rect.width * productZoomScale}px auto`);
  card.style.setProperty("--zoom-image", `url("${image.currentSrc || image.src}")`);
};

const toggleProductZoom = (card, isActive) => {
  card.classList.toggle("online-product-card--zoom-active", isActive);
};

const getCardsPerView = () => {
  if (!onlineShopTrack) {
    return 1;
  }

  const cardsPerView = Number.parseInt(getComputedStyle(onlineShopTrack).getPropertyValue("--cards-per-view"), 10);
  return Number.isNaN(cardsPerView) ? 1 : cardsPerView;
};

const getMaxCarouselIndex = () => {
  return Math.max(onlineProductCards.length - getCardsPerView(), 0);
};

const getCarouselStep = () => {
  const firstCard = onlineProductCards[0];

  if (!onlineShopTrack || !firstCard) {
    return 0;
  }

  const trackStyles = getComputedStyle(onlineShopTrack);
  const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
  return firstCard.getBoundingClientRect().width + gap;
};

const updateCarouselDots = () => {
  if (!onlineShopDots) {
    return;
  }

  const dots = onlineShopDots.querySelectorAll(".online-shop-section__dot");

  dots.forEach((dot, index) => {
    const isActive = index === currentCarouselIndex;
    dot.classList.toggle("online-shop-section__dot--active", isActive);
    dot.toggleAttribute("aria-current", isActive);
  });
};

const goToCarouselSlide = (index) => {
  if (!onlineShopTrack) {
    return;
  }

  const maxIndex = getMaxCarouselIndex();
  currentCarouselIndex = Math.min(Math.max(index, 0), maxIndex);
  onlineShopTrack.scrollTo({
    left: getCarouselStep() * currentCarouselIndex,
    behavior: "smooth",
  });
  updateCarouselDots();
};

const stopCarouselAutoplay = () => {
  if (!carouselTimer) {
    return;
  }

  window.clearInterval(carouselTimer);
  carouselTimer = null;
};

const startCarouselAutoplay = () => {
  stopCarouselAutoplay();

  if (getMaxCarouselIndex() === 0) {
    return;
  }

  carouselTimer = window.setInterval(() => {
    const nextIndex = currentCarouselIndex >= getMaxCarouselIndex() ? 0 : currentCarouselIndex + 1;
    goToCarouselSlide(nextIndex);
  }, carouselInterval);
};

const resetCarouselAutoplay = () => {
  stopCarouselAutoplay();
  startCarouselAutoplay();
};

const renderCarouselDots = () => {
  if (!onlineShopDots) {
    return;
  }

  const slidesCount = getMaxCarouselIndex() + 1;
  onlineShopDots.innerHTML = "";

  for (let index = 0; index < slidesCount; index += 1) {
    const dot = document.createElement("button");
    dot.className = "online-shop-section__dot";
    dot.type = "button";
    dot.dataset.slideIndex = String(index);
    dot.setAttribute("aria-label", `Mostrar grupo de produtos ${index + 1}`);

    dot.addEventListener("click", () => {
      goToCarouselSlide(index);
      resetCarouselAutoplay();
    });

    onlineShopDots.appendChild(dot);
  }

  updateCarouselDots();
};

onlineProductCards.forEach((card) => {
  const media = card.querySelector(".online-product-card__media");
  const image = card.querySelector(".online-product-card__image");

  if (!media || !image) {
    return;
  }

  media.addEventListener("mouseenter", (event) => {
    setProductZoomPosition(card, media, image, event.clientX, event.clientY);
    toggleProductZoom(card, true);
  });

  media.addEventListener("mousemove", (event) => {
    setProductZoomPosition(card, media, image, event.clientX, event.clientY);
  });

  media.addEventListener("mouseleave", () => {
    toggleProductZoom(card, false);
  });

  card.addEventListener("focusin", () => {
    const rect = media.getBoundingClientRect();
    setProductZoomPosition(card, media, image, rect.left + rect.width / 2, rect.top + rect.height / 2);
    toggleProductZoom(card, true);
  });

  card.addEventListener("focusout", () => {
    toggleProductZoom(card, false);
  });
});

onlineProductButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetSelector = button.dataset.target;
    const target = targetSelector ? document.querySelector(targetSelector) : null;

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if (onlineShopTrack && onlineProductCards.length > 0) {
  renderCarouselDots();
  goToCarouselSlide(0);
  startCarouselAutoplay();

  onlineShopPreviousButton?.addEventListener("click", () => {
    const previousIndex = currentCarouselIndex <= 0 ? getMaxCarouselIndex() : currentCarouselIndex - 1;
    goToCarouselSlide(previousIndex);
    resetCarouselAutoplay();
  });

  onlineShopNextButton?.addEventListener("click", () => {
    const nextIndex = currentCarouselIndex >= getMaxCarouselIndex() ? 0 : currentCarouselIndex + 1;
    goToCarouselSlide(nextIndex);
    resetCarouselAutoplay();
  });

  onlineShopCarousel?.addEventListener("mouseenter", stopCarouselAutoplay);
  onlineShopCarousel?.addEventListener("mouseleave", startCarouselAutoplay);
  onlineShopCarousel?.addEventListener("focusin", stopCarouselAutoplay);
  onlineShopCarousel?.addEventListener("focusout", startCarouselAutoplay);

  window.addEventListener("resize", () => {
    const maxIndex = getMaxCarouselIndex();
    currentCarouselIndex = Math.min(currentCarouselIndex, maxIndex);
    renderCarouselDots();
    goToCarouselSlide(currentCarouselIndex);
    resetCarouselAutoplay();
  });
}
