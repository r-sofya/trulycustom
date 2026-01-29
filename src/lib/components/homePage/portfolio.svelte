<script lang="ts">
	import { onMount } from 'svelte';
	import { PortfolioService } from '$lib/services/getPortfolio';
	import ProjectCard from './projectCard.svelte';

	let projects: Array<any> = $state([]);

	onMount(async () => {
		try {
			projects = await PortfolioService.getAll();
		} catch (error) {
			console.error('Failed to fetch portfolio projects:', error);
		}
	});
</script>

<section id="Projects" class="px-[5%] py-16 md:py-24 lg:py-28">
	<div
		class="mb-12 grid grid-cols-1 items-end gap-12 md:mb-18 md:grid-cols-[1fr_max-content] lg:mb-20 lg:gap-20"
	>
		<div class="max-w-lg">
			<p class="text-secondary mb-3 font-semibold md:mb-4">Portfolio</p>
			<h1 class="mb-3 text-5xl font-bold md:mb-4">What's On Display</h1>
		</div>
	</div>
	<div class="container">
		<ProjectCard
			href={projects[0]?.websiteUrl}
			class="md:text-md group project-card text-primary relative block overflow-hidden rounded-lg font-semibold"
			target="_blank"
			rel="noopener noreferrer"
			index={0}
		>
			<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
				<div
					class="order-2 mb-3 flex aspect-[6/4] items-center justify-center overflow-hidden rounded-lg md:order-1 md:mb-4"
				>
					<img
						src={projects[0]?.imageUrl}
						class="rounded-image w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
						alt={projects[0]?.title}
					/>
				</div>
				<div class="order-1 flex flex-col gap-3 md:order-2">
					{#if projects[0]?.tags && projects[0]?.tags.length > 0}
						<div class="flex w-fit flex-wrap gap-2 rounded-full bg-surface-700 px-2 py-2">
							{#each projects[0]?.tags.slice(0, 3) as tag}
								<div class="w-fit rounded-full bg-surface-600 px-2 py-1 text-sm font-normal">
									{tag}
								</div>
							{/each}
						</div>
					{/if}
					<h3 class="text-3xl font-bold">
						{projects[0]?.title}
					</h3>
					<p class="text-medium">
						{projects[0]?.description}
					</p>
				</div>
			</div>
		</ProjectCard>
	</div>
</section>

<section id="portfolio" class="px-[5%] py-16 md:py-24 lg:py-28">
	<div class="container">
		<div
			class="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12"
		>
			{#each projects.slice(1, 7) as project, i}
				<!-- svelte-ignore a11y_missing_attribute -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<ProjectCard
					class="md:text-md group project-card text-primary block cursor-pointer overflow-hidden rounded-lg font-semibold"
					target="_blank"
					rel="noopener noreferrer"
					index={i + 1}
					onclick={(e: Event) => {
						e.preventDefault();
						window.open(project.websiteUrl, '_blank', 'noopener,noreferrer');
					}}
				>
					<div class="mb-3 aspect-[6/4] overflow-hidden rounded-lg md:mb-4">
						<img
							src={project.imageUrl}
							alt={project.title}
							class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
						/>
					</div>
					<div class="mb-2 flex flex-col gap-2">
						{#if project.tags && project.tags.length > 0}
							<div
								class="flex w-fit flex-wrap items-center justify-center gap-2 rounded-full bg-surface-700 px-2 py-2"
							>
								{#each project.tags.slice(0, 3) as tag}
									<div class="w-fit rounded-full bg-surface-600 px-2 py-1 text-sm font-normal">
										{tag}
									</div>
								{/each}
							</div>
						{/if}
						<h3 class="text-3xl font-bold">{project.title}</h3>
						<p class="text-sm font-normal">{project.description}</p>
						<div class="text-sm font-normal"></div>
					</div>
				</ProjectCard>
			{/each}
		</div>
	</div>
</section>
