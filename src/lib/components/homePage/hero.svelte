<script lang="ts">
	import SpecialButton from '../ui/specialButton.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let app: any;
	let targetObject: any;
	let heroSection: HTMLElement;
	let mouseRotationY = 0;
	let scrollRotationY = 0;
	let isLoaded = false;

	let heroTop = 0;
	let heroHeight = 0;
	let windowHeight = 0;
	let ticking = false;

	// Adjust this to match the name of the object you want to rotate
	const OBJECT = 'macBook'; // Replace with your Spline object name

	function updateRotation() {
		if (!targetObject) return;
		targetObject.rotation.y = mouseRotationY + scrollRotationY;
	}

	function requestUpdate() {
		if (!ticking) {
			requestAnimationFrame(() => {
				updateRotation();
				ticking = false;
			});
			ticking = true;
		}
	}

	//mouse rotation
	function handleMouseMove(event: any) {
		if (!targetObject || !browser) return;
		const x = event.clientX / window.innerWidth;
		const normalizedX = (x - 0.5) * 2; // -1 (left) to 1 (right)
		const maxRotation = (5 * Math.PI) / 180; // 5 degrees in radians
		mouseRotationY = normalizedX * maxRotation;
		requestUpdate();
	}

	function updateMetrics() {
		if (!heroSection) return;
		const rect = heroSection.getBoundingClientRect();
		heroTop = rect.top + window.scrollY;
		heroHeight = rect.height;
		windowHeight = window.innerHeight || document.documentElement.clientHeight;
		handleScroll(); // Recalculate scroll rotation with new metrics
	}

	//scroll rotation left to right (reverse direction)
	function handleScroll() {
		if (!targetObject || !heroSection || !browser) return;

		const scrollY = window.scrollY;
		const currentTop = heroTop - scrollY;
		const currentBottom = currentTop + heroHeight;

		const visible =
			Math.max(0, Math.min(currentBottom, windowHeight) - Math.max(currentTop, 0)) / //visible height of the section
			Math.min(heroHeight, windowHeight); //total height of the section
		const maxRotation = (1000 * Math.PI) / 8000; // 100 degrees in radians (max rotation)
		// Reverse the direction by multiplying by -1
		scrollRotationY = -1 * (visible - 0.5) * 2 * maxRotation;
		requestUpdate();
	}

	onMount(async () => {
		if (!browser) return;

		try {
			const { Application } = await import('@splinetool/runtime');
			app = new Application(canvas);
			await app.load('https://prod.spline.design/wiDfpToqtjFfJCby/scene.splinecode');

			// Find the object you want to rotate
			targetObject = app.findObjectByName(OBJECT);
			// Optionally, fallback to first mesh if you don't know the name
			if (!targetObject) {
				targetObject = app.scene.children.find((obj: any) => obj.type === 'mesh');
			}

			// Make the object bigger by adjusting its scale
			if (targetObject) {
				targetObject.scale.set(1, 1, 1); // Scale up by 2x in all dimensions
				// You can adjust these values: (1.5, 1.5, 1.5) for 1.5x, (3, 3, 3) for 3x, etc.
			}

			// Initialize metrics
			updateMetrics();

			// Add mousemove listener to window instead of canvas
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('scroll', handleScroll, { passive: true });
			window.addEventListener('resize', updateMetrics);

			// Mark as loaded
			isLoaded = true;
		} catch (error) {
			console.error('Failed to load Spline scene:', error);
		}
	});

	onDestroy(() => {
		if (!browser) return;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('scroll', handleScroll);
		window.removeEventListener('resize', updateMetrics);
	});

	//only calculate navbar once
</script>

<section id="Home" class="flex items-stretch px-[5%] pt-[10vh] lg:h-[80vh]" bind:this={heroSection}>
	<div class="flex content-stretch">
		<div class="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
			<div>
				<h1 class="text-4xl font-bold md:text-5xl">
					Transforming Ideas into Stunning Visual Experiences
				</h1>
				<p class="pt-6 text-lg">
					At Truly Custom, we blend creativity with strategy to deliver exceptional design solutions
					tailored to your needs. Discover how our innovative approach can elevate your brand and
					engage your audience.
				</p>
				<div class="mt-6 flex flex-wrap gap-4 md:mt-8">
					<SpecialButton href="#contact">
						<span slot="text">Get Started Now</span>
						<span slot="hoverText">Let's Go!</span>
					</SpecialButton>
				</div>
			</div>
			<div class="aspect-[1/1] w-full overflow-visible">
				<canvas bind:this={canvas} class="h-full w-full cursor-grab"></canvas>
			</div>
		</div>
	</div>
</section>
