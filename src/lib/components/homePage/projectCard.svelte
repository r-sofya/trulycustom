<script lang="ts">
	let { children, index = 0, class: className, ...props } = $props();

	let cardElement = $state<HTMLElement>();
	let cardStyle = $state('');

	// Raw variables — no reactivity needed for scroll math
	let _elementTop = 0;
	let _elementHeight = 0;
	let _windowHeight = 0;
	let _ticking = false;

	function computeStyle(scrollProgress: number): string {
		const fadeOutStart = index === 0 ? 1.05 : 0.85;
		const fadeOutEnd = index === 0 ? 1.2 : 1.0;
		const fadeOutRange = 0.15;

		const opacity =
			scrollProgress < 0.15
				? scrollProgress / 0.15
				: scrollProgress > fadeOutStart
					? (fadeOutEnd - scrollProgress) / fadeOutRange
					: 1;

		const t = Math.min(scrollProgress * 2, 1);
		const translateY = (1 - t) * 60;
		const scale = 0.85 + t * 0.15;
		const rotate = (1 - t) * 3;

		return `opacity:${opacity};transform:translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg);will-change:transform,opacity`;
	}

	function tick() {
		const scrollY = window.scrollY;
		const currentRectTop = _elementTop - scrollY;
		const rawProgress = 1 - (currentRectTop + _elementHeight / 2) / (_windowHeight + _elementHeight);

		let progress: number;
		if (index === 0) {
			progress = Math.max(0, rawProgress);
		} else {
			progress = Math.max(0, Math.min(1, rawProgress));
		}

		cardStyle = computeStyle(progress);
		_ticking = false;
	}

	function requestTick() {
		if (!_ticking) {
			requestAnimationFrame(tick);
			_ticking = true;
		}
	}

	$effect(() => {
		if (!cardElement) return;

		function updateMetrics() {
			if (!cardElement) return;
			const rect = cardElement.getBoundingClientRect();
			_elementTop = rect.top + window.scrollY;
			_elementHeight = rect.height;
			_windowHeight = window.innerHeight;
			requestTick();
		}

		updateMetrics();

		window.addEventListener('resize', updateMetrics, { passive: true });
		window.addEventListener('scroll', requestTick, { passive: true });

		return () => {
			window.removeEventListener('resize', updateMetrics);
			window.removeEventListener('scroll', requestTick);
		};
	});
</script>

<a bind:this={cardElement} class={className} style={cardStyle} {...props}>
	{@render children()}
</a>
