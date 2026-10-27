<script setup lang="ts">
import type { ServiceItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

const props = withDefaults(defineProps<{
  title: string
  services: ServiceItem[]
  eyebrow?: string
  lead?: string
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  headingLevel: 2,
})

const cardHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection>
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="service in services" :key="service.title">
        <UiCard
          :title="service.title"
          :image="service.image"
          :link="service.link"
          :heading-level="cardHeadingLevel"
        >
          {{ service.description }}
        </UiCard>
      </li>
    </ul>
  </UiSection>
</template>
