<script>
  // COMPONENTS
  import Advertisement from "./components/Advertisement.svelte";
  import Map from "./components/Map.svelte";
  import Intro from "./components/Intro.svelte";
  import ShareButtons from "./components/ShareButtons.svelte";
  import ResetButton from "./components/ResetButton.svelte";
  import TownButton from "./components/TownButton.svelte";
  import TownTopper from "./components/TownTopper.svelte";

  // UTILS AND VARS
  import { onMount, afterUpdate } from "svelte";
  import TownCharts from "./components/TownCharts.svelte";
  import { firePageView } from "./utils/analytics.js";
  import { isStandalone } from "./utils/is-standalone.js";
  import { setActiveTown } from "./utils/active-town.js";

  // STORES
  import { activeTown, data, credits } from "./stores.js";

  // props
  let townButtons = [
    "0455700",
    "0636203",
    "3565210",
    "5338845",
    "4163450",
    "0853395"
  ];

  export let embed;
  let activeTownSet = false;
  let standalone = isStandalone();

  onMount(() => {
    // Fire the first pageview when the app loads
    firePageView();
  });

  afterUpdate(() => {
    if (embed && $data && !activeTownSet) {
      setActiveTown(embed);
      activeTownSet = true;
    }
  });
</script>

<style>
  :global(html) {
    /* TYPE SIZES */
    --type-1-base-size: 28px;
    --type-2-base-size: 24px;
    --type-3-base-size: 20px;
    --type-4-base-size: 18px;
    --type-5-base-size: 16px;
    --type-6-base-size: 14px;
    --type-7-base-size: 12px;
    --type-8-base-size: 10px;

    /* FONT STACKS */
    --sans-serif: "Unify Sans", Helvetica, Arial, sans-serif;
    --serif: "Unify Serif", Georgia, TimesNewRoman, "Times New Roman", Times,
      serif;

    --wildfire-color-theme: #bf4225;
    --wildfire-color-text: white;

    --wildfire-gray-very-light: #eee;
    --wildfire-gray-light: #aaa;
    --wildfire-gray-medium: #888;
    --wildfire-gray-dark: #555;

    --wildfire-grid-gap: 30px;
  }
  .lookup {
    padding: 30px 15px;
    max-width: 1300px;
    margin: 0 auto;
  }

  /* .container {
    overflow: hidden;
  } */

  /* TYPOGRAPHY SETTING */

  .container :global(.lookup p) {
    font: calc(16px + (18 - 16) * ((100vw - 320px) / (1200 - 320))) / 1.6em
      var(--serif);
    margin: 0 0 1em 0;
    color: var(--color-text, #222);
  }

  :global(.lookup .sans-serif) {
    /* Use this class, and important, to ensure sans text when overriding UW styles. */
    font-family: var(--sans-serif, sans-serif) !important;
  }

  :global(.lookup a:not([class])) {
    /* This styles all links that have NO class. This targets inline links in text. */
    color: var(--wildfire-color-theme, orange);
    text-decoration-color: var(--wildfire-color-theme, orange);
  }

  :global(.lookup .kicker) {
    font: 16px/1.3em var(--sans-serif, sans-serif);
    font-weight: bold;
    text-transform: uppercase;
    margin: 0 0 0.25em 0;
    display: block;
  }

  :global(.lookup .headline) {
    font: calc(36px + (40 - 30) * ((100vw - 320px) / (1200 - 320))) / 1.3em
      var(--sans-serif, sans-serif);
    font-weight: bold;
    margin: 0 0 0.5em 0;
    color: var(--color-text);
  }

  :global(.lookup .subheadline) {
    font: calc(24px + (24 - 20) * ((100vw - 320px) / (1200 - 320))) / 1.3em
      var(--sans-serif);
    font-weight: bold;
    margin: 0 0 0.5em 0;
    color: var(--color-text);
  }

  :global(.lookup .headline--slash)::after {
    content: "";
    display: block;
    background: var(--wildfire-color-theme, orange);
    height: 8px;
    width: 75px;

    margin: 15px 0;
  }

  :global(.lookup .sans-serif) {
    font: 16px/1.3em var(--sans-serif, sans-serif);
  }

  :global(.lookup .sublabel) {
    font-weight: normal;
    font-style: italic;
    font-size: 14px;
    position: relative;
    color: var(--wildfire-gray-medium, #888);
  }

  :global(.lookup .wildfireKicker) {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 800;
    color: var(--wildfire-color-theme, orange);
  }

  .credits {
    font-size: 14px;
    line-height: 1.3em;
  }
  .towns ul {
    list-style: none;
    margin: 30px 0 0 0;
    padding: 0;

    display: grid;
    grid-gap: var(--grid-gap, 30px);
    grid-template: auto / 1fr;
  }

  .map {
    margin: 30px 0 0 0;
  }
  .standalone .default-towns-subheadline {
    margin-top: 0;
  }
  .default-towns-subheadline {
    margin-top: 0.8em;
  }
  @media all and (min-width: 768px) {
    .towns ul {
      grid-template: auto / 1fr 1fr;
    }

    .map {
      margin: 0;
    }

    .container {
      display: grid;
      grid-gap: 30px;
      grid-template-rows: auto 1fr;
      grid-template-columns: 1fr minmax(100px, 300px) minmax(100px, 300px) 1fr;
    }

    .lookup-topper {
      grid-row: 1;
      grid-column: 1/3;
    }

    .town-charts {
      grid-row: 2;
      grid-column: 1/3;
    }

    .map {
      grid-row: 1 / -1;
      grid-column: 3/-1;
    }

    .standalone .lookup-topper {
      grid-row: 1;
      grid-column: 2/4;
    }

    .standalone .town-charts {
      grid-row: 2;
      grid-column: 1/3;
    }
    .standalone .map {
      grid-row: 2;
      grid-column: 3/5;
    }

    .standalone .default-towns-subheadline {
      margin-top: 0;
    }
  }
</style>

<div class="lookup" class:standalone>
  <div class="container">
    <div class="lookup-topper">
      {#if $activeTown && $data}
        <TownTopper townData={$data.towns[$activeTown]} />
      {:else}
        <Intro />
      {/if}
    </div>
    <div class="map">
      <Map />
    </div>
    <div class="town-charts">
      {#if $activeTown}
        <TownCharts
          townData={$data.towns[$activeTown]}
          computed={$data.computed} />
      {:else}
        <div class="towns">
          {#if $data}
            <h2 class="subheadline default-towns-subheadline">
              Or explore communities across the West, starting with these examples:
            </h2>
            <ul>
              {#each townButtons as townButton}
                <li>
                  <TownButton geoid={townButton} />
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/if}
    </div>
  </div>
  <p class="credits sans-serif">{$credits}</p>
</div>
