<script setup lang="ts">
import type { EntryItem } from '~/types/content'
import type { HeadingLevel, SectionBackground } from '~/types/ui'

/** Några ingångar sida vid sida, t.ex. en per målgrupp. */
const props = withDefaults(defineProps<{
  title: string
  entries: EntryItem[]
  eyebrow?: string
  lead?: string
  /** Text på länken under varje ingång. */
  linkLabel?: string
  background?: SectionBackground
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  linkLabel: 'Läs mer',
  background: 'subtle',
  headingLevel: 2,
})

const entryHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection :background="background">
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <ul class="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
      <li v-for="entry in entries" :key="entry.title" class="reveal flex flex-col gap-3 border-t-2 border-accent pt-5">
        <UiHeading :level="entryHeadingLevel" size="sm">
          {{ entry.title }}
        </UiHeading>
        <p class="text-ink-muted">
          {{ entry.description }}
        </p>
        <p v-if="entry.href" class="mt-auto pt-1">
          <a :href="entry.href" class="text-link inline-flex items-center gap-1.5 font-semibold">
            {{ linkLabel }}<span class="sr-only">: {{ entry.title }}</span>
            <UiIcon name="arrow-right" size="sm" />
          </a>
        </p>
      </li>
    </ul>
  </UiSection>
</template>
