<script setup lang="ts">
import { locationPath, publishedLocations } from '#shared/routes'
import { findPage, isPublished, priorityServices, sitePages } from '#shared/site-structure'
import { companyDetails, office, officeAddress, serviceAreaText } from '~/content/company'
import { publishedCaseStudies } from '~/content/references'
import type { EntryItem, LinkItem } from '~/types/content'

/**
 * Verksamhetsområde. Bygger bara på bekräftade uppgifter: området från
 * Halmstad till Falsterbo och kontoret i Landskrona (app/content/company.ts).
 * Ortssidor listas här först när de är publicerade (shared/content/locations.ts).
 */
usePageSeo({
  title: 'Verksamhetsområde från Halmstad till Falsterbo',
  description: `BRF Entreprenad tar uppdrag åt bostadsrättsföreningar, förvaltare och fastighetsägare från Halmstad till Falsterbo. Kontoret ligger på ${office.street} i ${office.city}.`,
  path: sitePages.serviceArea.path,
  organization: true,
})

const { actions } = useSiteNavigation()

const breadcrumbs: LinkItem[] = [
  { label: 'Startsida', href: sitePages.home.path },
  { label: sitePages.serviceArea.title, href: sitePages.serviceArea.path },
]

const services: EntryItem[] = priorityServices
  .filter(service => isPublished(service.path))
  .map((service) => {
    const page = findPage(service.path)!
    return { title: page.title, description: page.summary, href: page.path }
  })

const locations: EntryItem[] = publishedLocations().map(location => ({
  title: location.name,
  description: location.lead,
  href: locationPath(location),
}))

const projects = publishedCaseStudies()
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Verksamhetsområde"
      :title="serviceAreaText"
      :lead="`Vi tar uppdrag åt bostadsrättsföreningar, fastighetsförvaltare och fastighetsägare från Halmstad i norr till Falsterbo i söder. Kontoret ligger i ${office.city}.`"
      :action="actions.project"
      :secondary-action="actions.service"
    >
      <template #top>
        <SiteBreadcrumbs :items="breadcrumbs" />
      </template>
    </HeroCompactSection>

    <TextSection
      title="Var vi tar uppdrag"
      :paragraphs="[
        'Området sträcker sig från Halmstad i norr till Falsterbo i söder. Inom området tar vi både servicearbeten och planerade renoveringar.',
        'Ligger fastigheten nära gränsen för området, eller är ni osäkra på om den ingår, skriv orten i förfrågan så besvarar vi frågan.',
      ]"
    />

    <TextSection
      eyebrow="Kontor"
      :title="`Kontoret i ${office.city}`"
      :paragraphs="[`Vårt kontor ligger på ${officeAddress}.`]"
      background="subtle"
    >
      <p>
        <a :href="sitePages.about.path" class="text-link font-semibold">Om BRF Entreprenad</a>
      </p>
    </TextSection>

    <EntryListSection
      v-if="locations.length"
      title="Orter"
      :entries="locations"
    />

    <EntryListSection
      eyebrow="Tjänster"
      title="Det här gör vi inom området"
      :entries="services"
    >
      <UiButton :href="sitePages.services.path" variant="text" arrow class="mt-8">
        Alla tjänster
      </UiButton>
    </EntryListSection>

    <CaseStudySection
      eyebrow="Referenser"
      title="Genomförda projekt inom området"
      :projects="projects"
    />

    <ContactSection
      title="Berätta var fastigheten ligger och vad ni behöver"
      lead="Välj om det gäller ett servicearbete eller ett planerat projekt."
      :contact-details="companyDetails.filter(detail => detail.href)"
    />
  </div>
</template>
