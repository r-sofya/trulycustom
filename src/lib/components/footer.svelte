<script lang="ts">
  let navLink = [
    {
      name: "Home",
      href: "/#Home"
    },
    {
      name: "Projects",
      href: "/#Projects"
    },
    {
      name: "FAQ's",
      href: "/#FAQ"
    },
    {
      name: "Contact Us",
      href: "/#Contact"
    },
    
  ]

  // get current year
  let currentYear = new Date().getFullYear();
</script>

<footer class="px-[5%] py-12 md:py-18 lg:py-20 border-t border-surface-500">
    <div class="container">
      <div
        class="grid grid-cols-1 items-center justify-center justify-items-center gap-x-[4vw] gap-y-12 pb-12 md:pb-18 lg:grid-cols-[0.25fr_1fr_0.25fr] lg:justify-between lg:gap-y-4 lg:pb-20"
      >
      
        <a href="/" class="lg:justify-self-start text-2xl font-bold"
          >Truly Custom</a>
        <ul
          class="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start"
        >
          {#each navLink as link}
            <li class="font-semibold"><a href={link.href}>{link.name}</a></li>
          {/each}
        </ul>
        <div
          class="flex items-start justify-start justify-items-center gap-x-3 lg:justify-self-end"
        >
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <!-- svelte-ignore a11y_missing_attribute -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <a on:click={() => window.open("https://www.facebook.com/trulycustom.ca", "_blank")} class="cursor-pointer"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              class="size-6 text-scheme-text"
              fill="currentColor"
            >
              <path
                d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"
              ></path></svg></a
          >
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <!-- svelte-ignore a11y_missing_attribute -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <a on:click={() => window.open("https://www.instagram.com/trulycustom.ca/", "_blank")} class="cursor-pointer" 
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              class="size-6 text-scheme-text"
              fill="currentColor"
            >
              <path
                d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"
              ></path>
              <circle cx="16.806" cy="7.207" r="1.078"></circle>
              <path
                d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"
              ></path></svg></a
          >
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <!-- svelte-ignore a11y_missing_attribute -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <a on:click={() => window.open("https://x.com/TrulyCustomCA", "_blank")} class="cursor-pointer"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 512 512"
              class="size-6 p-0.5 text-scheme-text"
              fill="currentColor"
            >
              <path
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
              ></path></svg></a
          >
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <!-- svelte-ignore a11y_missing_attribute -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <a on:click={() => window.open("https://www.linkedin.com/company/trulycustom?trk=public_profile_topcard-current-company", "_blank")} class="cursor-pointer"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              class="size-6 text-scheme-text"
              fill="currentColor"
            >
              <path
                d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"
              ></path></svg></a
          >
        </div>
      </div>
      <div class="h-px w-full bg-scheme-border"></div>
      <div
        class="text-small flex flex-col-reverse items-center justify-center justify-items-center pt-6 pb-4 md:flex-row md:gap-x-6 md:pt-8 md:pb-0"
      >
        <ul
          class="text-small grid grid-flow-row grid-cols-[max-content] items-center justify-center justify-items-center gap-y-4 md:grid-flow-col md:gap-x-6 md:gap-y-0"
        >
          <p class="mt-8 md:mt-0">© {currentYear} Truly Custom. All rights reserved.</p>
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a href="#" class="underline hidden">Privacy Policy</a>
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a href="#" class="underline hidden">Terms of Service</a>
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a href="#" class="underline hidden">Cookie Settings</a>
        </ul>
      </div>
    </div>
  </footer>
  