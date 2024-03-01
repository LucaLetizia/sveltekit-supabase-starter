<script lang="ts">
  import '../app.css';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
  import Navbar from '$lib/components/ui/navbar/navbar.svelte';
  import * as Collapsible from '$lib/components/ui/collapsible';
  import { Button } from '$lib/components/ui/button';
  import { enhance } from '$app/forms';
  import { PUBLIC_UPDATE_PASSWORD_ROUTE } from '$env/static/public';

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  let footerToggle: HTMLElement | null;
  onMount(() => {
    footerToggle = document.getElementById('footer-toggle');

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

<main class="dark text-foreground bg-background">
  <Navbar {session} {footerToggle}></Navbar>
  <slot />

  <div class="space-y-1 w-full fixed bottom-0 z-10 lg:hidden">
    <Collapsible.Root class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4">
        <Collapsible.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="ghost"
            size="sm"
            class="hidden"
            id="footer-toggle"
          ></Button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content class="space-y-2">
        <div
          class="flex flex-col rounded-md border px-4 py-3 font-mono text-sm w-screen text-center bg-background"
        >
          {#if !session}
            <div>
              <a href="/login" class="hover:underline">Log In</a>
            </div>
          {:else}
            <div>
              <form method="POST" action="/logout" use:enhance>
                <button class="hover:underline" type="submit">Log Out</button>
              </form>
            </div>
          {/if}

          {#if session}
            <div>
              <a
                href={`/${PUBLIC_UPDATE_PASSWORD_ROUTE}`}
                class="hover:underline">Update Password</a
              >
            </div>
          {/if}

          <div>
            <a href="#" class="hover:underline">Action 2</a>
          </div>
          <div>
            <a href="#" class="hover:underline">Action 3</a>
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  </div>
</main>
