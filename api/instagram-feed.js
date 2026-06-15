const instagramFields = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
].join(",");

const sendJson = (response, statusCode, body) => {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(body));
};

module.exports = async function instagramFeed(request, response) {
  if (request.method && request.method !== "GET") {
    response.setHeader("Allow", "GET");
    sendJson(response, 405, { error: "Método não permitido." });
    return;
  }

  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const graphApiVersion = process.env.INSTAGRAM_GRAPH_API_VERSION || "v23.0";

  if (!userId || !accessToken) {
    sendJson(response, 500, { error: "Não foi possível carregar as fotos do Instagram." });
    return;
  }

  const instagramUrl = new URL(`https://graph.facebook.com/${graphApiVersion}/${userId}/media`);
  instagramUrl.searchParams.set("fields", instagramFields);
  instagramUrl.searchParams.set("limit", "3");
  instagramUrl.searchParams.set("access_token", accessToken);

  try {
    const instagramResponse = await fetch(instagramUrl);

    if (!instagramResponse.ok) {
      throw new Error("Instagram API request failed");
    }

    const payload = await instagramResponse.json();
    const items = Array.isArray(payload.data) ? payload.data.slice(0, 3) : [];

    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    sendJson(response, 200, items);
  } catch (error) {
    sendJson(response, 500, { error: "Não foi possível carregar as fotos do Instagram." });
  }
};
