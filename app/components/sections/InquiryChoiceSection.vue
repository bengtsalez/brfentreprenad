<script setup lang="ts">
import type { InquiryChoice } from '~/types/content'
import type { HeadingLevel, SectionBackground } from '~/types/ui'

/**
 * Två ingångar sida vid sida: service respektive planerade projekt.
 * Ingångarna skiljs åt av en linje i stället för att läggas i kort.
 */
const props = withDefaults(defineProps<{
  title: string
  choices: InquiryChoice[]
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

const choiceHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection :background="background">
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <div class="mt-12 grid border-t-2 border-ink lg:grid-cols-2">
      <article
        v-for="(choice, index) in choices"
        :key="choice.title"
        class="flex flex-col gap-6 py-10 lg:py-12"
        :class="index === 0 ? 'border-b border-line lg:border-r lg:border-b-0 lg:pr-12' : 'lg:pl-12'"
      >
        <div class="space-y-3">
          <p class="eyebrow">
            {{ choice.eyebrow }}
          </p>
          <UiHeading :level="choiceHeadingLevel" size="md">
            {{ choice.title }}
          </UiHeading>
          <p class="text-ink-muted">
            {{ choice.description }}
          </p>
        </div>
        <ul class="space-y-2">
          <li v-for="example in choice.examples" :key="example" class="flex items-start gap-3">
            <UiIcon name="check" class="mt-1 text-accent" />
            <span>{{ example }}</span>
          </li>
        </ul>
        <p class="mt-auto border-l-2 border-accent pl-4 text-sm">
          {{ choice.next }}
        </p>
        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <UiButton :href="choice.action.href" :variant="index === 0 ? 'primary' : 'secondary'" arrow>
            {{ choice.action.label }}
          </UiButton>
          <UiButton v-if="choice.link" :href="choice.link.href" variant="text">
            {{ choice.link.label }}
          </UiButton>
        </div>
      </article>
    </div>
  </UiSection>
</template>
