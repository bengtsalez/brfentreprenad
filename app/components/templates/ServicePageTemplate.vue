<script setup lang="ts">
import { guidePath, publishedGuides } from '#shared/routes'
import { serviceAreas, sitePages, type SitePage } from '#shared/site-structure'
import { companyDetails, phone } from '~/content/company'
import { inquiryFlows } from '~/content/inquiry'
import { projectSteps, serviceSteps } from '~/content/processes'
import { caseStudiesForService } from '~/content/references'
import type { EntryItem, InquiryFlow, LinkItem, ServicePageContent } from '~/types/content'

/**
 * Mall för tjänstesidor (huvudområden och undertjänster).
 *
 * Ordningen följer vad en styrelse behöver veta: behov, omfattning, planering,
 * kostnad, påverkan på boende, referens, frågor och till sist ett formulär med
 * tjänsten förvald. Sektioner utan innehåll visas inte, så områdessidor med
 * enklare innehåll använder samma mall.
 */
const props = defineProps<{
  page: SitePage
  content: ServicePageContent
}>()

const { content, page } = props
const isService = content.primaryAction === 'service'
const flow: InquiryFlow = isService ? 'service' : 'projekt'

usePageSeo({
  title: content.metaTitle,
  description: content.metaDescription,
  path: page.path,
  jsonLd: content.faq.length ? faqJsonLd(content.faq) : undefined,
})

// Publicerade guider som hör till tjänsten. Utkast länkas aldrig.
const guideLinks: LinkItem[] = publishedGuides()
  .filter(guide => guide.services.includes(page.path))
  .map(guide => ({ label: guide.title, href: guidePath(guide) }))

const primaryAction: LinkItem = {
  label: isService ? 'Skicka serviceförfrågan' : 'Prata med en projektledare',
  href: '#forfragan',
}
const phoneAction: LinkItem = { label: `Ring ${phone.display}`, href: phone.href }

const area = serviceAreas.find(item => page.path.startsWith(item.path))
const isAreaPage = area?.path === page.path

const breadcrumbs: LinkItem[] = [
  { label: 'Startsida', href: sitePages.home.path },
  { label: 'Tjänster', href: sitePages.services.path },
  ...(area && !isAreaPage ? [{ label: area.title, href: area.path }] : []),
  { label: page.title, href: page.path },
]

// Undertjänster som ännu inte är bekräftade visas inte. Opublicerade visas utan länk.
const examples: EntryItem[] = content.examples ?? (isAreaPage
  ? area.children
      .filter(child => child.status !== 'unconfirmed')
      .map(child => ({
        title: child.title,
        description: child.summary,
        href: child.status === 'published' ? child.path : undefined,
      }))
  : [])

const steps = content.planning?.steps ?? (isService ? serviceSteps : projectSteps)
const references = caseStudiesForService(page.path)

const relatedLinks = publishedLinks([
  ...(area && !isAreaPage ? [area.path] : []),
  ...content.related,
])
const audienceLinks = publishedLinks(content.audiences)
</script>

