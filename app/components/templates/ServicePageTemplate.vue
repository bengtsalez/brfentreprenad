<script setup lang="ts">
import { serviceAreas, sitePages, type SitePage } from '#shared/site-structure'
import { projectSteps, serviceSteps } from '~/content/processes'
import type { EntryItem, LinkItem, ServicePageContent } from '~/types/content'

/**
 * Mall för tjänstesidor (huvudområden och undertjänster) enligt avsnitt 8 i underlaget.
 * Servicesidor har "Boka service" som huvudhandling, projektsidor "Diskutera ett projekt".
 */
const props = defineProps<{
  page: SitePage
  content: ServicePageContent
}>()

usePageSeo({ title: props.content.metaTitle, description: props.content.metaDescription, path: props.page.path })

const { actions } = useSiteNavigation()
const isService = props.content.primaryAction === 'service'
const primaryAction = actions[props.content.primaryAction]
const secondaryAction = actions[isService ? 'project' : 'service']
const steps = isService ? serviceSteps : projectSteps

const area = serviceAreas.find(item => props.page.path.startsWith(item.path))
const isAreaPage = area?.path === props.page.path

const breadcrumbs: LinkItem[] = [
  { label: 'Startsida', href: sitePages.home.path },
  { label: 'Tjänster', href: sitePages.services.path },
  ...(area && !isAreaPage ? [{ label: area.title, href: area.path }] : []),
  { label: props.page.title, href: props.page.path },
]

// Undertjänster som ännu inte är bekräftade visas inte. Opublicerade visas utan länk.
const examples: EntryItem[] = props.content.examples ?? (isAreaPage
  ? area.children
      .filter(child => child.status !== 'unconfirmed')
      .map(child => ({
        title: child.title,
        description: child.summary,
        href: child.status === 'published' ? child.path : undefined,
      }))
  : [])

const relatedLinks = publishedLinks([
  ...(area && !isAreaPage ? [area.path] : []),
  ...props.content.related,
])
const audienceLinks = publishedLinks(props.content.audiences)
</script>

<template>
  <div>
    <HeroCompactSection
      :title="content.title"
      :lead="content.lead"
      :action="primaryAction"
      :secondary-action="secondaryAction"
    >
      <template #top>
        <SiteBreadcrumbs :items="breadcrumbs" />
      </template>
    </HeroCompactSection>

    <TextSection :title="content.intro.title" :paragraphs="content.intro.paragraphs" :list="content.intro.list" />

    <EntryListSection
      v-if="examples.length"
      :title="content.examplesTitle"
      :entries="examples"
      background="subtle"
    />

    <ProcessSection
      :title="isService ? 'Så går en servicebeställning till' : 'Så går ett projekt till'"
      :steps="steps"
      eyebrow="Arbetsgång"
    />

    <TextSection
      v-if="content.coordination"
      :title="content.coordination.title"
      :paragraphs="content.coordination.paragraphs"
      :list="content.coordination.list"
      background="subtle"
    />

    <FaqSection :title="`Frågor om ${content.title.toLowerCase()}`" eyebrow="Vanliga frågor" :items="content.faq" />

    <UiSection v-if="relatedLinks.length || audienceLinks.length" background="subtle" spacing="compact">
      <div class="grid gap-10 md:grid-cols-2">
        <nav v-if="relatedLinks.length" aria-labelledby="relaterade-tjanster">
          <UiHeading id="relaterade-tjanster" :level="2" size="sm" class="mb-4">
            Relaterade tjänster
          </UiHeading>
          <ul class="space-y-2">
            <li v-for="link in relatedLinks" :key="link.href">
              <a :href="link.href" class="text-link font-semibold">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
        <nav v-if="audienceLinks.length" aria-labelledby="for-er-som-ar">
          <UiHeading id="for-er-som-ar" :level="2" size="sm" class="mb-4">
            Läs mer för er som är
          </UiHeading>
          <ul class="space-y-2">
            <li v-for="link in audienceLinks" :key="link.href">
              <a :href="link.href" class="text-link font-semibold">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </UiSection>

    <CtaSection
      :title="isService ? 'Behöver ni hjälp med ett servicearbete?' : 'Vill ni diskutera ett projekt?'"
      :text="isService
        ? 'Beskriv vad som behöver göras, var det ska utföras och när ni önskar att arbetet startar.'
        : 'Berätta om fastigheten och vad ni planerar, så går vi igenom förutsättningarna tillsammans.'"
      :primary-action="primaryAction"
      :secondary-action="secondaryAction"
    />
  </div>
</template>
