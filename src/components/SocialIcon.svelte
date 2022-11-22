<script>
  /*This companion component exists to serve up social icons. It requires only one parameter.*/
  // PARAMETERS
  // Which icon do you want?
  export let type;
</script>

<style>
  .social {
    width: 25px;
  }
  .social:hover,
  .social:focus {
    opacity: 0.8;
  }
  svg path,
  svg polygon {
    fill: #888;
  }
  .facebook path {
    fill: #3b5998;
  }

  .twitter path {
    fill: #00aced;
  }
</style>

{#if type.toLowerCase() === 'twitter'}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" class="social">
    <g class="twitter">
      <path
        d="M20.2,3.8c-0.7,0.3-1.5,0.5-2.4,0.6c0.8-0.5,1.5-1.3,1.8-2.3c-0.8,0.5-1.7,0.8-2.6,1c-0.7-0.8-1.8-1.3-3-1.3C11.8,1.9,10,3.7,10,6c0,0.3,0,0.6,0.1,0.9C6.7,6.7,3.7,5.1,1.6,2.6C1.3,3.2,1.1,3.9,1.1,4.7c0,1.4,0.7,2.7,1.8,3.4c-0.7,0-1.3-0.2-1.9-0.5v0.1c0,2,1.4,3.6,3.3,4c-0.3,0.1-0.7,0.1-1.1,0.1c-0.3,0-0.5,0-0.8-0.1c0.5,1.6,2,2.8,3.8,2.8c-1.4,1.1-3.2,1.8-5.1,1.8c-0.3,0-0.7,0-1-0.1c1.8,1.2,4,1.8,6.3,1.8c7.5,0,11.7-6.3,11.7-11.7l0-0.5C19,5.3,19.7,4.6,20.2,3.8z" />
    </g>
  </svg>
{/if}
{#if type.toLowerCase() === 'facebook'}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" class="social">
    <g class="facebook">
      <path
        d="M7.9,3.9c0,0.5,0,2.7,0,2.7h-2V10h2v10H12V10h2.8c0,0,0.3-1.6,0.4-3.4c-0.4,0-3.1,0-3.1,0s0-2,0-2.3c0-0.3,0.5-0.8,0.9-0.8c0.4,0,1.4,0,2.3,0c0-0.5,0-2,0-3.5c-1.2,0-2.5,0-3.1,0C7.8,0,7.9,3.4,7.9,3.9z" />
    </g>
  </svg>
{/if}
{#if type.toLowerCase() === 'email'}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" class="social">
    <g class="email">
      <path
        d="M10,12.8l-2.5-2.2l-7.1,6.1c0.3,0.2,0.6,0.4,1,0.4h17.1c0.4,0,0.7-0.1,1-0.4l-7.1-6.1L10,12.8z" />
      <path
        d="M19.5,3.2c-0.3-0.2-0.6-0.4-1-0.4H1.4c-0.4,0-0.7,0.1-1,0.4l9.5,8.2L19.5,3.2z" />
      <polygon points="0,4.1 0,16 6.9,10.1" />
      <polygon points="13.1,10.1 20,16 20,4.1" />
    </g>
  </svg>
{/if}
