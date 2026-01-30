<script lang="ts">
	import PrimaryButton from './ui/primaryButton.svelte';
	import SecondaryButton from './ui/secondaryButton.svelte';
	import { onMount } from 'svelte';

	let isMenuOpen = false;
	let navSection: HTMLElement;

	function closeMenu() {
		isMenuOpen = false;
	}

	// Recalculate when menus toggle
	$: {
		isMenuOpen; // dependency
	}
	let navLink = [
		{
			name: 'Home',
			href: '/#Home'
		},
		{
			name: 'Services',
			href: '/#Services'
		},
		{
			name: 'Projects',
			href: '/#Projects'
		},
		{
			name: "FAQ's",
			href: '/#FAQ'
		}
	];
</script>

<section
	bind:this={navSection}
	class="bg-scheme-background bg-primary fixed top-0 z-[999] flex w-full items-center border-b border-surface-500 lg:min-h-18 lg:px-[5%]"
>
	<div class="size-full lg:flex lg:items-center lg:justify-between">
		<div
			class="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0"
		>
			<a href="/#Home" class="text-primary text-2xl font-bold" on:click={closeMenu}>Truly Custom</a>
			<button
				class="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
				type="button"
				aria-label="Toggle navigation menu"
				aria-controls="nav-menu"
				aria-expanded={isMenuOpen}
				on:click={() => (isMenuOpen = !isMenuOpen)}
			>
				<span class="my-[3px] h-0.5 w-6 bg-white"></span>
				<span class="my-[3px] h-0.5 w-6 bg-white"></span>
				<span class="my-[3px] h-0.5 w-6 bg-white"></span>
			</button>
		</div>
		<div
			id="nav-menu"
			class="px-[5%] transition-[height] duration-300 lg:hidden"
			style="height: {isMenuOpen ? '100svh' : '0'}; overflow: {isMenuOpen ? 'scroll' : 'hidden'};"
		>
			{#each navLink as link}
				<a
					href={link.href}
					class="text-regular block py-3 first:pt-7 lg:px-4 lg:py-2 first:lg:pt-2"
					on:click={closeMenu}
				>
					{link.name}
				</a>
			{/each}

			<div class="flex flex-col items-center gap-4">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="mt-6 flex flex-col items-center gap-4 lg:hidden" on:click={closeMenu}>
					<PrimaryButton href="#Contact">
						<span slot="text">Get Started</span>
					</PrimaryButton>
					<SecondaryButton href="#ClientPortal">
						<span slot="text">Client Portal</span>
					</SecondaryButton>
				</div>
			</div>
		</div>
		<!-- Desktop menu -->
		<div class="align-left flex gap-4">
			<div class="hidden lg:flex lg:items-center lg:px-0">
				{#each navLink as link}
					<a href={link.href} class="text-regular block py-3 lg:px-4 lg:py-2">
						{link.name}
					</a>
				{/each}
			</div>
			<div class="hidden items-center gap-4 lg:flex lg:flex-row">
				<PrimaryButton href="/#Contact">
					<span slot="text">Get Started</span>
				</PrimaryButton>
				<SecondaryButton href="/#ClientPortal">
					<span slot="text">Client Portal</span>
				</SecondaryButton>
			</div>
		</div>
	</div>
</section>
