<script setup lang="ts">
import type { BadgeVariant } from '~/types/ui'

withDefaults(defineProps<{
  variant?: BadgeVariant
}>(), {
  variant: 'neutral',
})

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-subtle text-ink border-line',
  accent: 'bg-accent-soft text-accent border-transparent',
  outline: 'bg-transparent text-ink-muted border-line-strong',
}
</script>

<template>
  <span
    class="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold leading-tight"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>
