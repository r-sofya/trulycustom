<script>
	let testsize = 'md';
	let textweight = 'semibold';

	// Allow passing an href as a prop
	export let href = '';
</script>

<button
	class="buttonanimation relative cursor-pointer rounded-md border-none bg-primary-500 px-5 py-2.5 text-white transition-all duration-200 text-{testsize} font-{textweight} flex items-center outline-2 outline-primary-500"
	data-href={href}
>
	<span class="text-{testsize} font-{textweight}">
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
		class="absolute z-10 items-center opacity-0 duration-100 group-hover:opacity-100 group-hover:duration-1000 text-{testsize} font-{textweight}"
		><slot name="hoverText" /></span
	>
</button>

<style>
	.buttonanimation:before,
	.buttonanimation:after {
		position: absolute;
		content: '';
		width: 150%;
		left: 50%;
		height: 100%;
		transform: translateX(-50%);
		z-index: -1000;
		background-repeat: no-repeat;
	}

	.buttonanimation:hover:before {
		top: -70%;
		background-image:
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, transparent 20%, #7d2ae8 20%, transparent 30%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%);
		/* Use fixed pixel sizes to keep circles round regardless of stretching */
		background-size:
			24px 24px,
			32px 32px,
			28px 28px,
			32px 32px,
			24px 24px,
			32px 32px,
			28px 28px,
			24px 24px,
			28px 28px;
		background-position: 50% 120%;
		animation: greentopBubbles 0.6s ease;
		/* Remove aspect-ratio, use fixed height to preserve circle shape */
		height: 48px;
		min-width: 100%;
		width: 100%;
		pointer-events: none;
	}

	@keyframes greentopBubbles {
		0% {
			background-position:
				5% 90%,
				10% 90%,
				10% 90%,
				15% 90%,
				25% 90%,
				25% 90%,
				40% 90%,
				55% 90%,
				70% 90%;
		}

		50% {
			background-position:
				0% 80%,
				0% 20%,
				10% 40%,
				20% 0%,
				30% 30%,
				22% 50%,
				50% 50%,
				65% 20%,
				90% 30%;
		}

		100% {
			background-position:
				0% 70%,
				0% 10%,
				10% 30%,
				20% -10%,
				30% 20%,
				22% 40%,
				50% 40%,
				65% 10%,
				90% 20%;
			background-size:
				0% 0%,
				0% 0%,
				0% 0%,
				0% 0%,
				0% 0%,
				0% 0%;
		}
	}

	.buttonanimation:hover::after {
		bottom: -70%;
		background-image:
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%),
			radial-gradient(circle, #7d2ae8 20%, transparent 20%);
		/* Use fixed pixel sizes to keep circles round regardless of stretching */
		background-size:
			24px 24px,
			32px 32px,
			28px 28px,
			32px 32px,
			24px 24px,
			32px 32px,
			28px 28px;
		background-position: 50% -50%;
		animation: greenbottomBubbles 0.6s ease;
		/* Remove aspect-ratio, use fixed height to preserve circle shape */
		height: 48px;
		min-width: 100%;
		width: 100%;
		pointer-events: none;
	}

	@keyframes greenbottomBubbles {
		0% {
			background-position:
				10% -10%,
				30% 10%,
				55% -10%,
				70% -10%,
				85% -10%,
				70% -10%,
				70% 0%;
		}

		50% {
			background-position:
				0% 80%,
				20% 80%,
				45% 60%,
				60% 100%,
				75% 70%,
				95% 60%,
				105% 0%;
		}

		100% {
			background-position:
				0% 90%,
				20% 90%,
				45% 70%,
				60% 110%,
				75% 80%,
				95% 70%,
				110% 10%;
			background-size:
				0% 0%,
				0% 0%,
				0% 0%,
				0% 0%,
				0% 0%,
				0% 0%;
		}
	}
</style>
