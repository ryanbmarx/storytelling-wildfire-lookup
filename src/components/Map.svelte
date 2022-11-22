<script>
  import { mapInstance, activeTown, data } from "../stores";
  import { isStandalone } from "../utils/is-standalone.js";
  import mapbox from "../utils/mapbox.js";
  import { onMount } from "svelte";
  import { formatState } from "../utils/format-state.js";
  import { setActiveTown } from "../utils/active-town.js";

  // mapbox stylesheet
  import "../mapbox-gl.css";

  let container;
  let geocoderContainer;
  let map;
  let townLabel;
  let currentFeatureHighlight;

  // Coordinates for Pine, Ariz.
  let userSelectedCoordinates = [-111.4556, 34.3843];

  // Bounds of 11-state area
  let mapBounds = [[-125.6, 30], [-100.5, 49.2]];

  function handleMapClick(e) {
    if (e.features.length > 0) {
      const feature = e.features[0];
      const { slug } = $data.towns[feature.properties.geoid];
      setActiveTown(feature.properties.geoid);
    }
  }

  // function to move map to a feature by geoid
  function locateFeatureOnMap(geoid) {
    const feature = $data.towns[geoid];
    addTownLabel(geoid);
    map.fitBounds(feature.bbox);
  }

  function addTownLabel(geoid) {
    if (townLabel) {
      townLabel.remove();
      townLabel = undefined;
    }
    const town = $data.towns[geoid];
    townLabel = new mapbox.Popup({
      className: "map__town__label__popup",
      closeButton: false,
      closeOnClick: false,
      maxWidth: "200px"
    })
      .setLngLat(town.ctr)
      .setHTML(
        `<p class="map__town__label">${town.name}, ${formatState(
          town.state,
          "ap",
          "postal"
        )}</p>`
      )
      .addTo(map);
  }

  // uses feature state to set a highlight property on the map feature that corresponds to highlight geoid
  // optionally removes existing highlight for oldHighlight geoid
  function highlightFeature(highlightGeoid, oldHighlightGeoid) {
    if (oldHighlightGeoid) {
      map.removeFeatureState(
        {
          id: oldHighlightGeoid,
          source: "composite",
          sourceLayer: "risk"
        },
        "highlight"
      );
    }
    if (highlightGeoid) {
      map.setFeatureState(
        {
          id: highlightGeoid,
          source: "composite",
          sourceLayer: "risk"
        },
        {
          highlight: true
        }
      );
    }
    currentFeatureHighlight = highlightGeoid;
  }

  // resets map zoom to full extent
  function resetMapZoom() {
    map.fitBounds(mapBounds);
  }

  // reactively check for an active town and move map to that town
  $: if ($activeTown && map) {
    // if map style is still loading, wait
    if (!map.isStyleLoaded()) {
      map.on("load", function() {
        highlightFeature($activeTown, currentFeatureHighlight);
        locateFeatureOnMap($activeTown);
      });
    } else {
      highlightFeature($activeTown, currentFeatureHighlight);
      locateFeatureOnMap($activeTown);
    }
  }

  // remove label if town is unset, and reset map zoom
  $: if (!$activeTown) {
    if (townLabel) {
      townLabel.remove();
      townLabel = undefined;
    }
    if (currentFeatureHighlight) {
      highlightFeature(null, currentFeatureHighlight);
    }
    if (map) {
      resetMapZoom();
    }
  }

  onMount(() => {
    // Initialize our map.
    map = new mapbox.Map({
      container,
      style: "mapbox://styles/usatodaygraphics/cjvqsldjl2hyh1cmoj91bj20h",
      bounds: mapBounds,
      maxBounds: [[-128, 27], [-99.5, 51]],
      maxZoom: 10,
      zoom: 3,
      minZoom: 1
    });

    map.on("load", () => {
      // set mapInstance in store for reference elsewhere
      mapInstance.set(map);
      // add click listener
      map.on("click", "risk", handleMapClick);

      let layer = map.getLayer("risk");
      // set feature state paint properties on risk layer
      map.setPaintProperty("risk", "fill-opacity", [
        "case",
        ["boolean", ["feature-state", "highlight"], false],
        0.75,
        0.5
      ]);
    });
  });
</script>

<style>
  .map__container {
    min-height: 300px;
    height: 100vh;
    width: 100%;
    max-height: 300px;
  }
  :global(.map__town__label__popup > .mapboxgl-popup-content) {
    background: #404040;
    color: #ffffff;
  }
  :global(.map__town__label__popup.mapboxgl-popup-anchor-bottom
      > .mapboxgl-popup-tip, .map__town__label__popup.mapboxgl-popup-anchor-bottom-right
      > .mapboxgl-popup-tip, .map__town__label__popup.mapboxgl-popup-anchor-bottom-left
      > .mapboxgl-popup-tip) {
    border-top-color: #404040;
  }
  :global(.map__town__label__popup.mapboxgl-popup-anchor-top
      > .mapboxgl-popup-tip, .map__town__label__popup.mapboxgl-popup-anchor-top-left
      > .mapboxgl-popup-tip, .map__town__label__popup.mapboxgl-popup-anchor-top-right
      > .mapboxgl-popup-tip) {
    border-bottom-color: #404040;
  }
  :global(.map__town__label__popup.mapboxgl-popup-anchor-left
      > .mapboxgl-popup-tip) {
    border-right-color: #404040;
  }
  :global(.map__town__label__popup.mapboxgl-popup-anchor-right
      > .mapboxgl-popup-tip) {
    border-left-color: #404040;
  }
  :global(.mapboxgl-marker) {
    height: 10px;
    width: 10px;
    background: blue;
    border-radius: 50%;
  }
  :global(.lookup .map__container .mapboxgl-ctrl-attrib a) {
    color: rgba(0, 0, 0, 0.75);
  }
  :global(.map__town__label) {
    font-family: "Unify Sans", sans-serif;
    font-size: 16px;
    margin: 0;
    font-weight: 700;
    /* Use important here because UW styles REALLY want to control this */
    color: white !important;
  }

  @media all and (min-width: 768px) {
    .map__container {
      max-height: 500px;
    }
  }
</style>



<div
  bind:this={container}
  class="map__container"
  class:standalone={isStandalone()} />
