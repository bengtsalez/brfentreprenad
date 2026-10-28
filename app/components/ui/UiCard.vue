<script setup lang="ts">
import type { ImageAsset, LinkItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

/**
 * Kort med valfri bild, etikett, metatext och länk. Brödtext skickas i default-sloten.
 * Med länk blir hela kortet klickbart och lyfter vid hover och tangentbordsfokus.
 */
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
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card"
    :class="link && 'motion-safe:transition-[translate,box-shadow] motion-safe:duration-300 motion-safe:ease-premium hover:shadow-card-hover has-focus-visible:shadow-card-hover motion-safe:hover:-translate-y-1 motion-safe:has-focus-visible:-translate-y-1'"
  >
    <div v-if="image" class="overflow-hidden">
      <img
        :src="image.src"
        :alt="image.alt"
        :width="image.width"
        :height="image.height"
        loading="lazy"
        class="aspect-[3/2] w-full object-cover"
        :class="link && 'motion-safe:transition-[scale] motion-safe:duration-500 motion-safe:ease-premium motion-safe:group-hover:scale-[1.03]'"
      >
    </div>
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
        <!-- after-elementet sträcker länkytan över hela kortet. -->
        <a :href="link.href" class="text-link inline-flex items-center gap-1.5 font-semibold after:absolute after:inset-0">
          {{ link.label }}
          <UiIcon name="arrow-right" size="sm" class="motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-premium motion-safe:group-hover:translate-x-1" />
        </a>
      </p>
    </div>
  </article>
</template>
