<script setup lang="ts">
import type { BoardControlItem } from '~/types/content'
import type { HeadingLevel, SectionBackground } from '~/types/ui'

/**
 * "Så behåller styrelsen kontroll över projektet": numrerade rader med
 * fråga, förklaring och, när rutinen är bekräftad, vad styrelsen får.
 */
const props = withDefaults(defineProps<{
  title: string
  items: BoardControlItem[]
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

const itemHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection :background="background">
    <div class="grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel">
          <slot />
        </UiSectionHeading>
      </div>
      <ol role="list" class="border-t border-line-strong">
        <li
          v-for="(item, index) in items"
          :key="item.title"
          class="reveal grid gap-3 border-b border-line py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
        >
          <span class="font-heading text-2xl font-semibold text-accent" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <div class="space-y-3">
            <UiHeading :level="itemHeadingLevel" size="sm">
              {{ item.title }}
            </UiHeading>
            <p class="font-semibold">
              {{ item.question }}
            </p>
            <p class="max-w-prose text-ink-muted">
              {{ item.description }}
            </p>
            <p v-if="item.verified && item.deliverable" class="flex items-start gap-2 text-sm">
              <UiIcon name="check" size="sm" class="mt-1 text-accent" />
              <span><span class="font-semibold">Det här får styrelsen:</span> {{ item.deliverable }}</span>
            </p>
          </div>
        </li>
      </ol>
    </div>
  </UiSection>
</template>
