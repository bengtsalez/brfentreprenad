<script setup lang="ts">
import type { HeadingLevel, HeadingSize } from '~/types/ui'

/** Rubrik där semantisk nivå (h1–h6) och visuell storlek väljs var för sig. */
const props = withDefaults(defineProps<{
  level: HeadingLevel
  size?: HeadingSize
}>(), {
  size: 'md',
})

const tag = computed(() => `h${props.level}`)

const sizeClasses: Record<HeadingSize, string> = {
  xl: 'heading-xl',
  lg: 'heading-lg',
  md: 'heading-md',
  sm: 'heading-sm',
  xs: 'heading-xs',
}
</script>

<template>
  <component :is="tag" :class="sizeClasses[size]">
    <slot />
  </component>
</template>
