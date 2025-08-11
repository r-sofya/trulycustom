<script lang="ts">
    import PrimaryButton from './ui/primaryButton.svelte';
    import SecondaryButton from './ui/secondaryButton.svelte';
    import { onMount } from 'svelte';


    let isMenuOpen = false;
    let isMoreOpen = false;
    let navSection: HTMLElement;

    
    // Recalculate when menus toggle
    $: {
      isMenuOpen; // dependency
      isMoreOpen; // dependency
    }
    let navLink = [
      {
        name: "Home",
        href: "/#Home"
      },
      {
        name: "Services",
        href: "/#Services"
      },
      {
        name: "Projects",
        href: "/#Projects"
      },
      {
        name: "FAQ's",
        href: "/#FAQ"
      }
    ]

    let navLinkMore = [
      {
        name: "Contact Us",
        href: "/#Contact"
      },
      {
        name: "FAQ",
        href: "/#FAQ"
      },
      {
        name: "Blog",
        href: "/#Blog"
      }
    ]

</script>

<section
  bind:this={navSection}
  class="z-[999] flex w-full items-center border-b border-surface-500 bg-scheme-background lg:min-h-18 lg:px-[5%] fixed top-0 bg-primary"
>
  <div class="size-full lg:flex lg:items-center lg:justify-between">
    <div
      class="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0"
    >
    
      <a href="/#Home" class="text-2xl font-bold text-primary"
        >Truly Custom</a>
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
        <a href={link.href} class="text-regular block py-3 first:pt-7 lg:px-4 lg:py-2 first:lg:pt-2">
          {link.name}
        </a>
      {/each}

      <div class="flex flex-col items-center gap-4">
        <button
          class="text-regular flex w-full items-center justify-between gap-2 py-3 text-left lg:flex-none lg:justify-start lg:px-4 lg:py-2"
          type="button"
          aria-haspopup="menu"
          aria-expanded={isMoreOpen}
          on:click={() => (isMoreOpen = !isMoreOpen)}
        >
          <span>More</span
          ><span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 -960 960 960"
              class="text-scheme-text"
              fill="currentColor"
            >
              <path
                d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"
              ></path></svg
          ></span>
        </button>
        <nav
          class="bg-scheme-background lg:absolute lg:z-50 lg:border lg:border-scheme-border lg:p-2 lg:transition-all lg:duration-300 lg:[--y-close:25%] transform flex flex-col items-center gap-4 justify-center"
          class:invisible={!isMoreOpen}
          class:opacity-0={!isMoreOpen}
          class:opacity-100={isMoreOpen}
          class:h-0={!isMoreOpen}
          class:h-auto={isMoreOpen}
        
        >
          {#each navLinkMore as link}
            <a href={link.href} class="text-regular py-3 lg:px-4 lg:py-2">
              {link.name}
            </a>
          {/each}
        </nav>
        
      <div class="mt-6 flex flex-col items-center gap-4 lg:hidden">
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
    <div class="flex align-left gap-4">
    <div class="hidden lg:flex lg:items-center lg:px-0">
      {#each navLink as link}
        <a href={link.href} class="text-regular block py-3 lg:px-4 lg:py-2">
          {link.name}
        </a>
      {/each}

      <div class="relative">
        <!-- replace hidden with flex -->
        <button
          class="text-regular hidden w-full items-center justify-between gap-2 py-3 text-left lg:flex-none lg:justify-start lg:px-4 lg:py-2"
          type="button"
          aria-haspopup="menu"
          aria-expanded={isMoreOpen}
          on:click={() => (isMoreOpen = !isMoreOpen)}
        >
          <span>More</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960" class="text-scheme-text" fill="currentColor">
              <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"></path>
            </svg>
          </span>
        </button>
        <nav
          class="bg-scheme-background lg:absolute lg:z-50 lg:border lg:border-scheme-border lg:p-2 lg:[--y-close:25%] transform"
          class:invisible={!isMoreOpen}
          class:opacity-0={!isMoreOpen}
          class:opacity-100={isMoreOpen}
        >
          {#each navLinkMore as link}
            <a href={link.href} class="text-regular block py-3 lg:px-4 lg:py-2">
              {link.name}
            </a>
          {/each}
        </nav>
      </div>
    </div>
    <div
        class="hidden items-center gap-4 lg:flex lg:flex-row"
      >
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