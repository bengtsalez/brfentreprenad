<script setup lang="ts">
import type { HeadingLevel, SectionBackground } from '~/types/ui'

/**
 * Redaktionell textsektion: rubrik till vänster, stycken och punktlista till höger.
 * Extra innehåll kan läggas i default-sloten efter texten.
 */
withDefaults(defineProps<{
  title: string
  paragraphs?: string[]
  list?: string[]
  eyebrow?: string
  background?: SectionBackground
  headingLevel?: HeadingLevel
}>(), {
  paragraphs: () => [],
  list: () => [],
  eyebrow: undefined,
  background: 'default',
  headingLevel: 2,
})
</script>

<template>
  <UiSection :background="background">
    <div class="grid gap-8 border-t border-line pt-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <UiSectionHeading :title="title" :eyebrow="eyebrow" :level="headingLevel" />
      <div class="max-w-prose space-y-5">
        <p v-for="paragraph in paragraphs" :key="paragraph" :class="paragraphs.length > 1 ? 'text-ink-muted' : 'lead'">
          {{ paragraph }}
        </p>
        <ul v-if="list.length" class="space-y-3 pt-1">
          <li v-for="item in list" :key="item" class="flex items-start gap-3">
            <UiIcon name="check" class="mt-1 text-accent" />
            <span>{{ item }}</span>
          </li>
        </ul>
        <slot />
      </div>
    </div>
  </UiSection>
</template>
