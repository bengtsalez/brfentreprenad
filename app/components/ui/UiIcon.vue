<script setup lang="ts">
import type { IconName } from '~/types/ui'

withDefaults(defineProps<{
  name: IconName
  size?: 'sm' | 'md'
}>(), {
  size: 'md',
})

const circle = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'

const paths: Record<IconName, string[]> = {
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  'check': ['M5 12.5l4.5 4.5L19 7.5'],
  'chevron-down': ['M6 9l6 6 6-6'],
  'close': ['M6 6l12 12', 'M18 6L6 18'],
  'error': [circle, 'M12 7.5V13', 'M12 16.5h.01'],
  'info': [circle, 'M12 11v5.5', 'M12 7.5h.01'],
  'menu': ['M4 7h16', 'M4 12h16', 'M4 17h16'],
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-5',
}
</script>

<template>
  <svg
    :class="['shrink-0', sizeClasses[size]]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="d in paths[name]" :key="d" :d="d" />
  </svg>
</template>
