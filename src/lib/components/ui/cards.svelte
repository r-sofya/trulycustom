<script lang="ts">
	import Icon from '@iconify/svelte';

	let { title, description, icon, iconColor, index = 0 } = $props();

	let cardElement = $state<HTMLElement>();
	let cardStyle = $state('');

	// Raw variables — no reactivity needed for scroll math
	let _elementTop = 0;
	let _elementHeight = 0;
	let _windowHeight = 0;
	let _ticking = false;

	function computeStyle(progress: number): string {
		const opacity =
			progress < 0.15
				? progress / 0.15
				: progress > 0.85
					? (1 - progress) / 0.15
					: 1;
		const t = Math.min(progress * 2, 1);
		const translateY = (1 - t) * 60;
		const scale = 0.85 + t * 0.15;
		const rotate = (1 - t) * 3;
		return `opacity:${opacity};transform:translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
	}

	function tick() {
		const scrollY = window.scrollY;
		const currentRectTop = _elementTop - scrollY;
		const progress = 1 - (currentRectTop + _elementHeight / 2) / (_windowHeight + _elementHeight);
		const clamped = Math.max(0, Math.min(1, progress));
		cardStyle = computeStyle(clamped);
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

<div
	bind:this={cardElement}
	class="card relative rounded-2xl p-6"
	style={cardStyle}
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
		border: 1px solid rgba(255, 255, 255, 0.08);
		will-change: transform, opacity;
		contain: layout style paint;
	}

	.icon-ring {
		background: rgba(var(--color-primary-rgb, 139, 92, 246), 0.1);
		border: 1px solid var(--color-primary-200);
	}
</style>
