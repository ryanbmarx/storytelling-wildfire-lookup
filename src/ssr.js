// render a UW response as JSON from components
require = require("esm")(module);
require("svelte/register");

const { UW } = require("./utils/uw.js");
const { jsonld } = require("./utils/jsonld.js");

const BRANCH = process.env.GIT_BRANCH || "dev";
const ASSET_PATH = `https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps/${BRANCH}/wildfires-lookup/`;

function render() {
  // const { html, css, head } = App.render(content);

  const scripts = [new URL(`bundle.js?t=${Date.now()}`, ASSET_PATH)];
  const styles = [new URL(`global.css?t=${Date.now()}`, ASSET_PATH), new URL(`bundle.css?t=${Date.now()}`, ASSET_PATH)];

  const metadata = {
    scripts,
    styles,
    title: "Wildfire risks: Look up every Western community here",
    description: "Explore the risks wildfires pose for more than 5,000 communities across 11 states in this exclusive Arizona Republic/USA TODAY map and analysis.",
    share_text: "Explore the risks wildfires pose for more than 5,000 communities across 11 states in this exclusive Arizona Republic/USA TODAY map and analysis.",
    share_image: `${ASSET_PATH}risk_map.jpg`,
    ssts: "news/local/arizona-wildfires",

    url: "https://www.azcentral.com/storytelling/wildfires-risks-map-california-arizona-oregon/"
  };

  return UW({
    html: `<main id="lookup-app"></main>`,
    ...metadata
  });
}

module.exports = {
  render
};

if (module.parent === null) {
  console.log(JSON.stringify(render(), null, 2));
}
