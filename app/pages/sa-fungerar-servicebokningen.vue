<script setup lang="ts">
import { bookingStatuses, isPublished, sitePages } from '#shared/site-structure'
import { bookingSteps, statusCaption, statusExamples } from '~/content/processes'
import type { FaqItem } from '~/types/content'

// Sidan beskriver bokningstjänstens konto och publiceras först när tjänsten finns.
if (!isPublished(sitePages.bookingGuide.path)) {
  throw createError({ statusCode: 404, statusMessage: 'Sidan finns inte', fatal: true })
}

usePageSeo({
  title: 'Så fungerar servicebokningen',
  description: 'Beställ servicearbeten med adress, behov och önskad starttid, och följ status för arbetet i ert konto.',
  path: sitePages.bookingGuide.path,
})

const { actions, hasBooking } = useSiteNavigation()

// Bara statusar som beställaren har bekräftat beskrivs publikt.
const confirmedStatuses = bookingStatuses
  .filter(status => status.confirmed)
  .map(status => `${status.label}: ${status.description.charAt(0).toLowerCase()}${status.description.slice(1)}`)

const faq: FaqItem[] = [
  {
    question: 'Vilka arbeten passar för servicebokningen?',
    answer: 'Reparationer och mindre arbeten som kan beskrivas i en beställning, till exempel byte av ett fönster. Arbeten som berör många boende eller kräver flera yrkesgrupper hanteras som projekt.',
  },
  {
    question: 'Är önskad starttid en bekräftad tid?',
    answer: 'Nej. Önskad starttid är ert önskemål. Planerad tid sätts efter genomgång och visas i ärendets status.',
  },
  {
    question: 'Hur lämnar vi information om tillträde?',
    answer: 'Ange vem som kan ge tillträde. Skriv inte portkoder eller andra koder i beställningen.',
  },
]
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Servicebokning"
      title="Så fungerar servicebokningen"
      lead="Beställ servicearbeten genom att ange adress, behov och önskad starttid. Sedan följer ni arbetets status i ert konto."
    />

    <BookingIntroSection
      title="Tre steg från behov till planerat arbete"
      :steps="bookingSteps"
      :status-examples="statusExamples"
      :status-caption="statusCaption"
      :action="actions.service"
      :note="hasBooking ? undefined : 'Servicebeställningar tas just nu emot via kontaktformuläret.'"
    />

    <TextSection
      title="Önskad starttid är inte bekräftad planering"
      :paragraphs="[
        'Den starttid ni anger är ett önskemål. Efter genomgång planeras arbetet in, och den planerade tiden visas i ärendets status med vecka och år, till exempel vecka 46, 2026.',
        'Om något behöver klargöras innan arbetet kan planeras, till exempel tillträde eller material, återkommer vi till er.',
      ]"
    />

    <TextSection
      title="Status för varje ärende"
      background="subtle"
      :paragraphs="['I kontot ser ni de arbeten ni har beställt och var de står. Två exempel på status:']"
      :list="confirmedStatuses"
    />

    <TextSection
      title="Service eller projekt?"
      :paragraphs="[
        'Servicebokningen är till för reparationer och mindre arbeten. Ska samma arbete göras i hela fastigheten, till exempel fönsterbyten i alla lägenheter, blir det ett projekt med en personlig projektledare.',
      ]"
    >
      <p>
        <a :href="sitePages.process.path" class="text-link font-semibold">Så arbetar vi med större projekt</a>
      </p>
    </TextSection>

    <FaqSection title="Frågor om servicebokningen" :items="faq" />

    <CtaSection
      title="Har ni ett servicearbete att beställa?"
      text="Ange adress, vad som behöver göras och när ni önskar att arbetet startar."
      :primary-action="actions.service"
      :secondary-action="actions.service.href === actions.project.href ? undefined : actions.project"
    />
  </div>
</template>
