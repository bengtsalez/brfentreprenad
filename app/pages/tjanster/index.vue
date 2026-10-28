<script setup lang="ts">
import { serviceAreas, sitePages } from '#shared/site-structure'
import type { LinkItem } from '~/types/content'

usePageSeo({
  title: 'Våra tjänster',
  description: 'Byggservice, porttelefoni och passage, fasad och tak, fönster, markarbeten, invändig renovering och totalentreprenad för fastigheter från Halmstad till Falsterbo.',
  path: sitePages.services.path,
})

const { actions } = useSiteNavigation()
const services = publishedEntries(serviceAreas.map(area => area.path))

const breadcrumbs: LinkItem[] = [
  { label: 'Startsida', href: sitePages.home.path },
  { label: 'Tjänster', href: sitePages.services.path },
]
</script>

<template>
  <div>
    <HeroCompactSection
      title="Våra tjänster"
      lead="Från enskilda reparationer till större renoveringar. Tjänsterna är grupperade efter område, och varje område beskriver vad som ingår och hur det beställs."
      :action="actions.service"
      :secondary-action="actions.project"
    >
      <template #top>
        <SiteBreadcrumbs :items="breadcrumbs" />
      </template>
    </HeroCompactSection>

    <EntryListSection title="Tjänsteområden" :entries="services" />

    <TextSection
      title="Service eller projekt?"
      background="subtle"
      :paragraphs="[
        'Mindre arbeten som kan beskrivas och bedömas direkt beställs som service. Ni anger adress, behov och önskad starttid och följer sedan status i ert konto.',
        'Arbeten som berör många boende, kräver flera yrkesgrupper eller behöver ett beslutsunderlag hanteras som projekt med en personlig projektledare.',
      ]"
    >
      <p>
        <a :href="sitePages.bookingGuide.path" class="text-link font-semibold">Så fungerar servicebokningen</a>
      </p>
    </TextSection>

    <CtaSection
      title="Hittar ni inte det ni söker?"
      text="Beskriv vad som behöver göras, så återkommer vi om hur det kan lösas."
      :primary-action="actions.project"
    />
  </div>
</template>
