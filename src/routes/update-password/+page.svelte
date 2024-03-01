<script lang="ts">
  import MdiEye from '~icons/mdi/eye';
  import MdiEyeOff from '~icons/mdi/eye-off';
  import MdiInformation from '~icons/mdi/information';
  import MdiError from '~icons/mdi/error';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Alert from '$lib/components/ui/alert';
  import { superForm } from 'sveltekit-superforms';
  import { page } from '$app/stores';

  export let data;
  const { form, errors, message } = superForm(data?.form);
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
          {#if $errors?.password}
            <div class="flex space-y-1.5">
              <Label for="password" class="-mt-3 text-xs text-red-600"
                >{$errors?.password}</Label
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
          {#if $errors?.repeatPassword}
            <div class="flex space-y-1.5">
              <Label for="repeatPassword" class="-mt-3 text-xs text-red-600"
                >{$errors?.repeatPassword}</Label
              >
            </div>
          {/if}
        </div>
      </Card.Content>
      <Card.Footer class="grid w-full items-center gap-2">
        {#if $message}
          {#if $page?.status?.toString()?.startsWith('2')}
            <Alert.Root variant="info">
              <MdiInformation class="-mt-1"></MdiInformation>
              <Alert.Description class="text-center"
                >{$message}</Alert.Description
              >
            </Alert.Root>
          {:else}
            <Alert.Root variant="destructive">
              <MdiError class="-mt-1"></MdiError>
              <Alert.Description class="text-center"
                >{$message}</Alert.Description
              >
            </Alert.Root>
          {/if}
        {/if}

        <Button class="w-full" type="submit">Update Password</Button>
      </Card.Footer>
    </form>
  </Card.Root>
</div>
