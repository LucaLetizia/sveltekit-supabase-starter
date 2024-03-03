<script lang="ts">
  import type { Session } from '@supabase/supabase-js';
  import Button from '../button/button.svelte';
  import MdiMenu from '~icons/mdi/menu';
  import MdiAccountCircle from '~icons/mdi/account-circle';

  export let session: Session | null;
  export let footerToggler: HTMLElement | null;
  export let drawerToggler: HTMLElement | null;

  export const handleBurgerMenuClick = () => {
    if (footerToggler) footerToggler.click();
  };
  export const handleDrawerClick = () => {
    if (drawerToggler) drawerToggler.click();
  };
</script>

<nav class="flex items-center justify-between flex-wrap p-6">
  <a href="/" class="flex items-center flex-shrink-0 mr-6">
    <span class="font-semibold text-xl tracking-tight">Home Page</span>
  </a>

  <div class="block lg:hidden">
    {#if session}
      <Button
        class="flex items-center px-3 py-2 rounded text-2xl"
        variant="ghost"
        on:click={handleDrawerClick}
      >
        <MdiAccountCircle></MdiAccountCircle>
      </Button>
    {:else}
      <Button
        class="flex items-center px-3 py-2 border rounded"
        on:click={handleBurgerMenuClick}
      >
        <MdiMenu></MdiMenu>
      </Button>
    {/if}
  </div>
  <div class="w-full hidden lg:flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a
        href="#responsive-header"
        class="block mt-4 lg:inline-block lg:mt-0 mr-4"
      >
        Action 2
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0">
        Action 3
      </a>
    </div>
    <div>
      {#if session}
        <Button
          class="flex items-center px-3 py-2 rounded text-2xl"
          variant="ghost"
          on:click={handleDrawerClick}
        >
          <MdiAccountCircle></MdiAccountCircle>
        </Button>
      {:else}
        <Button href="/login/">Log In</Button>
      {/if}
    </div>
  </div>
</nav>
<hr />
