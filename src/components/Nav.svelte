<script>
  export let segment
</script>

<nav class="border-b border-red-300 flex items-center">
  <a href=".">home</a>
  <a href="about">about</a>
  <p class="mx-auto">segment={segment ? segment : 'home'}</p>
</nav>

<style>
  a {
    @apply block p-3;
    text-decoration: none;
  }

  a:hover {
    @apply bg-red-300;
  }
</style>
