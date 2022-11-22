<script>
  import { statMeta, ASSET_PATH, updates } from "../stores.js";
  import { urlFor } from "../utils/links.js";
  import { scaleLinear } from "d3-scale";
  import { hex } from "d3-color";
  import { format } from "d3-format";
  import { getTextColor } from "../utils/get-text-color.js";
  import { getWhpColor } from "../utils/whp-scale.js";
  import chroma from "chroma-js";

  // Components
  import ChartTitle from "./ChartTitle.svelte";
  import WildfireIcon from "./WildfireIcon.svelte";

  // PROPS

  export let min;
  export let max;
  export let median;
  export let value;
  export let stat;
  export let index;

  // REFS

  export let valueContainer;
  export let chartContainer;

  //   Chart labels
  export let medianLeft = true;

  let positionScale = scaleLinear()
    .domain([min, max])
    .range([0, 100]);

  let updateDate = $updates[stat] ? $updates[stat] : null;

  $: valueMargin = positionScale(value);
  $: labelRight = valueMargin > 75;
  $: labelLeft = valueMargin < 25;

  $: showOnChart = value <= max;

  $: medianPosition = getMedianPosition(median, min, max);
  $: valueColorTheme = stat === "whp" ? getWhpColor(value) : null;
  $: valueColorText = stat === "whp" ? getTextColor(valueColorTheme) : null;

  export function getMedianPosition(median, min, max) {
    const pos = positionScale(median);
    if (pos <= 50) return pos;
    medianLeft = false;
    return 100 - pos;
  }
  function rgbToHex(rgb) {
    if (rgb === null) return;
    let temp = /\(([^\)]+)\)/
      .exec(rgb)[1]
      .replace(/\s/g, "")
      .split(",");
    temp = chroma(temp).hex();
    return temp;
  }
</script>

<style>
  .chart {
    --wildfire-chart-pointer-width: 4px;
    --chartColorTheme: var(--wildfire-theme-color, #404040);
    --chartColorText: var(--wildfire-theme-text);
    margin: 0;
    padding: 0;
    position: relative;
    margin: 0 calc(var(--wildfire-chart-pointer-width, 15px) / 2);
  }

  .chart__container {
    margin: 0;
    box-sizing: border-box;
  }

  .chart__value {
    padding: 0.25em 0.5em;
    background: var(--chartColorTheme, #bf4225);
    font-weight: bold;
    color: var(--chartColorText, white);
    display: inline-block;
    transform: translate(-50%, 0);
  }

  .chart__value.labelLeft {
    transform: translate(
      calc(var(--wildfire-chart-pointer-width, 16px) * -2),
      0
    );
  }
  .chart__value.labelRight {
    /* Important used here to override the inline style */
    /* margin-left: 100% !important; */
    transform: translate(
      calc(-100% + var(--wildfire-chart-pointer-width, 16px) * 2),
      0
    );
  }

  .chart__value.labelNoChart {
    transform: none;
  }

  .chart__pointer {
    display: block;
    width: var(--wildfire-chart-pointer-width, 4px);
    height: 15px;
    background: var(--chartColorTheme, #bf4225);
    transform: translate(-50%, 0);
  }

  .chart__middle {
    position: relative;
  }

  .chart__image {
    width: 100%;
    display: block;
    min-height: 35px;
  }
  .chart__town-marker {
    width: var(--wildfire-chart-pointer-width, 4px);
    height: 100%;
    display: block;
    background: black;
    transform: translate(-50%, 0);

    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
  .chart__scale {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-bottom: 1.5em;
  }

  .chart__median {
    position: absolute;
    top: 0;
    transform: translate(-0.35em, 0);
  }

  .chart__median::before {
    content: "";
    height: 1.25em;
    width: 2px;
    background: var(--wildfire-gray-light, #aaa);
    display: block;
    transform: translate(0.35em, 0);
  }
  .chart__median.chart__median--right {
    text-align: right;
    transform: translate(0.35em, 0);
  }

  .chart__median.chart__median--right::before {
    transform: translate(-0.35em, 0);
    margin-left: auto;
  }
  .chart--whp,
  .chart--egress_dem {
    grid-column: 1 / -1;
  }

  .chart__min,
  .chart__max {
    /* For when they overlap with the median pointer */
    position: relative;
    text-shadow: 0 0 2px white;
    z-index: 2;
  }

  .chart__max {
    text-align: right;
  }
</style>

<div
  class="chart chart--{stat}"
  style="--chartColorTheme:{valueColorTheme};--chartColorText:{valueColorText};">
  <ChartTitle
    chartTitle={$statMeta[stat].label}
    chartDefinition={$statMeta[stat].description}
    {index}
    {stat}
    {updateDate} />
  <div class="chart__container" bind:this={chartContainer}>
    {#if showOnChart}
      <div class="chart__upper">
        {#if value >= 0}
          <span
            class="chart__value sans-serif"
            class:labelRight
            class:labelLeft
            style="margin-left:{valueMargin}%;">
            {format($statMeta[stat].formatString)(value)}
          </span>
          <span class="chart__pointer" style="margin-left:{valueMargin}%;" />
        {:else}
          <p class="sublabel">Data not available for this town</p>
        {/if}
      </div>
    {:else}
      <span class="chart__value labelNoChart sans-serif">
        {format($statMeta[stat].formatLabel)(value)}
      </span>
      <p class="sublabel">
        Note: this town has an unusually high value, therefore it is excluded
        from chart.
      </p>
    {/if}
    <div class="chart__middle">
      <img
        class="chart__image"
        src={urlFor(`charts/${stat}.png`, $ASSET_PATH)}
        alt="" />
      {#if value >= 0 && showOnChart}
        <span class="chart__town-marker" style="margin-left: {valueMargin}%;" />
      {/if}
    </div>
    <div class="chart__scale">
      <span class="chart__min sans-serif">
        {format($statMeta[stat].formatLabel)(min)}
      </span>
      <span class="chart__max sans-serif">
        {format($statMeta[stat].formatLabel)(max)}
      </span>
      {#if medianLeft}
        <span class="chart__median sans-serif" style="left: {medianPosition}%">
          Median: {format($statMeta[stat].formatString)(median)}
        </span>
      {:else}
        <span
          class="chart__median chart__median--right sans-serif"
          style="right: {medianPosition}%">
          Median: {format($statMeta[stat].formatString)(median)}
        </span>
      {/if}
    </div>
  </div>
</div>
