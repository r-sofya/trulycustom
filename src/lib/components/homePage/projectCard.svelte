<script lang="ts">
	let { children, index = 0, class: className, ...props } = $props();

	let cardElement = $state<HTMLElement>();
	let scrollProgress = $state(0);

	// Continuous scroll-based animation
	$effect(() => {
		if (!cardElement) return;

		function updateScrollProgress() {
			if (!cardElement) return;

			const rect = cardElement.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Calculate how far through the viewport the card is
			// 0 = just entering bottom, 0.5 = center, 1 = exiting top
			const rawProgress = 1 - (rect.top + rect.height / 2) / (windowHeight + rect.height);

			// Allow the first (large) item to exceed 1 so it can fade out fully (needs to reach 1.2)
			// Clamp others to 1 to match Services section exactly
			if (index === 0) {
				scrollProgress = Math.max(0, rawProgress);
			} else {
				scrollProgress = Math.max(0, Math.min(1, rawProgress));
			}
		}

		updateScrollProgress();
		window.addEventListener('scroll', updateScrollProgress, { passive: true });
		window.addEventListener('resize', updateScrollProgress, { passive: true });

		return () => {
			window.removeEventListener('scroll', updateScrollProgress);
			window.removeEventListener('resize', updateScrollProgress);
		};
	});

	// Calculate transform based on scroll progress
	let cardStyle = $derived(() => {
		// For the first item (featured project), shift the fade out window due to its size
		// Standard range is 0.15 (0.85 -> 1.0)
		// We maintain the same 0.15 range but shift it to 1.05 -> 1.2 for the large card
		const fadeOutStart = index === 0 ? 1.05 : 0.85;
		const fadeOutEnd = index === 0 ? 1.2 : 1.0;
		const fadeOutRange = 0.15;

		// Fade in/out
		const opacity =
			scrollProgress < 0.15
				? scrollProgress / 0.15
				: scrollProgress > fadeOutStart
					? (fadeOutEnd - scrollProgress) / fadeOutRange
					: 1;

		// Dramatic slide up - starts 60px down
		// We use clamped progress for transform to prevent over-movement on large card
		// Actually, let's stick to the logic: Math.min(progress * 2, 1) caps at 0.5 anyway.
		const translateY = (1 - Math.min(scrollProgress * 2, 1)) * 60;

		// Scale from 0.85 to 1
		const scale = 0.85 + Math.min(scrollProgress * 2, 1) * 0.15;

		// Subtle rotation
		const rotate = (1 - Math.min(scrollProgress * 2, 1)) * 3;

		return `opacity: ${opacity}; transform: translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg);`;
	});
</script>

<a bind:this={cardElement} class={className} style={cardStyle()} {...props}>
	{@render children()}
</a>
