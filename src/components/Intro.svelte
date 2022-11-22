<script>
  import Search from "./Search.svelte";
  import { projectSlug, shareText, intro, kicker, standAloneKicker } from "../stores.js";
  import ShareButtons from "./ShareButtons.svelte";
  import { isStandalone } from "../utils/is-standalone.js";

  let standalone = isStandalone();
</script>
{#if standalone}
  <span class="wildfireKicker sans-serif">{$standAloneKicker}</span>
  <h1 class="headline headline--slash">{$intro.standAloneHeadline}</h1>
  <ShareButtons shareText={$shareText} slug={$projectSlug} />
  {@html $intro.standAloneBlurb}
{:else}
  <span class="wildfireKicker sans-serif">{$kicker}</span>
  <h1 class="headline headline--slash">{$intro.headline}</h1>
  <ShareButtons shareText={$shareText} slug={$projectSlug} />
  {@html $intro.blurb}
{/if}
<h2 class="subheadline">Search for a community</h2>
<Search />
