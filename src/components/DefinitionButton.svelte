 <script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing"
  import { slugify } from "../utils/slugify.js";
  import { fireEvent } from "../utils/analytics.js";

  export let chartDefinition;
  export let chartTitle;
  export let showDefinition = false;

   export function handleClick(e) {
    // We begin with a value of false, so on first click we want to show, which means flipping the false to true.
    showDefinition = !showDefinition;
    definition(showDefinition);
  }

  function definition(show) {
    // This string is the custom event string
    let trackingString;
    showDefinition = show;

    if (show) {
      trackingString = `wildfires-2019-lookup-definition-open-${slugify(
        chartTitle
      )}`;
      // We are opening the tooltip
      document.querySelector("body").addEventListener(
        "click",
        function(e) {
          definition(false);
        },
        {
          once: true
        }
      );
    } else {
      // We are closing the tooltip
      trackingString = `wildfires-2019-lookup-definition-close-${slugify(
        chartTitle
      )}`;
    }
    fireEvent(trackingString);
  }
 </script>
<style>
  .button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 15px;
    width: 15px;
    min-height: 15px;
    min-width: 15px;
    font-weight: bold;
    vertical-align: super;

    cursor: help;
    font-size: 12px;
    padding: 0;
    background: #333;
    color: #fff;

    border: none;
    border-radius: 50%;
  }
  .definition {
    display: none;
    box-sizing: border-box;
    position: absolute;
    padding: 1em;
    color: white;
    background: black;
    font-weight: normal;
    font-size: 1rem;
    max-width: 350px;
    width: 100%;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 250px;
    margin: 0;
    z-index: 4;
  }

  .definition.show {
    display: block;
  }
</style> 
<!-- prettier-ignore -->
<button class="button" on:click|stopPropagation={handleClick}>?</button>
<p
  transition:slide={{ delay: 350, duration: 300, easing: quintOut }}
  class="definition"
  class:show={showDefinition}>
  {chartDefinition}
</p>