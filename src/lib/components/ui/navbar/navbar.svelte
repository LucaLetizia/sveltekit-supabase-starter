<script lang="ts">
  import type { Session } from '@supabase/supabase-js';
  import Button from '../button/button.svelte';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import MdiMenu from '~icons/mdi/menu';
  import MdiAccountCircle from '~icons/mdi/account-circle';
  import MdiMoonWaningCrescent from '~icons/mdi/moon-waning-crescent';
  import MdiWhiteBalanceSunny from '~icons/mdi/white-balance-sunny';
  import { theme } from '$lib/stores/theme';
  import { browser } from '$app/environment';

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

  <div class="flex items-end lg:hidden">
    <Tooltip.Root>
      <Tooltip.Trigger asChild let:builder>
        {#if $theme === 'dark'}
          <Button
            builders={[builder]}
            class="px-3 py-2 rounded text-xl"
            variant="ghost"
            type="button"
            on:click={() => theme.updateTheme('light')}
          >
            {#if browser}
              <MdiWhiteBalanceSunny></MdiWhiteBalanceSunny>
            {/if}
          </Button>
        {:else}
          <Button
            builders={[builder]}
            class="px-3 py-2 rounded text-xl"
            variant="ghost"
            type="button"
            on:click={() => theme.updateTheme('dark')}
          >
            {#if browser}
              <MdiMoonWaningCrescent></MdiMoonWaningCrescent>
            {/if}
          </Button>
        {/if}
      </Tooltip.Trigger>
      <Tooltip.Content>
        {#if $theme === 'dark'}
          <p>Lights on!</p>
        {:else}
          <p>Lights off!</p>
        {/if}
      </Tooltip.Content>
    </Tooltip.Root>
    {#if session}
      <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            class=" px-3 py-2 rounded text-xl"
            variant="ghost"
            on:click={handleDrawerClick}
          >
            <MdiAccountCircle></MdiAccountCircle>
          </Button></Tooltip.Trigger
        >
        <Tooltip.Content>
          <p>Profile</p>
        </Tooltip.Content>
      </Tooltip.Root>
    {:else}
      <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            class="flex items-center px-3 ml-1 py-2 border rounded text-xl"
            on:click={handleBurgerMenuClick}
          >
            <MdiMenu></MdiMenu>
          </Button></Tooltip.Trigger
        >
        <Tooltip.Content>
          <p>Menu</p>
        </Tooltip.Content>
      </Tooltip.Root>
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
    <div class="lg:flex lg:items-end">
      <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
          {#if $theme === 'dark'}
            <Button
              builders={[builder]}
              class="px-3 py-2 rounded text-xl"
              variant="ghost"
              type="button"
              on:click={() => theme.updateTheme('light')}
            >
              {#if browser}
                <MdiWhiteBalanceSunny></MdiWhiteBalanceSunny>
              {/if}
            </Button>
          {:else}
            <Button
              builders={[builder]}
              class="px-3 py-2 rounded text-xl"
              variant="ghost"
              type="button"
              on:click={() => theme.updateTheme('dark')}
            >
              {#if browser}
                <MdiMoonWaningCrescent></MdiMoonWaningCrescent>
              {/if}
            </Button>
          {/if}
        </Tooltip.Trigger>
        <Tooltip.Content>
          {#if $theme === 'dark'}
            <p>Lights on!</p>
          {:else}
            <p>Lights off!</p>
          {/if}
        </Tooltip.Content>
      </Tooltip.Root>
      {#if session}
        <Tooltip.Root>
          <Tooltip.Trigger asChild let:builder>
            <Button
              builders={[builder]}
              class="px-3 py-2 rounded text-xl"
              variant="ghost"
              on:click={handleDrawerClick}
            >
              <MdiAccountCircle></MdiAccountCircle>
            </Button></Tooltip.Trigger
          >
          <Tooltip.Content>
            <p>Profile</p>
          </Tooltip.Content>
        </Tooltip.Root>
      {:else}
        <Button href="/login/">Log In</Button>
      {/if}
    </div>
  </div>
</nav>
<hr />
