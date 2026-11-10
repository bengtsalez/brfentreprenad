<script setup lang="ts">
import { locationPath } from '#shared/routes'
import { sitePages } from '#shared/site-structure'
import { companyDetails } from '~/content/company'
import { caseStudiesForLocation } from '~/content/references'
import type { LinkItem, LocationPage } from '~/types/content'

/**
 * Ortssida. Visar bara verifierade lokala uppgifter, projekt på orten och
 * relevanta tjänster. Används först när en ort har status "published" i
 * shared/content/locations.ts.
 */
const props = defineProps<{
  location: LocationPage
}>()

const { location } = props
const path = locationPath(location)

usePageSeo({
  title: location.metaTitle,
  description: location.metaDescription,
  path,
  organization: true,
})

const { actions } = useSiteNavigation()

const breadcrumbs: LinkItem[] = [
  { label: 'Startsida', href: sitePages.home.path },
  { label: sitePages.serviceArea.title, href: sitePages.serviceArea.path },
  { label: location.name, href: path },
]

const projects = caseStudiesForLocation(location.slug)
const services = publishedEntries(location.services)
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Verksamhetsområde"
      :title="`Renovering och fastighetsservice i ${location.name}`"
      :lead="location.lead"
      :action="actions.project"
      :secondary-action="actions.service"
    >
      <template #top>
        <SiteBreadcrumbs :items="breadcrumbs" />
      </template>
    </HeroCompactSection>

    <TextSection
      v-for="(section, index) in location.sections"
      :key="section.title"
      :title="section.title"
      :paragraphs="section.paragraphs"
      :list="section.list"
      :background="index % 2 === 1 ? 'subtle' : 'default'"
    />

    <CaseStudySection :title="`Projekt i ${location.name}`" :projects="projects" eyebrow="Referenser" />

    <EntryListSection
      v-if="services.length"
      :title="`Tjänster i ${location.name}`"
      :entries="services"
      background="subtle"
    />

    <ContactSection
      title="Berätta vad ni behöver hjälp med"
      lead="Välj om det gäller ett servicearbete eller ett planerat projekt."
      :contact-details="companyDetails.filter(detail => detail.href)"
    />
  </div>
</template>
