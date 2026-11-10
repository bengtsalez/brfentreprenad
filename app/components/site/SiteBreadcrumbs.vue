<script setup lang="ts">
import type { LinkItem } from '~/types/content'

/**
 * Brödsmulor. Sista ledet är den aktuella sidan och visas utan länk.
 * Samma länkar läggs ut som BreadcrumbList i strukturerad data, så att synliga
 * brödsmulor och strukturerad data inte kan skilja sig åt.
 */
const props = withDefaults(defineProps<{
  items: LinkItem[]
  /** Lägg ut BreadcrumbList. Stängs av där brödsmulorna bara är exempel. */
  structuredData?: boolean
}>(), {
  structuredData: true,
})

const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

if (props.structuredData && siteUrl && props.items.length > 1) {
  useHead({
    script: [{
      key: 'ld-breadcrumbs',
      type: 'application/ld+json',
      innerHTML: serializeJsonLd({ '@context': 'https://schema.org', ...breadcrumbJsonLd(props.items, siteUrl) }),
    }],
  })
}
</script>

<template>
  <nav aria-label="Brödsmulor" class="mb-8">
    <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
      <li v-for="(item, index) in items" :key="item.href" class="flex items-center gap-2">
        <span v-if="index > 0" aria-hidden="true">/</span>
        <span v-if="index === items.length - 1" aria-current="page" class="text-ink">{{ item.label }}</span>
        <a v-else :href="item.href" class="underline-offset-4 hover:text-ink hover:underline">{{ item.label }}</a>
      </li>
    </ol>
  </nav>
</template>
