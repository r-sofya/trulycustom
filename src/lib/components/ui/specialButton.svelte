<script>

  let testsize = "xl"
  let textweight = "extrabold"

  export let href = "";


</script>

<button
  data-href={href}

  class="text-center inset-0 flex justify-center items-center overflow-hidden relative px-6 py-4 bg-black text-white border-none rounded-md cursor-pointer z-10 group"
>
  <span class="text-{testsize} font-{textweight}">
    <slot name="text" />
  </span>
  <span
    class="absolute w-[110%] h-[200%] top-[5%] bg-purple-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"
  ></span>
  <span
    class="absolute w-[110%] h-[200%] top-[5%] bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"
  ></span>
  <span
    class="absolute w-[110%] h-[200%] top-[5%] bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"
  ></span>
  <span
    class="items-center group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute z-10 text-{testsize} font-{textweight}"
  >
    <slot name="hoverText" />
  </span>
</button>