<script>
  import { activeTown, data, mapInstance } from "../stores.js";

  import { onMount, afterUpdate } from "svelte";
  import { setActiveTown } from "../utils/active-town.js";
  import mapbox from "../utils/mapbox.js";
  import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
  import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
  import ResetButton from "./ResetButton.svelte";

  export let instructions = "Select a town";

  let geocoderContainer;
  let geocoder;
  let geocoderResult;

  let searchStateList = [
    "US-AZ",
    "US-CA",
    "US-CO",
    "US-ID",
    "US-MT",
    "US-NM",
    "US-NV",
    "US-OR",
    "US-UT",
    "US-WA",
    "US-WY"
  ];
  let geocoderLoaded = false;
  function renderGeocoder() {
    geocoder = new MapboxGeocoder({
      accessToken: mapbox.accessToken,
      mapboxgl: mapbox,
      countries: "us",
      flyTo: {
        curve: 0.5,
        speed: 100
      },
      placeholder: "Search",
      types: "place,address,postcode",
      marker: false,
      bbox: [-125.595703, 31.015279, -101.821289, 49.15297],
      filter: function(item) {
        return item.context
          .map(function(i) {
            return (
              i.id.split(".").shift() == "region" &&
              searchStateList.indexOf(i.short_code) > -1
            );
          })
          .reduce((acc, curr) => acc || curr);
      }
    });
    geocoderContainer.appendChild(geocoder.onAdd($mapInstance));
    geocoder.on("result", handleGeocoderResults);
  }

  // function that queries for data
  function makeQuery() {
    // make our query
    let queryResults = $mapInstance.queryRenderedFeatures({
      layers: ["risk"]
    });

    // store reference to our original search location
    const searchPoint = geocoderResult.result.geometry;
    let hasResult = false;

    // loop through query results to find one containing our search point
    for (var i = 0; i < queryResults.length; i += 1) {
      const feature = queryResults[i];
      const containsPoint = booleanPointInPolygon(
        searchPoint,
        feature.geometry
      );
      if (containsPoint) {
        // this is our search result
        hasResult = true;
        const town = $data.towns[feature.properties.geoid];
        setActiveTown(feature.properties.geoid);
        break;
      }
    }
    if (!hasResult) {
      // reset active town if no data at new search location
      setActiveTown(null);
    }
  }

  // named callback for render event, returns if tiles are still loading,
  // makes query and sets active town, then removes itself as listener when tiles are loaded
  function onRender(d) {
    // check to see if tiles are loaded, if not, return and do nothing
    if (!$mapInstance.areTilesLoaded()) {
      return;
    } else {
      // once we the tiles are loaded, stop listening to render event
      $mapInstance.off("render", onRender);
      // and make query
      makeQuery();
    }
  }

  // callback function for moveend event. once called, stop listening to moveend and listen to render event
  function listenOnResults() {
    // stop listening to move end now
    $mapInstance.off("moveend", listenOnResults);
    // listen to render event
    $mapInstance.on("render", onRender);
  }

  function handleGeocoderResults(result) {
    geocoderResult = result;
    //listen to move end event
    $mapInstance.on("moveend", listenOnResults);
  }
  afterUpdate(() => {
    if ($mapInstance && geocoderContainer && !geocoderLoaded) {
      // triggers when mapInstance is defined in store and geocoderContainer is defined,
      renderGeocoder();
      geocoderLoaded = true;
    }
  });
  // $:
</script>

<style>
  .search__wrapper {
    display: flex;
    align-items: stretch;
    flex-flow: row wrap;
    margin: 0 0 -15px -15px;
    position: relative;
    z-index: 2;
  }

  :global(.search__wrapper > *) {
    margin: 0 0 15px 15px !important;
  }
  .search__geocoder {
    width: 100%;
    flex: 1 1 200px;
    box-sizing: border-box;
    padding: 0 0 0 2px;
    margin: 0;
  }

  :global(.search__geocoder > .mapboxgl-ctrl-geocoder) {
    box-shadow: none;
    border: solid 1px #e3e3e3;
    font-family: "Unify Sans", sans-serif;
    max-width: none;
    width: 100%;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://www.gannett-cdn.com/experiments/usatoday/_common/mapbox-gl-geocoder/v4.4.0/mapbox-gl-geocoder.css" />
</svelte:head>

{#if $mapInstance}
  {#if $activeTown}
  <p class='sans-serif'><strong>Our 2019 special report:</strong> <a href='https://www.azcentral.com/in-depth/news/local/arizona-wildfires/2019/07/22/wildfire-risks-more-than-500-spots-have-greater-hazard-than-paradise/1434502001/'>More than 500 communities with a wildfire hazard greater than Paradise, Calif.</a></p>
  {/if}
  <p class="sans-serif">
    Community names and boundaries are defined by the U.S. Census Bureau. 
    <a href="https://www.azcentral.com/in-depth/news/local/arizona-wildfires/2019/07/22/wildfire-risks-ahead-of-the-fire-about-this-report/1784203001/">More about the data here.</a>
  </p>
  <div class="search__wrapper">
    <div bind:this={geocoderContainer} class="search__geocoder" />
    {#if $activeTown}
      <ResetButton />
    {/if}
  </div>
{:else}
  <p class="sans-serif">Loading data ...</p>
{/if}
