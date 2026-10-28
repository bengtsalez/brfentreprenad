<script setup lang="ts">
import type { EntryItem } from '~/types/content'
import type { HeadingLevel, SectionBackground } from '~/types/ui'

/**
 * Redaktionell lista med avdelande linjer, t.ex. tjänsteområden.
 * Varje rad har rubrik, beskrivning och valfria punkter. Rubriken blir en länk när `href` finns.
 */
const props = withDefaults(defineProps<{
  title: string
  entries: EntryItem[]
  eyebrow?: string
  lead?: string
  background?: SectionBackground
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  background: 'default',
  headingLevel: 2,
})

const entryHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection :background="background">
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <ul class="mt-12 border-t border-line-strong">
      <li
        v-for="entry in entries"
        :key="entry.title"
        class="reveal grid gap-4 border-b border-line py-8 md:grid-cols-[1fr_1.2fr] md:gap-12"
      >
        <div class="space-y-2">
          <UiHeading :level="entryHeadingLevel" size="md">
            <a v-if="entry.href" :href="entry.href" class="group inline-flex items-center gap-2 hover:text-accent">
              {{ entry.title }}
              <UiIcon name="arrow-right" class="text-accent motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
            </a>
            <template v-else>
              {{ entry.title }}
            </template>
          </UiHeading>
          <p class="text-ink-muted">
            {{ entry.description }}
          </p>
        </div>
        <ul v-if="entry.items?.length" class="grid content-start gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          <li v-for="item in entry.items" :key="item" class="border-l-2 border-line pl-3">
            {{ item }}
          </li>
        </ul>
      </li>
    </ul>
  </UiSection>
</template>
