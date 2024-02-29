<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import MdiEye from '~icons/mdi/eye';
	import MdiEyeOff from '~icons/mdi/eye-off';
	import MdiError from '~icons/mdi/error';
	import MdiGithub from '~icons/mdi/github';
	import { Label } from '$lib/components/ui/label';
	import * as Alert from '$lib/components/ui/alert';
	import { superForm } from 'sveltekit-superforms';

	export let data;
	const { form, errors, message } = superForm(data?.form);
	let showPassword = false;
</script>

<div class="flex h-screen">
	<Card.Root class="w-[350px] m-auto">
		<form method="POST" action="?/login">
			<Card.Header>
				<Card.Title class="text-center text-lg">Log In</Card.Title>
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
					<div class="flex justify-end space-y-1.5">
						<Input
							id="password"
							name="password"
							placeholder="Password"
							type={showPassword ? 'text' : 'password'}
							class="pr-8"
							required
						/>
						{#if showPassword}
							<button
								class="absolute mr-2 cursor-pointer"
								on:click={() => (showPassword = !showPassword)}
							>
								<MdiEyeOff></MdiEyeOff>
							</button>
						{:else}
							<button
								class="absolute mr-2 cursor-pointer"
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
					<a
						href="/forgot-password"
						class="text-right text-sm text-blue-600 hover:text-blue-500"
						>Forgot password?</a
					>
				</div>
			</Card.Content>
			<Card.Footer class="grid w-full items-center gap-2">
				{#if $message}
					<Alert.Root variant="destructive">
						<MdiError class="-mt-1"></MdiError>
						<Alert.Description>{$message}</Alert.Description>
					</Alert.Root>
				{/if}
				<Button class="w-full" type="submit">Log In</Button>
				<div class="inline-block text-center">
					<span>Don't have an account?</span><a
						href="/register"
						class="text-blue-600 hover:text-blue-500 ml-1"
					>
						Sign Up!</a
					>
				</div>
				<div class="flex items-center">
					<hr class="grow" />
					<span class="grow-0 p-4">OR</span>
					<hr class="grow" />
				</div>
				<form method="POST" action="?/login&provider=github">
					<Button class="w-full" type="submit" variant="outline"
						><MdiGithub class="mr-2"></MdiGithub>Continue with GitHub</Button
					>
				</form>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
