import App from "./App.svelte";
import { updates, data, activeTown, ASSET_PATH } from "./stores.js";
import { get } from "svelte/store";
// import { setActiveTown } from "./utils/active-town.js";
import { isStandalone } from "./utils/is-standalone.js";
import { urlFor } from "./utils/links.js";
import updateDates from "../public/updates.json";

updates.set(updateDates);

const dataPath = urlFor(`towns.json`, get(ASSET_PATH));

fetch(dataPath)
  .then(res => res.json())
  .then(info => {
    data.set(info);
    return info;
  })
  .then(data => {
    // Init our chosen town variable
    let townSlug;
    if (isStandalone()) {
      console.log("This is standalone");
      // Start by looking for a url param slug
      let loc = new URL(window.location);
      console.log("loc", loc);
      if (loc.searchParams.get("slug")) {
        // Since we found a url param with a slug, use it.
        townSlug = loc.searchParams.get("slug");
        console.log("slug-based", townSlug);
      } else {
        // Let's check the url for a town route.
        // This looks for a townSlug defined in the url and sets the activeTown accordingly.
        townSlug = /towns\/([^\/]+)\/?$/.exec(loc.pathname)[1];
        console.log("regex", townSlug);
      }
      // Cycle through all the towns by looking at the object's keys. Find the one we want, set it to active, then break the cycle.
      if (townSlug) {
        for (let key in data.towns) {
          if (data.towns[key].slug === townSlug) {
            activeTown.set(key);
            console.log("active town is set to", key);

            break;
          }
        }
      }
    }
  })
  .catch(e => {
    console.error("Error fetching data", e);
  });

let app;
// Is this a standalone instance?
const standaloneContainer = document.querySelector("#lookup-app");
if (standaloneContainer) {
  // If it is standalone, then load the app into the container
  app = new App({
    target: standaloneContainer,
    props: {
      embed: null
    }
  });
} else {
  // It is NOT a standalone, so collect all the embed containers
  // const embeds = document.querySelectorAll("[data-lookuptown]");
  const embeds = document.querySelectorAll("[data-lookuptown]:not([data-lookup-loaded=true])");
  for (let el of embeds) {
    if (!el.dataset.lookupLoaded) {
      // If it is not already loaded, then load the app into the <main> and give it the embedded town geoid
      app = new App({
        target: el.querySelector("main"),
        props: {
          embed: el.dataset.lookuptown
        }
      });
    }
    // Flag this embed as already loaded.
    el.dataset.lookupLoaded = true;
  }
}

// window.app = app;

export default app;
