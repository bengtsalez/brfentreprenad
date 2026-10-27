<script setup lang="ts">
import type { ReferenceProject } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

const props = withDefaults(defineProps<{
  title: string
  projects: ReferenceProject[]
  eyebrow?: string
  lead?: string
  /** Valfri anmärkning ovanför korten, t.ex. att projekten är exempel. */
  note?: string
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  note: undefined,
  headingLevel: 2,
})

const cardHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection background="subtle">
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <UiAlert v-if="note" class="mt-8 max-w-prose">
      {{ note }}
    </UiAlert>
    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="project in projects" :key="project.title">
        <UiCard
          :title="project.title"
          :image="project.image"
          :badge="project.badge"
          :meta="project.meta"
          :heading-level="cardHeadingLevel"
        >
          {{ project.description }}
        </UiCard>
      </li>
    </ul>
  </UiSection>
</template>
