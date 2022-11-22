// render an HTML template suitable for in-depth embedding.
require = require("esm")(module);
const fs = require("fs");

const BRANCH = process.env.GIT_BRANCH || "dev";
const REPO = "wildfires-lookup";
const ASSET_PATH = `https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps/${BRANCH}/${REPO}/`;

//compile the style links, one at a time.
const styles = [new URL(`global.css?t=${Date.now()}`, ASSET_PATH), new URL(`bundle.css?t=${Date.now()}`, ASSET_PATH)];
let styleTags = "";
styles.forEach(s => {
  styleTags += `<link rel="stylesheet" href="${s}">`;
});

//compile the script tags, one at a time.
const bodyScripts = [new URL(`bundle.js?t=${Date.now()}`, ASSET_PATH)];
let bodyScriptTags = "";
bodyScripts.forEach(s => {
  bodyScriptTags += `<script type="text/javascript" src="${s}"></script>`;
});

//compile the header script tags, one at a time.
const headerScripts = [
  `https://www.gannett-cdn.com/experiments/usatoday/responsive/iframe-resizer/iframe-resizer.js?t=${Date.now()}`
];
let headerScriptTags = "";
headerScripts.forEach(s => {
  headerScriptTags += `<script type="text/javascript" src="${s}"></script>`;
});

let templateHtml = `<!doctype html>
<html>
<head>
    <meta charset='utf8'>
    <meta name='viewport' content='width=device-width'>
    <title>Wildfire Data Lookup</title>
    ${styleTags}
    <style>
        body {
            padding: 0;
            margin: 0;
        }
    </style>
        ${headerScriptTags}

</head>
<body>
    <!-- This is a lookup -->
    <main id="lookup-app"></main>
    ${bodyScriptTags}
    <script>
        var my_el = document.getElementById("lookup-app"),
            my_resizer = new IframeResizer(my_el);
        my_resizer.watch();
    </script>
</body>
</html>`;

//   Add the script tags, one by one

fs.writeFile("./public/iframe.html", templateHtml, "utf-8", err => {
  if (err) throw err;
});
