<script>
  /*
This component places share buttons (at present, just Twitter, FB and email) on the screen.
It requires the companion component SocialIcon. 
*/
  import { fireEvent } from "../utils/analytics";
  import SocialIcon from "./SocialIcon.svelte";
  import { activeTown, data, projectSlug } from "../stores.js";
  import { get } from "svelte/store";

  // --------------
  // PROPS
  // --------------
  //   this is the project identifier for the analytics
  export let slug;
  export let text;
  // If alignment === "center", then the buttons are aligned thusly.
  export let alignment;
  //   The text to be shared, if applicable to that network
  export let shareText = "Default shareText";
  // Toggles for each network. Pass in as false to turn off.
  export let showFacebook = true;
  export let showTwitter = true;
  export let showEmail = true;

  // If there is an activeTown defined, make that the share link. Otherwise default to the project root.
  // Use whatever domain we are on to support all networks. The project slug is set in the store.js, and,
  // obviously, needs to match whatever the route is set to in uw config.

  export let url = $activeTown
    ? `${window.location.host}/${$projectSlug}/towns/${
        $data.towns[$activeTown].slug
      }`
    : `${window.location.host}/${$projectSlug}`;

  // These are the actual urls to be shared
  export let facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  export let twitterURL = `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
    shareText
  )}`;
  export let emailURL = `mailto:?subject=${encodeURIComponent(
    shareText
  )}&body=${encodeURIComponent(shareText + " " + url)}`;

  function shareButtonClick(event, shareType, shareText) {
    fireEvent(
      `${slug}-share-button-click-${shareType}-${encodeURIComponent(shareText)}`
    );
  }
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;

    position: relative;
  }

  ul.center {
    justify-content: center;
  }

  li {
    margin-right: 1em;
  }

  li p {
    /* This hides our labels */
    position: absolute;
    left: -10000vw;
  }

  .share-btn {
    display: block;
    border: none;
    margin: 0;
    padding: 0;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .share-btn:hover,
  .share-btn:focus {
    opacity: 0.8;
    transition: all 150ms ease;
  }
</style>

<div class="share-buttons">
  {#if text}
    <p>
      <strong>{text}</strong>
    </p>
  {/if}
  <ul class:center={alignment === 'center'}>
    {#if showFacebook}
      <li>
        <a
          target="_blank"
          rel="noopener"
          href={facebookURL}
          role="button"
          class="share-btn share-btn--facebook"
          aria-label="Share this post on Facebook"
          on:click={shareButtonClick('facebook', shareText)}>
          <p>Facebook</p>
          <SocialIcon type="facebook" />
        </a>
      </li>
    {/if}
    {#if showTwitter}
      <li>
        <a
          target="_blank"
          rel="noopener"
          href={twitterURL}
          role="button"
          class="share-btn share-btn--twitter"
          aria-label="Share this post on Twitter"
          on:click={shareButtonClick('twitter', shareText)}>
          <p>Twitter</p>
          <SocialIcon type="twitter" />
        </a>
      </li>
    {/if}
    {#if showEmail}
      <li>
        <a
          target="_blank"
          rel="noopener"
          href={emailURL}
          role="button"
          class="share-btn share-btn--email"
          aria-label="Share this post through email"
          on:click={shareButtonClick('email', shareText)}>
          <p>E-mail</p>
          <SocialIcon type="email" />
        </a>
      </li>
    {/if}
  </ul>
</div>
