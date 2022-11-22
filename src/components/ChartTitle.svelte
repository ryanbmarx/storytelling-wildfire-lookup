<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { fireEvent } from "../utils/analytics.js";
  import { slugify } from "../utils/slugify.js";
  import WildfireIcon from "./WildfireIcon.svelte";
  import DefinitionButton from "./DefinitionButton.svelte";

  export let chartDefinition;
  export let chartTitle;
  export let stat = "senior";
  export let index;
  export let updateDate;

</script>

<style>
  .title {
    font-weight: bold;
    font-size: 1.2em;
    margin-top: 0;
    margin-bottom: 0.8em;

    display: flex;
    /* justify-items: baseline; */
    align-items: flex-start;
  }

  .title__icon {
    display: block;
    width: 35px;
    min-width: 35px;
    height: 35px;
    min-height: 35px;
    border-radius: 50%;
    margin-right: 0.5em;
    background: var(--wildfire-color-theme, orange);

    transform: translate(0, -0.1em);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title__icon :global(svg) {
    width: 80%;
  }

  .sublabel {
    display: block;
    font-weight: normal;
    font-style: italic;
    font-size: 14px;
    position: relative;
    color: var(--wildfire-gray-medium, #888);
  }
</style>

<!-- prettier-ignore -->
<h2 class="title">

  <span class="title__icon">
    <WildfireIcon icon={stat} />
  </span>
  <span>
    {@html chartTitle + '&nbsp;'}
    <DefinitionButton chartTitle={chartTitle} chartDefinition={chartDefinition} />
    {#if index === 0}
      <span class="sublabel">Each line represents one town in the data</span>
    {/if}
    {#if updateDate}
      <span class="sublabel">Updated: {updateDate}</span>
    {/if}
  </span>
</h2>