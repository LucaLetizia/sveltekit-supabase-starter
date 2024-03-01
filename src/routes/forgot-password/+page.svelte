<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import * as Alert from '$lib/components/ui/alert';
  import { Label } from '$lib/components/ui/label';
  import MdiError from '~icons/mdi/error';
  import MdiInformation from '~icons/mdi/information';
  import { superForm } from 'sveltekit-superforms';
  import { page } from '$app/stores';

  export let data;

  const { form, errors, message } = superForm(data?.form);
  console.log($message);
</script>

<div class="flex h-screen">
  <Card.Root class="w-[350px] m-auto">
    <form method="POST" action="/forgot-password">
      <Card.Header>
        <Card.Title class="text-lg">Reset Your Password</Card.Title>
        <span class="text-sm"
          >Type in your email address and we'll send you a link to reset your
          password</span
        >
      </Card.Header>
      <Card.Content>
        <div class="grid w-full items-center gap-4">
          <div class="flex space-y-1.5">
            <Input
              id="email"
              name="email"
              placeholder="Email address"
              type="email"
              value={$form?.email ?? ''}
              required
            />
          </div>
          {#if $errors?.email}
            <div class="flex space-y-1.5">
              <Label for="email" class="-mt-3 text-xs text-red-600"
                >{$errors?.email}</Label
              >
            </div>
          {/if}
        </div>
      </Card.Content>
      <Card.Footer class="grid w-full items-center gap-2">
        {#if $message}
          {#if $page.status.toString().startsWith('2')}
            <Alert.Root variant="info">
              <MdiInformation class="-mt-1"></MdiInformation>
              <Alert.Description class="text-center"
                >{$message}</Alert.Description
              >
            </Alert.Root>
          {:else}
            <Alert.Root variant="destructive">
              <MdiError class="-mt-1"></MdiError>
              <Alert.Description>{$message}</Alert.Description>
            </Alert.Root>
          {/if}
        {/if}
        <Button class="w-full" type="submit">Reset Password</Button>
      </Card.Footer>
    </form>
  </Card.Root>
</div>
