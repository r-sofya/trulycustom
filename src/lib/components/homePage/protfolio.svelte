<script lang="ts">
    import { onMount } from "svelte";
    import { PortfolioService } from "$lib/services/getPortfolio";

    let projects: Array<any> = [];

    onMount(async () => {
        try {
            projects = await PortfolioService.getAll();
            console.log(projects);
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
    <p class="mb-3 font-semibold md:mb-4 text-secondary">Portfolio</p>
    <h1 class="mb-3 text-5xl font-bold md:mb-4 ">
      What's On Display
    </h1>
  </div>
</div>
  <div class="container">
    <a href={projects[0]?.websiteUrl} class="font-semibold md:text-md text-primary" target="_blank" rel="noopener noreferrer">
    <div
      class="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20"
    >
      <div class="order-2 md:order-1 mb-3 aspect-[6/4] md:mb-4 rounded-lg overflow-hidden hover:scale-105 transition-all flex items-center justify-center">
        <img
          src={projects[0]?.imageUrl}
          class="w-full rounded-image object-cover"
          alt={projects[0]?.title}
        />
      </div>
      <div class="order-1 md:order-2 flex flex-col gap-3">
        {#if projects[0]?.tags && projects[0]?.tags.length > 0}
        <div class="flex flex-wrap gap-2 bg-gray-800 rounded-full px-2 py-2 w-fit">
          {#each projects[0]?.tags.slice(0, 3) as tag}
            <div class="text-sm font-normal bg-gray-700 rounded-full px-2 py-1 w-fit">{tag}</div>
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
    </a>
  </div>
</section>



<section id="portfolio" class="px-[5%] py-16 md:py-24 lg:py-28">
    <div class="container">

      <div
        class="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12"
      >
      {#each projects.slice(1, 7) as project} 
        <!-- svelte-ignore a11y_missing_attribute -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <a
          class="font-semibold md:text-md text-primary group cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          on:click|preventDefault={() => {
            window.open(project.websiteUrl, '_blank', 'noopener,noreferrer');
          }}
        >
          <div class="mb-3 aspect-[6/4] md:mb-4 rounded-lg overflow-hidden group-hover:scale-105 transition-all">
            <img
              src={project.imageUrl}
              alt={project.title}
              class="size-full object-cover"
            />
          </div>
          <div class="mb-2 flex flex-col gap-2">
            {#if project.tags && project.tags.length > 0}
              <div class="flex flex-wrap gap-2 bg-gray-800 rounded-full items-center justify-center px-2 py-2 w-fit">
                {#each project.tags.slice(0, 3) as tag}
                  <div class="text-sm font-normal bg-gray-700 rounded-full px-2 py-1 w-fit">{tag}</div>
                {/each}
              </div>
            {/if}
            <h3 class="text-3xl font-bold">{project.title}</h3>
            <p class="text-sm font-normal">{project.description}</p>
            <div class="text-sm font-normal"></div>
          </div>
        </a>
        {/each}
      </div>
    </div>
  </section>
  