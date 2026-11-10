<script setup lang="ts">
import { publishedGuides } from '#shared/routes'

/** Guide. Ger 404 för utkast och okända adresser. */
const route = useRoute()
const guide = publishedGuides().find(item => item.slug === String(route.params.slug))

if (!guide) {
  throw createError({ statusCode: 404, statusMessage: 'Sidan finns inte', fatal: true })
}
</script>

<template>
  <GuideTemplate v-if="guide" :key="guide.slug" :guide="guide" />
</template>
