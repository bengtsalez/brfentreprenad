<script setup lang="ts">
/** Tillfällig textbaserad logotyp tills en slutlig logotyp finns. */
defineProps<{
  href?: string
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href"
    class="inline-flex items-baseline gap-1.5 font-heading text-xl leading-none font-semibold tracking-tight whitespace-nowrap text-ink"
  >
    <span class="text-accent">BRF</span>
    <span>Entreprenad</span>
  </component>
</template>
