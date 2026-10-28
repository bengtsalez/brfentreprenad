<script setup lang="ts">
import type { LinkItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

/**
 * Kompakt hero utan bild, t.ex. överst på en tjänstesida.
 * Sloten `top` visas ovanför rubriken, t.ex. för brödsmulor.
 */
withDefaults(defineProps<{
  title: string
  lead?: string
  eyebrow?: string
  action?: LinkItem
  secondaryAction?: LinkItem
  /** Korta punkter under knapparna. */
  highlights?: string[]
  headingLevel?: HeadingLevel
}>(), {
  lead: undefined,
  eyebrow: undefined,
  action: undefined,
  secondaryAction: undefined,
  highlights: () => [],
  headingLevel: 1,
})
</script>

<template>
  <UiSection background="dark" spacing="compact">
    <slot name="top" />
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
      <div v-if="action || secondaryAction" class="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
        <UiButton v-if="action" :href="action.href">
          {{ action.label }}
        </UiButton>
        <UiButton v-if="secondaryAction" :href="secondaryAction.href" variant="secondary">
          {{ secondaryAction.label }}
        </UiButton>
      </div>
      <ul v-if="highlights.length" class="flex flex-col gap-x-6 gap-y-2 pt-2 text-sm font-semibold sm:flex-row sm:flex-wrap">
        <li v-for="item in highlights" :key="item" class="flex items-center gap-2">
          <UiIcon name="check" size="sm" class="text-accent" />
          {{ item }}
        </li>
      </ul>
    </div>
  </UiSection>
</template>
