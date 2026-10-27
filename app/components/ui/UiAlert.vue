<script setup lang="ts">
import type { AlertTone, IconName } from '~/types/ui'

/** Meddelanderuta för information, bekräftelser och fel. */
withDefaults(defineProps<{
  tone?: AlertTone
  title?: string
}>(), {
  tone: 'info',
  title: undefined,
})

const toneClasses: Record<AlertTone, string> = {
  info: 'border-accent bg-accent-soft',
  success: 'border-success bg-success-soft',
  error: 'border-danger bg-danger-soft',
}

const iconClasses: Record<AlertTone, string> = {
  info: 'text-accent',
  success: 'text-success',
  error: 'text-danger',
}

const icons: Record<AlertTone, IconName> = {
  info: 'info',
  success: 'check',
  error: 'error',
}
</script>

<template>
  <div class="flex gap-3 rounded-control border-l-4 p-4 text-ink" :class="toneClasses[tone]">
    <UiIcon :name="icons[tone]" class="mt-0.5" :class="iconClasses[tone]" />
    <div class="min-w-0 space-y-1">
      <p v-if="title" class="font-semibold">
        {{ title }}
      </p>
      <div class="text-sm leading-relaxed">
        <slot />
      </div>
    </div>
  </div>
</template>
