<script setup lang="ts">
import { sitePages } from '#shared/site-structure'
import type { AudiencePageContent } from '~/types/content'

/** Mall för målgruppssidorna: behov, relevanta tjänster, samarbete och frågor. */
const props = defineProps<{
  path: string
  content: AudiencePageContent
}>()

usePageSeo({ title: props.content.metaTitle, description: props.content.metaDescription, path: props.path })

const { actions } = useSiteNavigation()
const primaryAction = actions[props.content.primaryAction]
const secondaryAction = actions[props.content.primaryAction === 'service' ? 'project' : 'service']
const services = publishedEntries(props.content.services)
</script>

<template>
  <div>
    <HeroCompactSection
      :eyebrow="content.eyebrow"
      :title="content.title"
      :lead="content.lead"
      :action="primaryAction"
      :secondary-action="secondaryAction"
    />

    <TextSection :title="content.needs.title" :paragraphs="content.needs.paragraphs" :list="content.needs.list" />

    <EntryListSection
      :title="content.servicesTitle"
      :lead="content.servicesLead"
      :entries="services"
      background="subtle"
    />

    <TextSection :title="content.collaboration.title" :paragraphs="content.collaboration.paragraphs" :list="content.collaboration.list">
      <p>
        <a :href="sitePages.process.path" class="text-link font-semibold">Så arbetar vi</a>
      </p>
    </TextSection>

    <FaqSection title="Vanliga frågor" :items="content.faq" />

    <CtaSection
      title="Berätta vad ni behöver hjälp med"
      text="Beskriv arbetet och var det ska utföras, så återkommer vi om nästa steg."
      :primary-action="primaryAction"
      :secondary-action="{ label: 'Alla tjänster', href: sitePages.services.path }"
    />
  </div>
</template>