<template>
  <div :data-track-service="content.inquiryService" :data-track-flow="flow">
    <HeroCompactSection
      :title="content.title"
      :lead="content.lead"
      :action="primaryAction"
      :secondary-action="phoneAction"
    >
      <template #top>
        <SiteBreadcrumbs :items="breadcrumbs" />
      </template>
      <template #actions-note>
        <p class="max-w-prose text-sm text-ink-muted">
          {{ inquiryFlows[flow].nextSteps[1] }}
        </p>
      </template>
    </HeroCompactSection>

    <TextSection :title="content.intro.title" :paragraphs="content.intro.paragraphs" :list="content.intro.list" />

    <DetailListSection
      v-if="content.needs?.length"
      :title="content.needsTitle ?? 'Vanliga skäl att höra av sig'"
      :items="content.needs"
      background="subtle"
    />

    <DetailListSection
      v-if="content.scope"
      :title="content.scope.title"
      :lead="content.scope.lead"
      :items="content.scope.items"
      layout="rows"
    />

    <DetailListSection
      v-if="content.decisions"
      :title="content.decisions.title"
      :lead="content.decisions.lead"
      :items="content.decisions.items"
      layout="rows"
      background="subtle"
      eyebrow="Att ta ställning till"
    />

    <EntryListSection
      v-if="examples.length"
      :title="content.examplesTitle"
      :entries="examples"
      background="subtle"
    />

    <ProcessSection
      :title="content.planning?.title ?? (isService ? 'Så går en servicebeställning till' : 'Så går ett projekt till')"
      :lead="content.planning?.lead"
      :steps="steps"
      eyebrow="Arbetsgång"
    />

    <DetailListSection
      v-if="content.costFactors"
      :title="content.costFactors.title"
      :lead="content.costFactors.lead"
      :items="content.costFactors.items"
      eyebrow="Omfattning och kostnad"
      background="dark"
    />

    <SplitTextSection
      v-if="content.residents"
      :title="content.residents.title"
      :columns="[content.residents.board, content.residents.residents]"
      eyebrow="Styrelse och boende"
    />

    <TextSection
      v-if="content.coordination"
      :title="content.coordination.title"
      :paragraphs="content.coordination.paragraphs"
      :list="content.coordination.list"
      background="subtle"
    />

    <TextSection
      v-if="content.checklist"
      :title="content.checklist.title"
      :paragraphs="content.checklist.lead ? [content.checklist.lead] : []"
      :list="content.checklist.items"
      eyebrow="Checklista"
    />

    <CaseStudySection
      title="Referensprojekt"
      :projects="references"
      eyebrow="Referens"
    />

    <FaqSection :title="`Frågor om ${page.title.charAt(0).toLowerCase()}${page.title.slice(1)}`" eyebrow="Vanliga frågor" :items="content.faq" />

    <ContactSection
      :title="isService ? 'Skicka en serviceförfrågan' : 'Berätta om ert projekt'"
      :lead="isService
        ? 'Beskriv vad som behöver åtgärdas och var. Tjänsten är redan vald, men ni kan ändra den.'
        : 'Berätta kort om fastigheten och vad ni planerar. Ni behöver inte ha ett färdigt underlag.'"
      :contact-details="companyDetails.filter(detail => detail.href)"
      :flow="flow"
      :service="content.inquiryService"
    />

    <UiSection v-if="relatedLinks.length || audienceLinks.length || guideLinks.length" spacing="compact">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <nav v-if="guideLinks.length" aria-labelledby="guider-for-styrelsen">
          <UiHeading id="guider-for-styrelsen" :level="2" size="sm" class="mb-4">
            Guider för styrelsen
          </UiHeading>
          <ul class="space-y-1">
            <li v-for="link in guideLinks" :key="link.href">
              <a :href="link.href" class="text-link inline-flex min-h-11 items-center font-semibold">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
        <nav v-if="relatedLinks.length" aria-labelledby="relaterade-tjanster">
          <UiHeading id="relaterade-tjanster" :level="2" size="sm" class="mb-4">
            Relaterade tjänster
          </UiHeading>
          <ul class="space-y-1">
            <li v-for="link in relatedLinks" :key="link.href">
              <a :href="link.href" class="text-link inline-flex min-h-11 items-center font-semibold">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
        <nav v-if="audienceLinks.length" aria-labelledby="for-er-som-ar">
          <UiHeading id="for-er-som-ar" :level="2" size="sm" class="mb-4">
            Läs mer för er som är
          </UiHeading>
          <ul class="space-y-1">
            <li v-for="link in audienceLinks" :key="link.href">
              <a :href="link.href" class="text-link inline-flex min-h-11 items-center font-semibold">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </UiSection>
  </div>
</template>
