<script setup lang="ts">
import { findPage, sitePages } from '#shared/site-structure'
import { inquiryHref } from '~/content/inquiry'
import { caseStudyPath } from '~/content/references'
import type { CaseStudy, LinkItem } from '~/types/content'

/** Projektsida för ett referensprojekt. */
const props = defineProps<{
  project: CaseStudy
}>()

const path = caseStudyPath(props.project)

usePageSeo({
  title: `${props.project.title}, ${props.project.location}`,
  description: `${props.project.assignment} i ${props.project.location}. ${props.project.startingPoint}`.slice(0, 160),
  path,
  image: props.project.images[0]?.src,
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
const [heroImage, ...galleryImages] = props.project.images
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

    <CtaSection
      title="Planerar ni ett liknande projekt?"
      text="Berätta om fastigheten och vad ni planerar, så kontaktar en projektledare er för att gå igenom förutsättningarna."
      :primary-action="similarAction"
      :secondary-action="serviceLinks[0]"
    />
  </div>
</template>
