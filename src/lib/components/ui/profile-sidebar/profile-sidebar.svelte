<script lang="ts">
  import * as Sheet from '$lib/components/ui/sheet';
  import { Button } from '$lib/components/ui/button';
  import { goto } from '$app/navigation';
  import MdiLogout from '~icons/mdi/logout';
  import MdiPasswordReset from '~icons/mdi/password-reset';
</script>

<Sheet.Root>
  <Sheet.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      id="toggle-profile-drawer"
      class="hidden"
    ></Button>
  </Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Menu</Sheet.Title>
      <Sheet.Description>
        <Sheet.Close asChild let:builder>
          <Button
            builders={[builder]}
            class="w-full px-3 py-2 rounded justify-start"
            variant="ghost"
            on:click={() => goto('/update-password')}
            ><MdiPasswordReset class="mr-1"></MdiPasswordReset>Update Password
          </Button>
        </Sheet.Close>
        <form method="POST" action="/logout">
          <Button
            class="w-full px-3 py-2 rounded justify-start"
            variant="ghost"
            type="submit"
            ><MdiLogout class="mr-1"></MdiLogout>Log Out</Button
          >
        </form>
      </Sheet.Description>
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>
