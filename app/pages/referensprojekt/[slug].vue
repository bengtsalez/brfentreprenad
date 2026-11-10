<script setup lang="ts">
import { publishedCaseStudies } from '~/content/references'

/** Projektsida. Ger 404 för opublicerade eller okända projekt. */
const route = useRoute()
const project = publishedCaseStudies().find(item => item.slug === String(route.params.slug))

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Sidan finns inte', fatal: true })
}
</script>

<template>
  <CaseStudyTemplate v-if="project" :key="project.slug" :project="project" />
</template>
