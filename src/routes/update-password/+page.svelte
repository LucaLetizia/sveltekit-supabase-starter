<script lang="ts">
  import type { PageData } from '../$types';
  import MdiEye from '~icons/mdi/eye';
  import MdiEyeOff from '~icons/mdi/eye-off';
  import MdiError from '~icons/mdi/error';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Alert from '$lib/components/ui/alert';

  export let data: PageData;
  export let form;
  let showPassword = false;
  let showRepeatPassword = false;
</script>

<div class="flex h-screen">
  <Card.Root class="w-[350px] m-auto">
    <form method="POST" action="/update-password">
      <Card.Header>
        <Card.Title class="text-center text-lg">Update Password</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="grid w-full items-center gap-4">
          <div class="flex justify-end space-y-1.5">
            <Input
              id="password"
              name="password"
              placeholder="New Password"
              type={showPassword ? 'text' : 'password'}
              required
            />
            {#if showPassword}
              <button
                class="absolute mr-2 cursor-pointer mt-3"
                on:click={() => (showPassword = !showPassword)}
              >
                <MdiEyeOff></MdiEyeOff>
              </button>
            {:else}
              <button
                class="absolute mr-2 cursor-pointer mt-3"
                on:click={() => (showPassword = !showPassword)}
              >
                <MdiEye></MdiEye>
              </button>
            {/if}
          </div>
          {#if form?.errors?.password}
            <div class="flex space-y-1.5">
              <Label for="password" class="-mt-3 text-xs text-red-600"
                >{form?.errors?.password}</Label
              >
            </div>
          {/if}
          <div class="flex justify-end space-y-1.5">
            <Input
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat Password"
              type={showRepeatPassword ? 'text' : 'password'}
              required
            />
            {#if showRepeatPassword}
              <button
                class="absolute mr-2 cursor-pointer mt-3"
                on:click={() => (showRepeatPassword = !showRepeatPassword)}
              >
                <MdiEyeOff></MdiEyeOff>
              </button>
            {:else}
              <button
                class="absolute mr-2 cursor-pointer mt-3"
                on:click={() => (showRepeatPassword = !showRepeatPassword)}
              >
                <MdiEye></MdiEye>
              </button>
            {/if}
          </div>
          {#if form?.errors?.repeatPassword}
            <div class="flex space-y-1.5">
              <Label for="repeatPassword" class="-mt-3 text-xs text-red-600"
                >{form?.errors?.repeatPassword}</Label
              >
            </div>
          {/if}
        </div>
      </Card.Content>
      <Card.Footer class="grid w-full items-center gap-2">
        {#if form?.error}
          <Alert.Root variant="destructive">
            <MdiError class="-mt-1"></MdiError>
            <Alert.Description class="text-center"
              >{form?.error}</Alert.Description
            >
          </Alert.Root>
        {/if}
        {#if form?.message}
          <Alert.Root variant="default">
            <Alert.Description class="text-center"
              >{form?.message}</Alert.Description
            >
          </Alert.Root>
        {/if}
        <Button class="w-full" type="submit">Update Password</Button>
      </Card.Footer>
    </form>
  </Card.Root>
</div>
