<script setup lang="ts">
import type { ContainerWidth, SectionBackground, SectionSpacing } from '~/types/ui'

/**
 * Sidsektion med bakgrund, vertikalt avstånd och en innehållscontainer.
 * Sloten `background` läggs bakom innehållet, t.ex. för en bakgrundsvideo.
 */
const slots = useSlots()

withDefaults(defineProps<{
  background?: SectionBackground
  spacing?: SectionSpacing
  width?: ContainerWidth
  as?: string
}>(), {
  background: 'default',
  spacing: 'default',
  width: 'default',
  as: 'section',
})

const backgroundClasses: Record<SectionBackground, string> = {
  default: 'bg-canvas',
  subtle: 'bg-subtle',
  dark: 'theme-dark bg-canvas',
}

const spacingClasses: Record<SectionSpacing, string> = {
  default: 'py-section',
  compact: 'py-section-compact',
}
</script>

<template>
  <component :is="as" class="text-ink" :class="[backgroundClasses[background], spacingClasses[spacing], slots.background && 'relative isolate overflow-hidden']">
    <div v-if="slots.background" class="absolute inset-0 -z-10" aria-hidden="true">
      <slot name="background" />
    </div>
    <UiContainer :width="width">
      <slot />
    </UiContainer>
  </component>
</template>
