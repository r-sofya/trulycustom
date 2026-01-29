<script lang="ts">
	import { onMount } from 'svelte';

	let { isOpen = $bindable(false), title = '', children } = $props();

	function close() {
		isOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) close();
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

{#if isOpen}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<!-- Modal -->
		<div
			class="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-surface-800 shadow-2xl"
		>
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-surface-700 p-6">
				<h2 class="text-xl font-semibold text-primary-400">{title}</h2>
				<button
					onclick={close}
					class="rounded-lg p-2 text-surface-400 transition-colors hover:bg-surface-700 hover:text-white"
					aria-label="Close"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Content -->
			<div class="overflow-y-auto p-6">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
