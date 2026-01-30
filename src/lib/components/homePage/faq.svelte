<script lang="ts">
	import { FaqService } from '$lib/services/getFaq';
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Button from '$lib/components/ui/primaryButton.svelte';

	let faq: any;
	let faqs: Array<any> = [];
	let openIndex: number | null = null;

	onMount(async () => {
		faqs = await FaqService.getAll();
		faq = faqs;
	});

	function toggleAccordion(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<section id="FAQ" class="px-[5%] py-16 md:py-24 lg:py-28">
	<div
		class="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20"
	>
		<div>
			<h2 class="mb-3 text-5xl font-bold md:mb-4">FAQs</h2>
			<p class="text-medium">Can't find the answer you're looking for? Please chat to our team.</p>
			<div class="mt-6 md:mt-8">
				<Button href="#Contact">
					<span slot="text">Get in touch</span>
				</Button>
			</div>
		</div>
		<div class="space-y-2">
			{#each faq as faq, index}
				<div class="text-scheme-text overflow-hidden rounded-lg bg-gray-800">
					<div class="border-scheme-border border-b border-none px-5 first:border-t md:px-6">
						<h3 class="flex w-full">
							<button
								type="button"
								aria-expanded={openIndex === index}
								class="text-medium hover:bg-scheme-background/50 flex flex-1 cursor-pointer items-center justify-between py-4 font-bold transition-all ease-in-out focus-visible:ring-0 focus-visible:outline-none md:py-5"
								on:click={() => toggleAccordion(index)}
							>
								{faq?.question}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24px"
									height="24px"
									viewBox="0 -960 960 960"
									class="text-scheme-text size-7 shrink-0 transition-transform duration-300 ease-out md:size-8 {openIndex ===
									index
										? 'rotate-45'
										: ''}"
									fill="currentColor"
								>
									<path
										d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"
									></path>
								</svg>
							</button>
						</h3>
						{#if openIndex === index}
							<div transition:slide={{ duration: 300, easing: cubicOut }} class="overflow-hidden">
								<div class="prose max-w-none pb-4 whitespace-pre-line prose-invert md:pb-5">
									{@html faq?.answer}
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
