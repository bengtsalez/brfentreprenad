<script setup lang="ts">
import type { ContainerWidth, SectionBackground, SectionSpacing } from '~/types/ui'

/** Sidsektion med bakgrund, vertikalt avstånd och en innehållscontainer. */
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
  <component :is="as" class="text-ink" :class="[backgroundClasses[background], spacingClasses[spacing]]">
    <UiContainer :width="width">
      <slot />
    </UiContainer>
  </component>
</template>
