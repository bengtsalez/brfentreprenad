<script setup lang="ts">
import type { ImageAsset, LinkItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

/** Kort med valfri bild, etikett, metatext och länk. Brödtext skickas i default-sloten. */
withDefaults(defineProps<{
  title: string
  headingLevel?: HeadingLevel
  image?: ImageAsset
  badge?: string
  meta?: string
  link?: LinkItem
}>(), {
  headingLevel: 3,
  image: undefined,
  badge: undefined,
  meta: undefined,
  link: undefined,
})
</script>

<template>
  <article class="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card">
    <img
      v-if="image"
      :src="image.src"
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      loading="lazy"
      class="aspect-[3/2] w-full object-cover"
    >
    <div class="flex flex-1 flex-col gap-3 p-6">
      <UiBadge v-if="badge" variant="accent">
        {{ badge }}
      </UiBadge>
      <p v-if="meta" class="text-sm text-ink-muted">
        {{ meta }}
      </p>
      <UiHeading :level="headingLevel" size="sm">
        {{ title }}
      </UiHeading>
      <div class="text-ink-muted">
        <slot />
      </div>
      <p v-if="link" class="mt-auto pt-2">
        <a :href="link.href" class="text-link inline-flex items-center gap-1.5 font-semibold">
          {{ link.label }}
          <UiIcon name="arrow-right" size="sm" />
        </a>
      </p>
    </div>
  </article>
</template>
