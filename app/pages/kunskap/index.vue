<script setup lang="ts">
import { guidePath, publishedGuides } from '#shared/routes'
import { sitePages } from '#shared/site-structure'
import type { EntryItem, LinkItem } from '~/types/content'

/**
 * Översikt över guider för styrelser. Ger 404 så länge ingen guide är
 * publicerad, så att det aldrig finns en tom kunskapssida.
 */
const guides = publishedGuides()

if (!guides.length) {
  throw createError({ statusCode: 404, statusMessage: 'Sidan finns inte', fatal: true })
}

usePageSeo({
  title: 'Guider för styrelser i bostadsrättsföreningar',
  description: 'Guider om fasadrenovering, fukt i källaren och offertförfrågningar för styrelser i bostadsrättsföreningar, med beslutspunkter och källor.',
  path: sitePages.knowledge.path,
})

const { actions } = useSiteNavigation()

const breadcrumbs: LinkItem[] = [
  { label: 'Startsida', href: sitePages.home.path },
  { label: sitePages.knowledge.title, href: sitePages.knowledge.path },
]

const entries: EntryItem[] = guides.map(guide => ({
  title: guide.title,
  description: guide.summary,
  href: guidePath(guide),
}))
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Kunskap"
      title="Guider för styrelser"
      lead="Underlag för styrelser som planerar en renovering eller behöver förstå ett problem i fastigheten. Varje guide börjar med ett kort svar och avslutas med beslutspunkter och källor."
    >
      <template #top>
        <SiteBreadcrumbs :items="breadcrumbs" />
      </template>
    </HeroCompactSection>

    <EntryListSection title="Alla guider" :entries="entries" />

    <CtaSection
      title="Har ni en fråga om er fastighet?"
      text="Berätta vad ni funderar på. En projektledare kontaktar er för att gå igenom förutsättningarna."
      :primary-action="actions.project"
      :secondary-action="actions.service"
    />
  </div>
</template>
