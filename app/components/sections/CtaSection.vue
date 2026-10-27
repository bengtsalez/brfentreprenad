<script setup lang="ts">
import type { LinkItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

withDefaults(defineProps<{
  title: string
  text: string
  primaryAction: LinkItem
  secondaryAction?: LinkItem
  headingLevel?: HeadingLevel
}>(), {
  secondaryAction: undefined,
  headingLevel: 2,
})
</script>

<template>
  <UiSection background="dark" spacing="compact">
    <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div class="max-w-prose space-y-3">
        <UiHeading :level="headingLevel" size="lg">
          {{ title }}
        </UiHeading>
        <p class="lead">
          {{ text }}
        </p>
      </div>
      <div class="flex shrink-0 flex-col gap-3 sm:flex-row">
        <UiButton :href="primaryAction.href">
          {{ primaryAction.label }}
        </UiButton>
        <UiButton v-if="secondaryAction" :href="secondaryAction.href" variant="secondary">
          {{ secondaryAction.label }}
        </UiButton>
      </div>
    </div>
  </UiSection>
</template>
