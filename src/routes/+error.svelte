<script lang="ts">
  import { page } from '$app/stores';

  export let data;
</script>

<div class="h-screen">
  <h1>{$page?.error?.message}</h1>
</div>
