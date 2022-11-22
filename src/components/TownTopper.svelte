<script>
  import ShareButtons from "./ShareButtons.svelte";
  import Search from "./Search.svelte";
  import DefinitionButton from "./DefinitionButton.svelte";
  import { townTopperMeta } from "../stores.js";
  import { onMount } from "svelte";

  import {
    shareText,
    projectSlug,
    largeTownNote,
    kicker,
    standAloneKicker
  } from "../stores.js";
  import { format } from "d3-format";
  import { formatState } from "../utils/format-state.js";
  import { isStandalone } from "../utils/is-standalone.js";

  export let townData = {};
  let standalone = isStandalone();

  //   // Some town statistics
  $: townName =
    `${townData.name}, ${formatState(townData.state, "ap", "postal")}` || "";

  $: totalHouseholds = format(",")(townData["tot_hh"]);
  $: warningSystem = townData["wea"] ? "yes" : "no";
  $: totalPopulation = format(",")(townData["tot_pop"]);
  $: isLargeTown = townData["tot_hh"] > 15000;
</script>

<style>
  .town-stats {
    list-style: none;
    padding: calc(var(--wildfire-grid-gap, 30px) / 2);
    background: var(--wildfire-gray-very-light, #eee);
    margin: var(--wildfire-grid-gap, 30px) 0;
  }

  .town-stat {
    position: relative;
  }

  .town-stats br {
    display: none;
  }

  @media all and (min-width: 768px) {
    .town-stats {
      text-align: center;

      display: flex;
      justify-content: space-between;
    }

    .town-stats > * {
      flex: 1 1;
      max-width: 30%;
    }
    .town-stats br {
      display: block;
    }
  }
</style>

{#if standalone}
  <span class="wildfireKicker sans-serif">{$standAloneKicker}</span>
{:else}
  <span class="wildfireKicker sans-serif">{$kicker}</span>
{/if}
<h1 class="headline headline--slash">{townName}</h1>
<ShareButtons shareText={$shareText} slug={$projectSlug} />
<ul class="town-stats">
  <li class="town-stat sans-serif">
    <strong>Population:</strong>
    <br />
    {totalPopulation}
    <DefinitionButton chartDefinition={$townTopperMeta["population"].description} chartTitle="population"/>
  </li>
  <li class="town-stat sans-serif">
    <strong>Total households:</strong>
    <br />
    {totalHouseholds}
    <DefinitionButton chartDefinition={$townTopperMeta["total_hh"].description} chartTitle="total_hh"/>
  </li>
  <li class="town-stat sans-serif">
    <strong>Has emergency alert system:</strong>
    {warningSystem}
    <DefinitionButton chartDefinition={$townTopperMeta["wea"].description} chartTitle="wea"/>
  </li>
</ul>
{#if isLargeTown}
  <p class="sublabel">{$largeTownNote}</p>
{/if}
<Search instructions="Select another community" />
