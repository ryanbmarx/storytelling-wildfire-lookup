<script>
  import { resetActiveTown } from "../utils/active-town.js";
  export let buttonText = "Reset";
</script>

<style>
  button {
    border: none;
    background: #eee;
    font-size: 14px;
    transition: all 150ms ease;
    cursor: pointer;
    border-radius: 4px;
    margin: 0 0 0 1em;
    width: 100%;
    max-width: 100px;

    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
  }

  button:hover,
  button:focus {
    background: var(--wildfire-color-theme, orange);
    color: var(--wildfire-color-text, white);
    transition: all 150ms ease;
  }
</style>

<button id="reset" class="sans-serif" on:click={resetActiveTown}>
  {buttonText}
</button>
