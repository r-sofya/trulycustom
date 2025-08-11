// Global navigation system that hijacks href and data-href attributes
export function setupGlobalNavigation() {
  // Function to handle navigation
  function handleNavigation(href: string) {

    if (href.startsWith('/#')) {
      // Handle anchor links with smooth scrolling (even if prefixed with /#)
      const targetId = href.slice(2);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }


    
    if (href.startsWith('#')) {
      // Handle anchor links with smooth scrolling
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }


    } else if (href.startsWith('http') || href.startsWith('//')) {
      // Handle external links
      window.location.href = href;
    } else {
      // Handle internal routes
      window.location.href = href;
    }
  }

  // Function to process an element
  function processElement(element: HTMLElement) {
    const href = element.getAttribute('data-href') || element.getAttribute('href');
    
    if (href && !element.hasAttribute('data-nav-processed')) {
      // Add click handler
      element.addEventListener('click', (event) => {
        event.preventDefault();
        handleNavigation(href);
      });
      
      // Add cursor pointer if it's not already set
      if (element.style.cursor === '') {
        element.style.cursor = 'pointer';
      }
      
      // Mark as processed
      element.setAttribute('data-nav-processed', 'true');
    }
  }

  // Process existing elements
  const existingElements = document.querySelectorAll('[data-href], [href]');
  existingElements.forEach((element) => {
    processElement(element as HTMLElement);
  });

  // Create observer for new elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          
          // Process the element itself
          processElement(element);
          
          // Process child elements
          const childrenWithHref = element.querySelectorAll('[data-href], [href]');
          childrenWithHref.forEach((child) => {
            processElement(child as HTMLElement);
          });
        }
      });
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return observer;
} 