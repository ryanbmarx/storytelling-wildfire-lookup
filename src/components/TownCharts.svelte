<script>
  import { onMount, afterUpdate } from "svelte";
  import { format } from "d3-format";
  // import { formatState } from "../utils/format-state.js";
  import { statMeta } from "../stores.js";
  import Chart from "./Chart.svelte";
  // import ShareButtons from "./ShareButtons.svelte";

  export let townData = {};
  export let townName;

  export let computed;
  // Pull the keys for charts we want from the written descriptions in the store.
  $: stats = Object.keys($statMeta);
  export let townArea = null;
</script>

<style>
  .charts {
    margin-top: var(--wildfire-grid-gap, 30px);
    display: grid;
    grid-gap: var(--wildfire-grid-gap, 30px);
    grid-template-rows: auto;
    grid-template-columns: 1fr;
  }

  @media all and (min-width: 1024px) {
    .charts {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<div class="charts">
  {#each stats as stat, index}
    <Chart
      {index}
      min={computed[stat]['min']}
      max={computed[stat]['max']}
      median={computed[stat]['median']}
      value={townData[stat]}
      {stat} />
  {/each}
</div>
