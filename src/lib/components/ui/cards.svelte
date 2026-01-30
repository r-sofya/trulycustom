<script lang="ts">
	import Icon from '@iconify/svelte';

	let { title, description, icon, iconColor, index = 0 } = $props();

	let cardElement = $state<HTMLElement>();
	let scrollProgress = $state(0);

	let elementTop = $state(0);
	let elementHeight = $state(0);
	let windowHeight = $state(0);

	// Continuous scroll-based animation
	$effect(() => {
		if (!cardElement) return;

		function updateMetrics() {
			if (!cardElement) return;
			const rect = cardElement.getBoundingClientRect();
			elementTop = rect.top + window.scrollY;
			elementHeight = rect.height;
			windowHeight = window.innerHeight;
			// Force an update after metrics change
			updateScrollProgress();
		}

		function updateScrollProgress() {
			if (!cardElement) return;

			const scrollY = window.scrollY;
			// Calculate current rect.top without forcing reflow
			const currentRectTop = elementTop - scrollY;

			// Calculate how far through the viewport the card is
			// 0 = just entering bottom, 0.5 = center, 1 = exiting top
			const progress = 1 - (currentRectTop + elementHeight / 2) / (windowHeight + elementHeight);
			scrollProgress = Math.max(0, Math.min(1, progress));
		}

		// Initial calculation
		updateMetrics();

		// Update metrics on resize to handle layout changes
		window.addEventListener('resize', updateMetrics, { passive: true });

		// Only update progress on scroll (lightweight)
		window.addEventListener('scroll', updateScrollProgress, { passive: true });

		return () => {
			window.removeEventListener('resize', updateMetrics);
			window.removeEventListener('scroll', updateScrollProgress);
		};
	});

	// Calculate transform based on scroll progress
	let cardStyle = $derived(() => {
		// Fade in/out - matches portfolio.svelte
		// progress < 0.15 ? fade in
		// progress > 0.85 ? fade out
		const opacity =
			scrollProgress < 0.15
				? scrollProgress / 0.15
				: scrollProgress > 0.85
					? (1 - scrollProgress) / 0.15
					: 1;

		// Dramatic slide up - starts 60px down (matches portfolio)
		const translateY = (1 - Math.min(scrollProgress * 2, 1)) * 60;

		// Scale from 0.85 to 1 (matches portfolio)
		const scale = 0.85 + Math.min(scrollProgress * 2, 1) * 0.15;

		// Subtle rotation (matches portfolio)
		const rotate = (1 - Math.min(scrollProgress * 2, 1)) * 3;

		return `opacity: ${opacity}; transform: translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg);`;
	});
</script>

<div
	bind:this={cardElement}
	class="card relative rounded-2xl p-6"
	style={cardStyle()}
	role="article"
>
	<dt class="text-base/7 font-bold">
		<div class="icon-ring mb-5 flex size-15 items-center justify-center rounded-full">
			<Icon icon={`ri:${icon}-line`} class="size-8" color={iconColor} />
		</div>
		{title}
	</dt>
	<dd class="text-gray mt-2 text-base/7">{description}</dd>
</div>

<style>
	.card {
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		will-change: transform, opacity;
	}

	.icon-ring {
		background: rgba(var(--color-primary-rgb, 139, 92, 246), 0.1);
		border: 1px solid var(--color-primary-200);
	}
</style>
