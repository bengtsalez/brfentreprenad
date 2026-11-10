<script setup lang="ts">
import { guidePath, locationPath, publishedGuides } from '#shared/routes'
import { findPage, sitePages } from '#shared/site-structure'
import { inquiryHref } from '~/content/inquiry'
import { caseStudyPath, locationForCaseStudy } from '~/content/references'
import type { CaseStudy, LinkItem } from '~/types/content'

/** Projektsida för ett referensprojekt. */
const props = defineProps<{
  project: CaseStudy
}>()

const path = caseStudyPath(props.project)

const [heroImage, ...galleryImages] = props.project.images

// Ortsnamnet läggs bara till om det inte redan finns i projektets titel.
const seoTitle = props.project.title.includes(props.project.location)
  ? `${props.project.title}: referensprojekt`
  : `${props.project.title} i ${props.project.location}`

/** Kortar beskrivningen vid ett ordslut, så att den inte klipps mitt i ett ord. */
function shorten(text: string, max = 160): string {
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(' ', max - 1))} …`
}

usePageSeo({
  title: seoTitle,
  description: shorten(`${props.project.assignment} i ${props.project.location}. ${props.project.startingPoint}`),
  path,
  image: heroImage,
})

const breadcrumbs: LinkItem[] = [
  { label: 'Startsida', href: sitePages.home.path },
  { label: sitePages.references.title, href: sitePages.references.path },
  { label: props.project.title, href: path },
]

const facts = computed(() => [
  { label: 'Ort', value: props.project.location },
  ...(props.project.clientPublishable && props.project.client ? [{ label: 'Beställare', value: props.project.client }] : []),
  { label: 'Fastighet', value: props.project.propertyType },
  { label: 'Uppdrag', value: props.project.assignment },
  { label: 'Utfört av', value: props.project.performedBy },
  { label: 'Roll', value: props.project.role },
  ...(props.project.year ? [{ label: 'År', value: props.project.year }] : []),
])

const serviceLinks = publishedLinks(props.project.services)
const similarAction = { label: 'Diskutera ett liknande projekt', href: inquiryHref('projekt', props.project.inquiryService) }

// Ortssida och guider visas bara när de är publicerade.
const location = locationForCaseStudy(props.project)
const readMore: LinkItem[] = [
  ...serviceLinks,
  ...(location ? [{ label: `Vi i ${location.name}`, href: locationPath(location) }] : []),
  ...publishedGuides()
    .filter(guide => guide.services.some(service => props.project.services.includes(service)))
    .map(guide => ({ label: guide.title, href: guidePath(guide) })),
]
const serviceTitle = findPage(props.project.services[0] ?? '')?.title
</script>

<template>
  <div>
    <HeroCompactSection
      :eyebrow="serviceTitle ?? 'Referensprojekt'"
      :title="project.title"
      :lead="project.startingPoint"
      :action="similarAction"
    >
      <template #top>
        <SiteBreadcrumbs :items="breadcrumbs" />
      </template>
    </HeroCompactSection>

    <UiSection v-if="heroImage" spacing="compact">
      <img
        :src="heroImage.src"
        :alt="heroImage.alt"
        :width="heroImage.width"
        :height="heroImage.height"
        fetchpriority="high"
        class="aspect-[16/9] w-full rounded-card object-cover"
      >
    </UiSection>

    <UiSection spacing="compact">
      <div class="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <dl class="space-y-4 border-t-2 border-ink pt-6 lg:self-start">
          <div v-for="fact in facts" :key="fact.label">
            <dt class="text-sm text-ink-muted">
              {{ fact.label }}
            </dt>
            <dd class="font-semibold">
              {{ fact.value }}
            </dd>
          </div>
        </dl>
        <div class="max-w-prose space-y-10">
          <div class="space-y-3">
            <UiHeading :level="2" size="md">
              Omfattning
            </UiHeading>
            <ul class="space-y-2">
              <li v-for="item in project.scope" :key="item" class="flex items-start gap-3">
                <UiIcon name="check" class="mt-1 text-accent" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="space-y-3">
            <UiHeading :level="2" size="md">
              Genomförande
            </UiHeading>
            <p class="text-ink-muted">
              {{ project.execution }}
            </p>
          </div>
          <div class="space-y-3">
            <UiHeading :level="2" size="md">
              Resultat
            </UiHeading>
            <p class="text-ink-muted">
              {{ project.result }}
            </p>
          </div>
          <figure v-if="project.testimonial?.approved" class="border-l-4 border-accent pl-6">
            <blockquote class="heading-sm">
              ”{{ project.testimonial.quote }}”
            </blockquote>
            <figcaption class="mt-3 text-sm text-ink-muted">
              {{ project.testimonial.name }}, {{ project.testimonial.role }}
            </figcaption>
          </figure>
        </div>
      </div>
    </UiSection>

    <UiSection v-if="galleryImages.length" spacing="compact">
      <ul class="grid gap-6 sm:grid-cols-2">
        <li v-for="image in galleryImages" :key="image.src">
          <img
            :src="image.src"
            :alt="image.alt"
            :width="image.width"
            :height="image.height"
            loading="lazy"
            decoding="async"
            class="aspect-[3/2] w-full rounded-card object-cover"
          >
        </li>
      </ul>
    </UiSection>

    <UiSection v-if="readMore.length" spacing="compact">
      <nav aria-labelledby="las-vidare">
        <UiHeading id="las-vidare" :level="2" size="sm" class="mb-4">
          Läs vidare
        </UiHeading>
        <ul class="space-y-1">
          <li v-for="link in readMore" :key="link.href">
            <a :href="link.href" class="text-link inline-flex min-h-11 items-center font-semibold">{{ link.label }}</a>
          </li>
        </ul>
      </nav>
    </UiSection>

    <CtaSection
      title="Planerar ni ett liknande projekt?"
      text="Berätta om fastigheten och vad ni planerar, så kontaktar en projektledare er för att gå igenom förutsättningarna."
      :primary-action="similarAction"
      :secondary-action="serviceLinks[0]"
    />
  </div>
</template>
