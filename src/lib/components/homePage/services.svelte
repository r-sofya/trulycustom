<script lang="ts">
    import Cards from "../ui/cards.svelte";
    //set icon color
    let iconColor = "var(--color-primary-200)";
</script>

<section id="Services" class="px-[5%] py-16 md:py-24 lg:py-28">
  <div class=" py-24 sm:py-32">
  <div class="mx-auto px-6 lg:px-8">
    <div class="mx-auto max-w-2xl ml-0 ">
      <h5 class="text-base/7 font-semibold text-secondary">Services</h5>
      <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance">Creative Solutions Suite</p>
      <p class="mt-6 text-lg/8 text-gray">Elevate your brand with our comprehensive suite of creative solutions, designed to make your vision a digital reality.</p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-full">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
        <Cards
          icon="global"
          iconColor={iconColor}
          title="Web Design/Development" 
          description="Crafting visually stunning and functionally seamless websites, our web design and development service transforms your online presence into a captivating digital experience." />
        <Cards
          icon="fingerprint"
          title="Branding" 
          iconColor={iconColor}
         description="From logo inception to a cohesive brand identity, our branding service ensures your business stands out with a distinctive and compelling narrative that resonates" />
        <Cards 
          icon="camera-ai"
         title="Social Media Management" 
         iconColor={iconColor}
         description="Amplify your online presence with our social media management service, where strategic content meets engagement, creating a vibrant community around your brand." />
        <Cards 
          icon="user-search"
          title="Advertising/Marketing Material" 
          iconColor={iconColor}
          description="Captivate your audience and drive results with our advertising and marketing material service, where every design element tells a compelling story tailored for success." />
        <Cards 
          icon="quill-pen-ai"
          title="AI-Based Content Creation" 
          iconColor={iconColor}
          description="Revolutionize your content strategy with our AI-based content creation service, where innovation meets intelligence to deliver engaging and impactful narratives." />
        <Cards 
          icon="file-text"
          title="Copywriting" 
          iconColor={iconColor}
          description="Crafting compelling narratives that resonate and captivate, our copywriting service ensures your brand message speaks volumes and leaves a lasting impression." />
      </dl>
    </div>
  </div>
  </div>
</section>
