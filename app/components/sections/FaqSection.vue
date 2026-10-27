<script setup lang="ts">
import type { FaqItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

/** Vanliga frågor som expanderbara svar (accordion enligt WAI-ARIA-mönstret). */
const props = withDefaults(defineProps<{
  title: string
  items: FaqItem[]
  eyebrow?: string
  lead?: string
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  headingLevel: 2,
})

const questionHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
const baseId = useId()
const openItems = ref(new Set<number>())

function toggle(index: number) {
  if (openItems.value.has(index)) openItems.value.delete(index)
  else openItems.value.add(index)
}
</script>

<template>
  <UiSection>
    <div class="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
      <div class="border-t border-line">
        <div v-for="(item, index) in items" :key="item.question" class="border-b border-line">
          <UiHeading :level="questionHeadingLevel" size="xs">
            <button
              :id="`${baseId}-question-${index}`"
              type="button"
              class="flex w-full items-center justify-between gap-4 py-5 text-left hover:text-accent"
              :aria-expanded="openItems.has(index)"
              :aria-controls="`${baseId}-answer-${index}`"
              @click="toggle(index)"
            >
              {{ item.question }}
              <UiIcon
                name="chevron-down"
                class="text-accent motion-safe:transition-transform"
                :class="openItems.has(index) && 'rotate-180'"
              />
            </button>
          </UiHeading>
          <div
            v-show="openItems.has(index)"
            :id="`${baseId}-answer-${index}`"
            role="region"
            :aria-labelledby="`${baseId}-question-${index}`"
            class="max-w-prose pb-6 text-ink-muted"
          >
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </UiSection>
</template>
