<script lang="ts">
  import { onMount } from 'svelte';
  import '../styles/spline-watermark-removal.css';
  
  // Props
  export let scene = '';
  export let className = '';
  export let style = '';
  
  let container: HTMLElement;
  let splineInstance: any;
  
  onMount(() => {
    // Apply watermark removal styles
    applyWatermarkRemoval();
    
    // Set up a mutation observer to catch dynamically added watermarks
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node instanceof Element) {
              hideWatermarkElements(node);
            }
          });
        }
      });
    });
    
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true
      });
    }
    
    return () => {
      observer.disconnect();
    };
  });
  
  function applyWatermarkRemoval() {
    // Hide existing watermark elements
    hideWatermarkElements(document);
    
    // Apply additional styles to ensure watermarks stay hidden
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Dynamic watermark removal */
      [data-spline-watermark],
      .spline-watermark,
      .spline-branding,
      [class*="spline-watermark"],
      [class*="spline-branding"],
      [class*="spline-logo"],
      [class*="spline-powered"],
      [class*="spline-credit"],
      [class*="spline-attribution"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(styleElement);
  }
  
  function hideWatermarkElements(root: Element | Document) {
    const selectors = [
      '[data-spline-watermark]',
      '.spline-watermark',
      '.spline-branding',
      '[class*="spline-watermark"]',
      '[class*="spline-branding"]',
      '[class*="spline-logo"]',
      '[class*="spline-powered"]',
      '[class*="spline-credit"]',
      '[class*="spline-attribution"]',
      '[class*="spline-ui"]',
      '[class*="spline-overlay"]',
      '[class*="spline-footer"]',
      '[class*="spline-header"]'
    ];
    
    selectors.forEach(selector => {
      const elements = root.querySelectorAll(selector);
      elements.forEach((element: Element) => {
        if (element instanceof HTMLElement) {
          element.style.display = 'none';
          element.style.opacity = '0';
          element.style.visibility = 'hidden';
          element.style.pointerEvents = 'none';
        }
      });
    });
  }
</script>

<div 
  bind:this={container}
  class="spline-wrapper {className}"
  {style}
  on:load={applyWatermarkRemoval}
>
  <slot />
</div>

<style>
  .spline-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  /* Ensure any Spline watermarks are hidden within this wrapper */
  .spline-wrapper :global([data-spline-watermark]),
  .spline-wrapper :global(.spline-watermark),
  .spline-wrapper :global(.spline-branding),
  .spline-wrapper :global([class*="spline-watermark"]),
  .spline-wrapper :global([class*="spline-branding"]),
  .spline-wrapper :global([class*="spline-logo"]),
  .spline-wrapper :global([class*="spline-powered"]),
  .spline-wrapper :global([class*="spline-credit"]),
  .spline-wrapper :global([class*="spline-attribution"]) {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
</style> 