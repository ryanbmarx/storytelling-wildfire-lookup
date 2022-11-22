import { fireEvent, firePageView } from "./analytics.js";
import { activeTown, data } from "../stores.js";
import router from "../router.js";
import { get } from "svelte/store";
import { isStandalone } from "./is-standalone.js";

// setActiveTown enables the charts for a specific town. it takes two params:
// @param geoid: the geoid of the town we want to see
// @param slug: the slugified name of the town from the data, for analytics purposes
export function setActiveTown(geoid, slug = null) {
  // Change the active town in the store to trigger new charts.
  activeTown.set(geoid);

  // Generate our slug for use throughout
  const townSlug = get(data)["towns"][geoid]["slug"];

  // Track all this stuff
  fireEvent(`wildfires-2019-lookup-town-search-${townSlug}`);

  // If the page is a standalone database, then fire a pageview
  if (isStandalone()) {
    // Set the url to the slugified town
    router.navigate(`/towns/${townSlug}`);
    firePageView();
  }

  // If the page is an iframe embed, fire a resize
  if (window.my_resizer) {
    window.my_resizer.broadcast_height();
  }
}

// resetActiveTown resets the app to display the initial state
export function resetActiveTown() {
  fireEvent(`wildfires-2019-lookup-town-search-reset`);
  activeTown.set(null);
  // If the page is a standalone database, then fire a pageview
  if (isStandalone()) {
    // Set the url to the root
    router.navigate(`/`);
    firePageView();
  }
}
