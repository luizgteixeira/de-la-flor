(function () {
  const section = document.querySelector("#sobre");
  const image = document.querySelector(".history-section__photos");

  if (!section || !image) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileViewport = window.matchMedia("(max-width: 760px)");
  const tabletViewport = window.matchMedia("(max-width: 980px)");
  const maxDesktopOffset = 210;
  const maxTabletOffset = 132;
  let ticking = false;

  const shouldDisableParallax = () => prefersReducedMotion.matches || mobileViewport.matches;

  const resetParallax = () => {
    image.style.setProperty("--history-parallax-y", "0px");
    image.style.setProperty("--history-parallax-scale", "1");
  };

  const updateParallax = () => {
    ticking = false;

    if (shouldDisableParallax()) {
      resetParallax();
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.bottom < 0 || rect.top > viewportHeight) {
      return;
    }

    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const centeredProgress = clampedProgress - 0.5;
    const maxOffset = tabletViewport.matches ? maxTabletOffset : maxDesktopOffset;
    const offset = centeredProgress * maxOffset;
    const scale = 1.055 + Math.abs(centeredProgress) * 0.035;

    image.style.setProperty("--history-parallax-y", `${offset.toFixed(2)}px`);
    image.style.setProperty("--history-parallax-scale", scale.toFixed(3));
  };

  const requestParallaxUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  const handleMotionPreferenceChange = () => {
    resetParallax();
    requestParallaxUpdate();
  };

  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
  window.addEventListener("resize", requestParallaxUpdate);

  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", handleMotionPreferenceChange);
    mobileViewport.addEventListener("change", handleMotionPreferenceChange);
    tabletViewport.addEventListener("change", handleMotionPreferenceChange);
  }

  requestParallaxUpdate();
})();
