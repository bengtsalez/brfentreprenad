<script setup lang="ts">
import type { TextBlock } from '~/types/content'
import type { HeadingLevel, SectionBackground } from '~/types/ui'

/**
 * Rubrik följd av två textspalter, t.ex. vad som gäller för styrelsen
 * respektive för de boende.
 */
const props = withDefaults(defineProps<{
  title: string
  columns: TextBlock[]
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

const columnHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection :background="background">
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <div class="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
      <div v-for="column in columns" :key="column.title" class="space-y-4 border-t border-line pt-6">
        <UiHeading :level="columnHeadingLevel" size="md">
          {{ column.title }}
        </UiHeading>
        <p v-for="paragraph in column.paragraphs" :key="paragraph" class="text-ink-muted">
          {{ paragraph }}
        </p>
        <ul v-if="column.list?.length" class="space-y-2">
          <li v-for="item in column.list" :key="item" class="flex items-start gap-3">
            <UiIcon name="check" class="mt-1 text-accent" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </UiSection>
</template>
