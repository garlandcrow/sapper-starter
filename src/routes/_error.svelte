<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  h1 {
    @apply text-5xl font-bold;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p class="mt-5">{error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
