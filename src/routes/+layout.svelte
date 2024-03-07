<script lang="ts">
  import '../app.css';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
  import Navbar from '$lib/components/ui/navbar/navbar.svelte';
  import * as Collapsible from '$lib/components/ui/collapsible';
  import { Button } from '$lib/components/ui/button';
  import ProfileSidebar from '$lib/components/ui/profile-sidebar/profile-sidebar.svelte';
  import { theme } from '$lib/stores/theme';

  export let data;
  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  let footerToggler: HTMLElement | null;
  let drawerToggler: HTMLElement | null;
  onMount(() => {
    footerToggler = document?.getElementById('toggle-footer');
    drawerToggler = document?.getElementById('toggle-profile-drawer');

    const { data } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, _session: Session | null) => {
        if (_session?.expires_at !== session?.expires_at) {
          invalidate('supabase:auth');
        }
      },
    );
    return () => data.subscription.unsubscribe();
  });
</script>

<main class="text-foreground bg-background">
  <Navbar {session} {footerToggler} {drawerToggler}></Navbar>
  <slot />
  <div class="space-y-1 w-full fixed bottom-0 z-10 lg:hidden">
    {#if session}
      <ProfileSidebar></ProfileSidebar>
    {:else}
      <Collapsible.Root class="w-[350px] space-y-2">
        <div class="flex items-center justify-between space-x-4 px-4">
          <Collapsible.Trigger asChild let:builder>
            <Button
              builders={[builder]}
              variant="ghost"
              size="sm"
              class="hidden"
              id="toggle-footer"
            ></Button>
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content class="space-y-2">
          <div
            class="flex flex-col rounded-md border px-4 py-3 font-mono text-sm w-screen text-center bg-background"
          >
            <div>
              <a href="/login" class="hover:underline">Log In</a>
            </div>

            <div>
              <a href="#" class="hover:underline">Action 2</a>
            </div>
            <div>
              <a href="#" class="hover:underline">Action 3</a>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    {/if}
  </div>
</main>
