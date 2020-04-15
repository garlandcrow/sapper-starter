<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<Nav {segment} />

<main class="relative p-8 mx-auto max-w-4xl bg-white">
  <slot />
</main>
