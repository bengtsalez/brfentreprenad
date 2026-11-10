<script setup lang="ts">
import { publishedLocations } from '#shared/routes'

/** Ortssida. Ger 404 för utkast och okända orter (shared/content/locations.ts). */
const route = useRoute()
const location = publishedLocations().find(item => item.slug === String(route.params.ort))

if (!location) {
  throw createError({ statusCode: 404, statusMessage: 'Sidan finns inte', fatal: true })
}
</script>

<template>
  <LocationTemplate v-if="location" :key="location.slug" :location="location" />
</template>
