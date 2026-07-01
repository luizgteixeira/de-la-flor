const express = require("express");
const path = require("path");
const instagramFeed = require("./api/instagram-feed");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/instagram-feed", instagramFeed);

app.use(express.static(__dirname));

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
