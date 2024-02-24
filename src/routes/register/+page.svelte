<script lang="ts">
	import type { PageData } from '../$types';
	import MdiEye from '~icons/mdi/eye';
	import MdiEyeOff from '~icons/mdi/eye-off';
	import MdiGithub from '~icons/mdi/github';
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
		<form method="POST" action="?/register">
			<Card.Header>
				<Card.Title class="text-center text-lg">Sign Up</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid w-full items-center gap-4">
					<div class="flex space-y-1.5">
						<Input
							id="email"
							name="email"
							placeholder="Email Address"
							type="email"
							value={form?.data?.email ?? ''}
							required
						/>
					</div>
					{#if form?.errors?.email}
						<div class="flex space-y-1.5">
							<Label for="email" class="-mt-3 text-xs text-red-600"
								>{form?.errors?.email}</Label
							>
						</div>
					{/if}
					<div class="flex space-y-1.5">
						<Input
							id="username"
							name="username"
							placeholder="Username"
							type="text"
							value={form?.data?.username ?? ''}
							required
						/>
					</div>
					{#if form?.errors?.username}
						<div class="flex space-y-1.5">
							<Label for="username" class="-mt-3 text-xs text-red-600"
								>{form?.errors?.username}</Label
							>
						</div>
					{/if}
					<div class="flex justify-end space-y-1.5">
						<Input
							id="password"
							name="password"
							placeholder="Password"
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
				{#if form?.authError}
					<Alert.Root variant="destructive">
						<MdiError class="-mt-1"></MdiError>
						<Alert.Description class="text-center"
							>{form?.authError}</Alert.Description
						>
					</Alert.Root>
				{/if}
				<Button class="w-full" type="submit">Sign Up</Button>
				<div class="inline-block text-center">
					<span>Already have an account?</span><a
						href="/login"
						class="text-blue-600 hover:text-blue-500 ml-1"
					>
						Log In!</a
					>
				</div>
				<div class="flex items-center">
					<hr class="grow" />
					<span class="grow-0 p-4">OR</span>
					<hr class="grow" />
				</div>
				<form method="POST" action="?/register&provider=github">
					<Button class="w-full" type="submit" variant="outline"
						><MdiGithub class="mr-2"></MdiGithub>Continue with GitHub</Button
					>
				</form>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
