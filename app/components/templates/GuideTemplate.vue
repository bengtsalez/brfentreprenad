<script setup lang="ts">
import { guidePath } from '#shared/routes'
import { findPage, sitePages } from '#shared/site-structure'
import { inquiryFlows, inquiryHref } from '~/content/inquiry'
import { caseStudyPath, publishedCaseStudies } from '~/content/references'
import type { Guide, LinkItem } from '~/types/content'

/**
 * Guide i kunskapsdelen. Ordningen: direkt svar, fördjupning, beslutspunkter,
 * källor och till sist vägen vidare till tjänst och förfrågan.
 * Bara verkliga medverkande och datum visas. Faktagranskare visas bara när
 * uppdraget är bekräftat (shared/content/guides.ts).
 */
const props = defineProps<{
  guide: Guide
}>()

const { guide } = props
const path = guidePath(guide)
const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
const orgId = organizationId(siteUrl)

const person = (contributor: Guide['author']) => contributor.type === 'Person'
  ? { '@type': 'Person', 'name': contributor.name, ...(contributor.role ? { jobTitle: contributor.role } : {}) }
  : { '@id': orgId }

usePageSeo({
  title: guide.metaTitle,
  description: guide.metaDescription,
  path,
  type: 'article',
  organization: true,
  jsonLd: {
    '@type': 'Article',
    'headline': guide.title,
    'description': guide.metaDescription,
    'inLanguage': 'sv-SE',
    'mainEntityOfPage': `${siteUrl}${path}`,
    'author': person(guide.author),
    'publisher': { '@id': orgId },
    ...(guide.published ? { datePublished: guide.published } : {}),
    'dateModified': guide.updated,
    'citation': guide.sources.map(source => ({
      '@type': 'CreativeWork',
      'name': source.title,
      'url': source.url,
      'publisher': { '@type': 'Organization', 'name': source.publisher },
    })),
  },
})

const breadcrumbs: LinkItem[] = [
  { label: 'Startsida', href: sitePages.home.path },
  { label: sitePages.knowledge.title, href: sitePages.knowledge.path },
  { label: guide.title, href: path },
]

const flow = inquiryFlows[guide.inquiry.flow]
const inquiryAction: LinkItem = {
  label: guide.inquiry.flow === 'projekt' ? 'Prata med en projektledare' : 'Skicka serviceförfrågan',
  href: inquiryHref(guide.inquiry.flow, guide.inquiry.service),
}
const serviceLinks = publishedLinks(guide.services)

// Projekt som hör till samma tjänster, när sådana är publicerade.
const projectLinks: LinkItem[] = publishedCaseStudies()
  .filter(project => project.services.some(service => guide.services.includes(service)))
  .map(project => ({ label: project.title, href: caseStudyPath(project) }))

const byline = [
  `Av ${guide.author.name}${guide.author.role ? `, ${guide.author.role}` : ''}`,
  ...(guide.reviewer ? [`Faktagranskad av ${guide.reviewer.name}${guide.reviewer.role ? `, ${guide.reviewer.role}` : ''}`] : []),
  ...(guide.published ? [`Publicerad ${formatDate(guide.published)}`] : []),
  `Uppdaterad ${formatDate(guide.updated)}`,
]
const serviceTitle = findPage(guide.services[0] ?? '')?.title
</script>

<template>
  <div :data-track-service="guide.inquiry.service" :data-track-flow="guide.inquiry.flow">
    <HeroCompactSection
      eyebrow="Guide för styrelser"
      :title="guide.title"
      :lead="guide.answer"
    >
      <template #top>
        <SiteBreadcrumbs :items="breadcrumbs" />
      </template>
      <template #actions-note>
        <p class="text-sm text-ink-muted">
          {{ byline.join(' · ') }}
        </p>
      </template>
    </HeroCompactSection>

    <TextSection
      v-for="(section, index) in guide.sections"
      :key="section.title"
      :title="section.title"
      :paragraphs="section.paragraphs"
      :list="section.list"
      :background="index % 2 === 1 ? 'subtle' : 'default'"
    />

    <DetailListSection
      v-if="guide.decisions"
      :title="guide.decisions.title"
      :lead="guide.decisions.lead"
      :items="guide.decisions.items"
      layout="rows"
      eyebrow="Beslutspunkter"
    />

    <UiSection background="subtle" spacing="compact">
      <div class="grid gap-10 md:grid-cols-2">
        <section aria-labelledby="kallor">
          <UiHeading id="kallor" :level="2" size="sm" class="mb-4">
            Källor
          </UiHeading>
          <ul class="space-y-3">
            <li v-for="source in guide.sources" :key="source.url">
              <a :href="source.url" class="text-link font-semibold" rel="noopener">{{ source.title }}</a>
              <span class="block text-sm text-ink-muted">{{ source.publisher }}, kontrollerad {{ formatDate(source.checked) }}</span>
            </li>
          </ul>
        </section>
        <nav v-if="serviceLinks.length || projectLinks.length" aria-labelledby="las-vidare">
          <UiHeading id="las-vidare" :level="2" size="sm" class="mb-4">
            Läs vidare
          </UiHeading>
          <ul class="space-y-1">
            <li v-for="link in [...serviceLinks, ...projectLinks]" :key="link.href">
              <a :href="link.href" class="text-link inline-flex min-h-11 items-center font-semibold">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </UiSection>

    <CtaSection
      :title="guide.inquiry.flow === 'projekt' ? 'Vill ni gå igenom er fastighet?' : 'Behöver något åtgärdas?'"
      :text="flow.nextSteps[1] ?? flow.summary"
      :primary-action="inquiryAction"
      :secondary-action="serviceLinks[0] ? { label: `Om ${(serviceTitle ?? serviceLinks[0].label).toLowerCase()}`, href: serviceLinks[0].href } : undefined"
    />
  </div>
</template>
