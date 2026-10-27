<script setup lang="ts">
import type { ContainerWidth } from '~/types/ui'

withDefaults(defineProps<{
  width?: ContainerWidth
  as?: string
}>(), {
  width: 'default',
  as: 'div',
})

const widthClasses: Record<ContainerWidth, string> = {
  default: 'max-w-content',
  narrow: 'max-w-narrow',
}
</script>

<template>
  <component :is="as" class="mx-auto w-full px-gutter" :class="widthClasses[width]">
    <slot />
  </component>
</template>
