<script setup lang="ts">
import type { ImageAsset, LinkItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

/** Text och bild sida vid sida. Brödtexten skickas i default-sloten. */
withDefaults(defineProps<{
  title: string
  image: ImageAsset
  eyebrow?: string
  action?: LinkItem
  imagePosition?: 'start' | 'end'
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  action: undefined,
  imagePosition: 'end',
  headingLevel: 2,
})
</script>

<template>
  <UiSection>
    <div class="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
      <div class="space-y-5" :class="imagePosition === 'start' && 'md:order-last'">
        <p v-if="eyebrow" class="eyebrow">
          {{ eyebrow }}
        </p>
        <UiHeading :level="headingLevel" size="lg">
          {{ title }}
        </UiHeading>
        <div class="space-y-4 text-ink-muted">
          <slot />
        </div>
        <UiButton v-if="action" :href="action.href" variant="text">
          {{ action.label }}
          <UiIcon name="arrow-right" size="sm" />
        </UiButton>
      </div>
      <img
        :src="image.src"
        :alt="image.alt"
        :width="image.width"
        :height="image.height"
        loading="lazy"
        class="aspect-[4/3] w-full rounded-card object-cover"
      >
    </div>
  </UiSection>
</template>
