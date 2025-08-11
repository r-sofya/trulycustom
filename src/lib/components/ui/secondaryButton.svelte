<script>

  let testsize = "md"
  let textweight = "bold"

  export let href = "";

</script>

<button class="outline-2 outline-purple-500 py-2.5 px-5 rounded-md text-white transition-colors duration-300 hover:bg-purple-500 flex items-center" data-href={href}>
    <span class="text-{testsize} font-{textweight}">
        <slot name="text" />
    </span>
</button>
 