<script setup lang="ts">
import type { LinkItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

/** Kompakt hero utan bild, t.ex. överst på en tjänstesida. */
withDefaults(defineProps<{
  title: string
  lead?: string
  eyebrow?: string
  action?: LinkItem
  headingLevel?: HeadingLevel
}>(), {
  lead: undefined,
  eyebrow: undefined,
  action: undefined,
  headingLevel: 1,
})
</script>

<template>
  <UiSection background="dark" spacing="compact">
    <div class="max-w-prose space-y-5">
      <p v-if="eyebrow" class="eyebrow">
        {{ eyebrow }}
      </p>
      <UiHeading :level="headingLevel" size="xl">
        {{ title }}
      </UiHeading>
      <p v-if="lead" class="lead">
        {{ lead }}
      </p>
      <UiButton v-if="action" :href="action.href" class="mt-2">
        {{ action.label }}
      </UiButton>
    </div>
  </UiSection>
</template>
