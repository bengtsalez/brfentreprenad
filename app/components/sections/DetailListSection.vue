<script setup lang="ts">
import type { DetailItem } from '~/types/content'
import type { HeadingLevel, SectionBackground } from '~/types/ui'

/**
 * Lista med rubrik och förklaring per rad, t.ex. vanliga problem,
 * vad ett uppdrag omfattar eller vad som påverkar kostnaden.
 *
 * - `grid`: två spalter med linje ovanför varje punkt.
 * - `rows`: en rad per punkt med rubriken till vänster.
 */
const props = withDefaults(defineProps<{
  title: string
  items: DetailItem[]
  eyebrow?: string
  lead?: string
  layout?: 'grid' | 'rows'
  background?: SectionBackground
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  layout: 'grid',
  background: 'default',
  headingLevel: 2,
})

const itemHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection :background="background">
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <ul
      v-if="layout === 'grid'"
      class="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2"
    >
      <li v-for="item in items" :key="item.title" class="reveal space-y-2 border-t-2 border-accent pt-5">
        <UiHeading :level="itemHeadingLevel" size="sm">
          {{ item.title }}
        </UiHeading>
        <p class="text-ink-muted">
          {{ item.description }}
        </p>
      </li>
    </ul>
    <ul v-else class="mt-12 border-t border-line-strong">
      <li
        v-for="item in items"
        :key="item.title"
        class="reveal grid gap-2 border-b border-line py-6 md:grid-cols-[1fr_1.6fr] md:gap-12"
      >
        <UiHeading :level="itemHeadingLevel" size="sm">
          {{ item.title }}
        </UiHeading>
        <p class="text-ink-muted">
          {{ item.description }}
        </p>
      </li>
    </ul>
    <slot />
  </UiSection>
</template>
