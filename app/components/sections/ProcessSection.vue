<script setup lang="ts">
import type { ProcessStep } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

const props = withDefaults(defineProps<{
  title: string
  steps: ProcessStep[]
  eyebrow?: string
  lead?: string
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  headingLevel: 2,
})

const stepHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection>
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <!-- role="list" behåller listsemantiken i Safari när list-style tas bort. -->
    <ol role="list" class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      <li v-for="(step, index) in steps" :key="step.title" class="space-y-3">
        <div class="flex items-center gap-4">
          <span
            class="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-accent font-heading text-lg font-semibold text-accent"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <span class="h-px flex-1 bg-line" aria-hidden="true" />
        </div>
        <UiHeading :level="stepHeadingLevel" size="sm">
          <span class="sr-only">Steg {{ index + 1 }}: </span>{{ step.title }}
        </UiHeading>
        <p class="text-ink-muted">
          {{ step.description }}
        </p>
      </li>
    </ol>
  </UiSection>
</template>
