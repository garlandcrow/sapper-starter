<script>
  let didClick = false;
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  .apply-style {
    @apply bg-red-300;
  }
</style>

<svelte:head>
  <title>Hot Tailwind Sapper project template</title>
</svelte:head>

<h1 class="bg-blue-300">Great success using Tailwind class!</h1>

{#if !didClick}
  <h1 on:click={() => (didClick = true)}>Click Me</h1>
{:else}
  <h1>This should stay even after an HMR change.</h1>
{/if}

<figure>
  <img alt="Borat" src="great-success.png" />
</figure>

<p>
  <strong class="apply-style">
    I am using an @apply style to set background. Try editing to test HMR.
  </strong>
</p>
