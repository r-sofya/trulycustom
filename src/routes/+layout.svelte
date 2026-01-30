<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { setupGlobalNavigation } from '$lib/utils/globalNavigation';

	let { children } = $props();

	onMount(() => {
		setupGlobalNavigation();
	});
</script>

<!-- Global flowing gradient orbs -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div
		class="absolute top-[10%] -left-40 h-[500px] w-[500px] rounded-full bg-primary-500/15 blur-[150px]"
	></div>
	<div
		class="absolute top-[40%] -right-40 h-[600px] w-[600px] rounded-full bg-primary-600/10 blur-[180px]"
	></div>
	<div
		class="absolute top-[70%] -left-20 h-[400px] w-[400px] rounded-full bg-primary-400/10 blur-[120px]"
	></div>
</div>

<!-- Content -->
<div class="relative z-10">
	{@render children()}
</div>
