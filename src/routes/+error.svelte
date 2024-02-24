<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

<div class="h-screen">
	<h1>{$page?.error?.message}</h1>
</div>
