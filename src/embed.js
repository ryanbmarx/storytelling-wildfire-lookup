// render an HTML template suitable for in-depth embedding.
require = require("esm")(module);
const fs = require("fs");

const BRANCH = process.env.GIT_BRANCH || "dev";
const REPO = "wildfires-lookup";
const ASSET_PATH = `https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps/${BRANCH}/${REPO}/`;

// const { html, css, head } = App.render(content);

const scripts = [new URL(`bundle.js?t=${Date.now()}`, ASSET_PATH)];
const styles = [new URL(`global.css?t=${Date.now()}`, ASSET_PATH), new URL(`bundle.css?t=${Date.now()}`, ASSET_PATH)];

let templateHtml = `<main class="wildfire-lookup-embed"></main>`;

// Add the style links, one at a time.
styles.forEach(s => {
  templateHtml += `<link rel="stylesheet" href="${s}">`;
});

//   Add the script tags, one by one
scripts.forEach(s => {
  templateHtml += `<script type="text/javascript" src="${s}"></script>`;
});

fs.writeFile("./public/embed.html", templateHtml, "utf-8", err => {
  if (err) throw err;
});
