<script lang="ts">
    import { FaqService } from '$lib/services/getFaq';
    import { onMount } from 'svelte';
    import { slide, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
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
      <h2 class="mb-3 text-5xl font-bold md:mb-4 ">FAQs</h2>
      <p class="text-medium">
        Can't find the answer you're looking for? Please chat to our team.

      </p>
      <div class="mt-6 md:mt-8">
        <Button href="#Contact">
          <span slot="text">Get in touch</span>
        </Button>
      </div>
    </div>
    <div class="space-y-2">
        {#each faq as faq, index}
      <div
        class="overflow-hidden rounded-lg bg-gray-800 text-scheme-text"
      >
        <div
          class="border-b border-scheme-border first:border-t border-none px-5 md:px-6"
        >
          <h3 class="flex w-full">
            <button
              type="button"
              aria-expanded={openIndex === index}
              class="flex flex-1 items-center justify-between py-4 font-bold transition-all ease-in-out focus-visible:ring-0 focus-visible:outline-none text-medium md:py-5 hover:bg-scheme-background/50 cursor-pointer"
              on:click={() => toggleAccordion(index)}
            >
              {faq?.question}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 -960 960 960"
                class="text-scheme-text size-7 shrink-0 transition-transform duration-300 ease-out md:size-8 {openIndex === index ? 'rotate-45' : ''}"
                fill="currentColor"
              >
                <path
                  d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"
                ></path>
              </svg>
            </button>
          </h3>
          {#if openIndex === index}
            <div
              transition:slide={{ duration: 300, easing: quintOut }}
              class="overflow-hidden"
            >
              <div 
               
                class="pb-4 md:pb-5"
              >
                {faq?.answer}
              </div>
            </div>
          {/if}
        </div>
      </div>
      {/each}
    </div>
  </div>
</section>
