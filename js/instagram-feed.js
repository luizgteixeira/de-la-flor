const instagramEndpoint = "/api/instagram-feed";
const instagramMaxItems = 3;

const getConfiguredInstagramEndpoint = (grid) => {
  const configuredEndpoint = grid.dataset.instagramFeedEndpoint?.trim();
  return configuredEndpoint || instagramEndpoint;
};

const getInstagramAltText = (item) => {
  const caption = typeof item.caption === "string" ? item.caption.trim() : "";

  if (!caption) {
    return "Publicação da De La Flor Alfajor no Instagram";
  }

  return caption.length > 120 ? `${caption.slice(0, 117).trim()}...` : caption;
};

const isValidInstagramUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "https:";
  } catch (error) {
    return false;
  }
};

const normalizeInstagramItem = (item) => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const imageUrl =
    typeof item.imageUrl === "string" ? item.imageUrl.trim() : "";
  const permalink =
    typeof item.permalink === "string" ? item.permalink.trim() : "";

  if (!isValidInstagramUrl(imageUrl) || !isValidInstagramUrl(permalink)) {
    return null;
  }

  return {
    imageUrl,
    permalink,
    caption: typeof item.caption === "string" ? item.caption : "",
    timestamp: typeof item.timestamp === "string" ? item.timestamp : "",
  };
};

const createInstagramItem = (item) => {
  const article = document.createElement("article");
  article.className = "photos-section__item";

  const link = document.createElement("a");
  link.className = "photos-section__link";
  link.href = item.permalink;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", "Ver publicação no Instagram");

  const image = document.createElement("img");
  image.className = "photos-section__image";
  image.src = item.imageUrl;
  image.loading = "lazy";
  image.alt = getInstagramAltText(item);

  link.appendChild(image);
  article.appendChild(link);

  return article;
};

const fetchInstagramFeed = async (url) => {
  const response = await fetch(url, { headers: { Accept: "application/json" } });

  if (!response.ok) {
    throw new Error("Instagram feed unavailable");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

const renderInstagramFeed = (grid, items) => {
  const articles = items
    .slice(0, instagramMaxItems)
    .map(normalizeInstagramItem)
    .filter(Boolean)
    .map(createInstagramItem)
    .filter(Boolean);

  if (articles.length === 0) {
    throw new Error("Instagram feed empty");
  }

  grid.replaceChildren(...articles);
};

const initInstagramFeed = async () => {
  const instagramGrid = document.querySelector("#instagram-photos");

  if (!instagramGrid) {
    return;
  }

  try {
    // Configure este endpoint no backend/serverless. O token do Instagram nunca deve ir para o frontend.
    const endpoint = getConfiguredInstagramEndpoint(instagramGrid);
    const items = await fetchInstagramFeed(endpoint);
    renderInstagramFeed(instagramGrid, items);
  } catch (error) {
    // Em caso de erro, os cards estáticos do HTML permanecem visíveis como fallback.
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initInstagramFeed);
} else {
  initInstagramFeed();
}
