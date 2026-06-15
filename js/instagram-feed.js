const instagramGrid = document.querySelector("#instagram-photos");
const instagramEndpoint = "/api/instagram-feed";
const instagramFallbackEndpoint = "dados/instagram-feed.json";
const instagramMaxItems = 3;

const getInstagramImageUrl = (item) => {
  if (item.media_type === "VIDEO") {
    return item.thumbnail_url || item.media_url || "";
  }

  return item.media_url || item.thumbnail_url || "";
};

const getInstagramAltText = (item) => {
  const caption = typeof item.caption === "string" ? item.caption.trim() : "";

  if (!caption) {
    return "Publicação da De La Flor Alfajor no Instagram";
  }

  return caption.length > 120 ? `${caption.slice(0, 117).trim()}...` : caption;
};

const createInstagramStatus = (message) => {
  const status = document.createElement("p");
  status.className = "photos-section__status";
  status.textContent = message;
  return status;
};

const createInstagramItem = (item) => {
  const imageUrl = getInstagramImageUrl(item);

  if (!imageUrl || !item.permalink) {
    return null;
  }

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
  image.src = imageUrl;
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
  return Array.isArray(data) ? data : data.items;
};

const renderInstagramFeed = (items, statusMessage = "") => {
  const articles = items
    .slice(0, instagramMaxItems)
    .map(createInstagramItem)
    .filter(Boolean);

  if (articles.length === 0) {
    throw new Error("Instagram feed empty");
  }

  if (statusMessage) {
    articles.push(createInstagramStatus(statusMessage));
  }

  instagramGrid.replaceChildren(...articles);
};

const showInstagramFallbackMessage = () => {
  if (!instagramGrid || instagramGrid.querySelector(".photos-section__status")) {
    return;
  }

  instagramGrid.appendChild(
    createInstagramStatus("Não foi possível atualizar as fotos do Instagram agora. As imagens atuais continuam disponíveis.")
  );
};

const initInstagramFeed = async () => {
  if (!instagramGrid) {
    return;
  }

  try {
    const items = await fetchInstagramFeed(instagramEndpoint);
    renderInstagramFeed(items);
  } catch (apiError) {
    try {
      // Fallback para uso local/estático. A integração real precisa da rota serverless para proteger o token.
      const fallbackItems = await fetchInstagramFeed(instagramFallbackEndpoint);
      renderInstagramFeed(
        fallbackItems,
        "Não foi possível atualizar as fotos do Instagram agora. As imagens atuais continuam disponíveis."
      );
    } catch (fallbackError) {
      showInstagramFallbackMessage();
    }
  }
};

initInstagramFeed();
