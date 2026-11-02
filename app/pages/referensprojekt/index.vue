<script setup lang="ts">
import { sitePages } from '#shared/site-structure'
import { publishedCaseStudies } from '~/content/references'

/**
 * Referensöversikt. Sidan ger 404 tills /referensprojekt/ är publicerad i
 * shared/site-structure.ts och det finns minst ett projekt med underlag.
 */
const projects = publishedCaseStudies()

if (!projects.length) {
  throw createError({ statusCode: 404, statusMessage: 'Sidan finns inte', fatal: true })
}

usePageSeo({
  title: 'Referensprojekt',
  description: 'Renoveringar och fastighetsarbeten för bostadsrättsföreningar och fastighetsägare, med utgångsläge, omfattning och resultat.',
  path: sitePages.references.path,
})
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Referenser"
      title="Referensprojekt"
      lead="Uppdrag med utgångsläge, omfattning och vem som utförde arbetet."
    />
    <CaseStudySection title="Genomförda projekt" :projects="projects" />
  </div>
</template>
