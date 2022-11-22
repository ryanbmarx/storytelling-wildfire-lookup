<script>
  //   import { afterUpdate } from "svelte";
  import { data, statMeta } from "../stores.js";
  import { setActiveTown } from "../utils/active-town.js";
  import { formatState } from "../utils/format-state.js";
  import { format } from "d3-format";
  import { getWhpColor } from "../utils/whp-scale.js";

  export let geoid;
  export let townData = $data.towns[geoid];
  export let whp = townData.whp;
  export let whpColor = getWhpColor(whp);

  export function handleClick(e) {
    setActiveTown(geoid);
  }
</script>

<style>
  .town {
    /* default WHP color*/
    --whpColor: #aaa;
    display: flex;
    flex-flow: column;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 15px;
    margin: 0;

    text-align: center;
    background: transparent;
    box-sizing: border-box;
    border: 1px solid var(--whpColor, #aaa);
    border-radius: 5px;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .town:hover,
  .town:focus {
    background: #aaa;
    transition: all 150ms ease;
  }

  .town span {
    display: block;
    margin: 0;
  }
  .town span:last-child {
    display: block;
    margin: auto 0 0 0;
  }
  .town__name {
    font: 20px/1em var(--sans-serif, sans-serif);
    font-weight: bold;
    text-transform: uppercase;
  }

  /* .town__state {
    font: 16px/1em var(--sans-serif, sans-serif);

    font-weight: bold;
    text-transform: uppercase;
    color: #888;
  } */
</style>

<button class="town" on:click={handleClick} style="--whpColor: {whpColor}">
  <span class="town__name">
    {townData.name}, {formatState(townData.state, 'AP', 'postal')}
  </span>

  <span class="town__whp sans-serif">
    WHP rating: {format($statMeta.whp.formatString)(whp)}
  </span>

</button>
