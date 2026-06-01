<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();
	let iframeEl: HTMLIFrameElement;

	// Auto-resize iframe to match content height
	onMount(() => {
		function resize() {
			if (!iframeEl?.contentDocument?.body) return;
			iframeEl.style.height = iframeEl.contentDocument.body.scrollHeight + 'px';
		}

		iframeEl.addEventListener('load', resize);
		// Also resize after images load
		setTimeout(resize, 500);
		setTimeout(resize, 1500);
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>

<svelte:head>
	<title>Office Rent</title>
	<meta name="description" content="Flexible office room rental options in Troy, MI." />
</svelte:head>

<div class="gdoc-page">
	<iframe
		bind:this={iframeEl}
		srcdoc={data.html}
		title=""
		class="gdoc-iframe"
		frameborder="0"
		scrolling="no"
	></iframe>
</div>

<style>
	.gdoc-page {
		background-color: #ffffff;
		min-height: 100vh;
		display: flex;
		justify-content: center;
	}

	.gdoc-iframe {
		width: 100%;
		border: none;
		min-height: 100vh;
	}
</style>
