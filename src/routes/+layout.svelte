<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { setupGlobalNavigation } from '$lib/utils/globalNavigation';

	let { children } = $props();

	onMount(() => {
		setupGlobalNavigation();
	});
</script>

<div class="bg-page">
	{@render children()}
</div>
