<script lang="ts">
    import Navbar from "../lib/components/navbar.svelte";
    import Hero from "../lib/components/homePage/hero.svelte";
    import Services from "../lib/components/homePage/services.svelte";
    import Portfolio from "../lib/components/homePage/protfolio.svelte";
    import Faq from "../lib/components/homePage/faq.svelte";
    import ContactForm from "../lib/components/homePage/contactForm.svelte";
    import Footer from "../lib/components/footer.svelte";
</script>

<svelte:head>
  <title>Truly Custom | Web Design and Branding Services</title>
  <meta name="description" content="Truly Custom, a full-service design studio, offers creative solutions for web design, branding, and social media. Elevate your brand with our stunning websites and captivating logos. Get a free quote today!">
  <meta content="Truly Custom | Web Design and Branding Services" property="og:title">
  <meta content="Truly Custom, a full-service design studio, offers creative solutions for web design, branding, and social media. Elevate your brand with our stunning websites and captivating logos. Get a free quote today!" property="og:description">
  <meta content="Truly Custom | Web Design and Branding Services" property="twitter:title">
  <meta content="Truly Custom, a full-service design studio, offers creative solutions for web design, branding, and social media. Elevate your brand with our stunning websites and captivating logos. Get a free quote today!" property="twitter:description">
  <meta property="og:type" content="website">
  <meta content="summary_large_image" name="twitter:card">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <link rel="shortcut icon" href="/truly-custom.webflow/images/favicon.jpg" type="image/x-icon">
  <link rel="apple-touch-icon" href="/truly-custom.webflow/images/webclip.jpg">
  <meta http-equiv="content-security-policy" content="frame-ancestors https://frameworklion.com, https://trulycustom.ca, https://trulycustom.webflow.io, https://frameworklion.webflow.io">
  
  <!-- Google Tag Manager -->
  <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WNBZWXKW');
  </script>
  
  <!-- Microsoft Clarity -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "kjle7pryya");
  </script>
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZL678Z3Y50"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ZL678Z3Y50');
  </script>
  

  
</svelte:head>



<Navbar />
<Hero />
<Services />
<Portfolio />
<Faq />
<ContactForm />
<Footer />