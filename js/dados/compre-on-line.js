const onlineProductCards = document.querySelectorAll(".online-product-card");
const productZoomScale = 3.35;

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
