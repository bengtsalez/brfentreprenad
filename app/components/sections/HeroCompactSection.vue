<script setup lang="ts">
import type { LinkItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

/**
 * Kompakt hero utan bild, t.ex. överst på en tjänstesida.
 * Sloten `top` visas ovanför rubriken, t.ex. för brödsmulor.
 * Sloten `actions-note` visas under knapparna, t.ex. vad som händer efter klick.
 * Sloten `aside` lägger en spalt bredvid texten på stora skärmar.
 * `backgroundVideo` spelar en ljudlös video i loop bakom innehållet.
 * `backgroundPoster` visas medan videon laddar och i stället för videon vid minskad rörelse.
 */
const slots = useSlots()

withDefaults(defineProps<{
  title: string
  lead?: string
  eyebrow?: string
  action?: LinkItem
  secondaryAction?: LinkItem
  /** Korta punkter under knapparna. */
  highlights?: string[]
  headingLevel?: HeadingLevel
  /** Sökväg till en video i public, t.ex. '/video.mp4'. */
  backgroundVideo?: string
  /** Stillbild till bakgrundsvideon, t.ex. första bildrutan. */
  backgroundPoster?: string
}>(), {
  lead: undefined,
  eyebrow: undefined,
  action: undefined,
  secondaryAction: undefined,
  highlights: () => [],
  headingLevel: 1,
  backgroundVideo: undefined,
  backgroundPoster: undefined,
})
</script>

<template>
  <UiSection background="dark" spacing="compact">
    <template v-if="backgroundVideo" #background>
      <div class="absolute inset-0 opacity-20">
        <img v-if="backgroundPoster" :src="backgroundPoster" alt="" class="absolute inset-0 size-full object-cover">
        <video
          :src="backgroundVideo"
          :poster="backgroundPoster"
          class="absolute inset-0 size-full object-cover motion-reduce:hidden"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
        />
      </div>
    </template>
    <slot name="top" />
    <div :class="slots.aside && 'grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16'">
      <div class="min-w-0 max-w-prose space-y-5">
        <p v-if="eyebrow" class="eyebrow">
          {{ eyebrow }}
        </p>
        <UiHeading :level="headingLevel" size="xl">
          {{ title }}
        </UiHeading>
        <p v-if="lead" class="lead">
          {{ lead }}
        </p>
        <div v-if="action || secondaryAction" class="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
          <UiButton v-if="action" :href="action.href">
            {{ action.label }}
          </UiButton>
          <UiButton v-if="secondaryAction" :href="secondaryAction.href" variant="secondary">
            {{ secondaryAction.label }}
          </UiButton>
        </div>
        <slot name="actions-note" />
        <ul v-if="highlights.length" class="flex flex-col gap-x-6 gap-y-2 pt-2 text-sm font-semibold sm:flex-row sm:flex-wrap">
          <li v-for="item in highlights" :key="item" class="flex items-center gap-2">
            <UiIcon name="check" size="sm" class="text-accent" />
            {{ item }}
          </li>
        </ul>
      </div>
      <slot name="aside" />
    </div>
  </UiSection>
</template>
