<script lang="ts">
  import type { Session } from '@supabase/supabase-js';
  import Button from '../button/button.svelte';
  import MdiMenu from '~icons/mdi/menu';
  import { enhance } from '$app/forms';
  import { PUBLIC_UPDATE_PASSWORD_ROUTE } from '$env/static/public';

  export let session: Session | null;
  export let footerToggle: HTMLElement | null;

  export const handleBurgerMenuClick = () => {
    if (footerToggle) {
      footerToggle.click();
    }
  };
</script>

<nav class="flex items-center justify-between flex-wrap p-6">
  <a href="/" class="flex items-center flex-shrink-0 mr-6">
    <span class="font-semibold text-xl tracking-tight">Home Page</span>
  </a>

  <div class="block lg:hidden">
    <Button
      class="flex items-center px-3 py-2 border rounded"
      on:click={handleBurgerMenuClick}
    >
      <MdiMenu></MdiMenu>
    </Button>
  </div>
  <div class="w-full hidden lg:flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      {#if session}
        <a
          href={`/${PUBLIC_UPDATE_PASSWORD_ROUTE}`}
          class="block mt-4 lg:inline-block lg:mt-0 mr-4"
        >
          Update Password
        </a>
      {/if}

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
        <form method="POST" action="/logout" use:enhance>
          <Button type="submit">Log Out</Button>
        </form>
      {:else}
        <Button href="/login/">Log In</Button>
      {/if}
    </div>
  </div>
</nav>
<hr />
