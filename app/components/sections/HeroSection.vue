<script setup lang="ts">
import type { ImageAsset, LinkItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

withDefaults(defineProps<{
  title: string
  lead: string
  primaryAction: LinkItem
  secondaryAction?: LinkItem
  image: ImageAsset
  eyebrow?: string
  /** Korta punkter under knapparna. */
  highlights?: string[]
  headingLevel?: HeadingLevel
}>(), {
  secondaryAction: undefined,
  eyebrow: undefined,
  highlights: () => [],
  headingLevel: 1,
})
</script>

<template>
  <UiSection background="subtle">
    <div class="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div class="space-y-6">
        <p v-if="eyebrow" class="eyebrow">
          {{ eyebrow }}
        </p>
        <UiHeading :level="headingLevel" size="xl">
          {{ title }}
        </UiHeading>
        <p class="lead max-w-prose">
          {{ lead }}
        </p>
        <div class="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
          <UiButton :href="primaryAction.href">
            {{ primaryAction.label }}
          </UiButton>
          <UiButton v-if="secondaryAction" :href="secondaryAction.href" variant="secondary">
            {{ secondaryAction.label }}
          </UiButton>
        </div>
        <ul v-if="highlights.length" class="flex flex-col gap-x-6 gap-y-2 pt-2 text-sm font-semibold sm:flex-row sm:flex-wrap">
          <li v-for="item in highlights" :key="item" class="flex items-center gap-2">
            <UiIcon name="check" size="sm" class="text-accent" />
            {{ item }}
          </li>
        </ul>
      </div>
      <img
        :src="image.src"
        :alt="image.alt"
        :width="image.width"
        :height="image.height"
        class="aspect-[4/3] w-full rounded-card object-cover"
      >
    </div>
  </UiSection>
</template>
