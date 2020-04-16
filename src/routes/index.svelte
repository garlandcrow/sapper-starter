<script>
  import Textfield from '@smui/textfield'
  let didClick = false
  let name = ''
</script>

<svelte:head>
  <title>Hot Tailwind Sapper project template</title>
</svelte:head>

<div class="flex flex-col text-center">

  <h1 class="bg-blue-300">Great success using Tailwind class!</h1>

  {#if !didClick}
    <button class="m-2 p-2 bg-blue-500 rounded text-white" on:click={() => (didClick = true)}>
      Click Me
    </button>
  {:else}
    <p class="m-4">This should stay even after an HMR change.</p>
  {/if}

  <strong class="apply-style">
    I am using an @apply style to set background. Try editing to test HMR.
  </strong>
  <Textfield bind:value={name} label="Name" />
</div>

<style>
  h1 {
    @apply text-3xl font-bold uppercase;
  }

  .apply-style {
    @apply bg-red-300;
  }
</style>
