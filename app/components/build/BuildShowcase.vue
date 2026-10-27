<script setup lang="ts">
/**
 * Ram för en del på byggsidan: namn, beskrivning och ett exempel.
 * `bleed` tar bort inre luft så att hela sektioner visas kant i kant.
 */
defineProps<{
  id: string
  title: string
  description: string
  bleed?: boolean
}>()
</script>

<template>
  <section :id="id" :aria-labelledby="`${id}-rubrik`" class="scroll-mt-4 py-10 sm:py-14">
    <div class="mb-6 max-w-prose space-y-2 px-gutter">
      <h2 :id="`${id}-rubrik`" class="heading-md">
        {{ title }}
      </h2>
      <p class="text-ink-muted">
        {{ description }}
      </p>
    </div>
    <div
      class="overflow-hidden border-y border-line bg-canvas sm:mx-gutter sm:rounded-card sm:border-x"
      :class="!bleed && 'space-y-10 p-gutter py-8'"
    >
      <slot />
    </div>
  </section>
</template>
