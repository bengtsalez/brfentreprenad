<script setup lang="ts">
import type { HeadingLevel } from '~/types/ui'

/** Gemensam rubrikgrupp för sektioner: etikett, rubrik och ingress. */
withDefaults(defineProps<{
  title: string
  level?: HeadingLevel
  eyebrow?: string
  lead?: string
  align?: 'start' | 'center'
}>(), {
  level: 2,
  eyebrow: undefined,
  lead: undefined,
  align: 'start',
})
</script>

<template>
  <div class="max-w-prose space-y-4" :class="align === 'center' && 'mx-auto text-center'">
    <p v-if="eyebrow" class="eyebrow">
      {{ eyebrow }}
    </p>
    <UiHeading :level="level" size="lg">
      {{ title }}
    </UiHeading>
    <p v-if="lead" class="lead">
      {{ lead }}
    </p>
    <slot />
  </div>
</template>
