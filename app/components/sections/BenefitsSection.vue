<script setup lang="ts">
import type { BenefitItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

const props = withDefaults(defineProps<{
  title: string
  benefits: BenefitItem[]
  eyebrow?: string
  lead?: string
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  headingLevel: 2,
})

const itemHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection background="subtle">
    <div class="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
      <ul class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <li v-for="benefit in benefits" :key="benefit.title" class="space-y-2 border-t-2 border-accent pt-5">
          <UiHeading :level="itemHeadingLevel" size="sm">
            {{ benefit.title }}
          </UiHeading>
          <p class="text-ink-muted">
            {{ benefit.description }}
          </p>
        </li>
      </ul>
    </div>
  </UiSection>
</template>
