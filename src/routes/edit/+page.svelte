<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/edit/projects', { replaceState: true });
	});
</script>

<div class="flex h-64 items-center justify-center">
	<p class="text-surface-400">Redirecting...</p>
</div>
