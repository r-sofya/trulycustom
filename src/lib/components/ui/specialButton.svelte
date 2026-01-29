<script>
	import { browser } from '$app/environment';

	let testsize = 'xl';
	let textweight = 'extrabold';

	export let href = '';

	function handleClick() {
		if (!browser || !href) return;

		if (href.startsWith('#')) {
			// Handle anchor links with smooth scroll (case-insensitive)
			const targetId = href.slice(1).toLowerCase();
			const target =
				document.querySelector(`[id="${targetId}" i]`) ||
				document.getElementById(targetId) ||
				document.querySelector(`[id="${href.slice(1)}"]`);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			// Navigate to external/internal URLs
			window.location.href = href;
		}
	}
</script>

<button
	on:click={handleClick}
	class="group relative inset-0 z-10 flex cursor-pointer items-center justify-center overflow-hidden rounded-md border-none bg-white px-6 py-4 text-center text-black hover:text-white transition-all duration-200 font-semibold"
>
	<span class="text-{testsize} font-semibold">
		<slot name="text" />
	</span>
	<span
		class="absolute top-[5%] h-[200%] w-[110%] origin-right scale-x-0 rotate-12 transform bg-purple-200 transition-transform duration-1000 group-hover:scale-x-100 group-hover:duration-500"
	></span>
	<span
		class="absolute top-[5%] h-[200%] w-[110%] origin-right scale-x-0 rotate-12 transform bg-purple-400 transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-700"
	></span>
	<span
		class="absolute top-[5%] h-[200%] w-[110%] origin-right scale-x-0 rotate-12 transform bg-purple-600 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-1000"
	></span>
	<span
		class="absolute z-10 items-center opacity-0 duration-100 group-hover:opacity-100 group-hover:duration-1000 text-{testsize} font-semibold"
	>
		<slot name="hoverText" />
	</span>
</button>
