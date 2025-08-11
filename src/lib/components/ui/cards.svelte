<script lang="ts">
    import Icon from '@iconify/svelte';

    let { title, description, icon, iconColor } = $props();
</script>


<div class="relative hover:shadow-2xl hover:shadow-center transition-all rounded-2xl p-6 ">
    <dt class="text-base/7 font-bold">
      <div class="icon-container size-15 items-center justify-center rounded-full mb-5 p-2">
        <div class=" icon-container h-full w-full items-center justify-center rounded-full p-2">
        <Icon icon={`ri:${icon}-line`} class="h-full w-full aspect-square" color={iconColor} />
      </div>
      </div> 
      {title}
    </dt>
    <dd class="mt-2 text-base/7 text-gray">{description}</dd>
  </div>


    <style>  
        .hover\:shadow-center:hover {
            box-shadow: 0 0px 50px 0 var(--color-shadow);
        }
    </style>