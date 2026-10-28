<script setup lang="ts">
import { serviceAreas, sitePages } from '#shared/site-structure'
import { bookingSteps, projectSteps, statusCaption, statusExamples } from '~/content/processes'
import type { EntryItem, FaqItem } from '~/types/content'

/*
 * Startsida. Sektionsordningen följer avsnitt 7 i underlaget.
 * Referensprojekt och kundomdömen visas först när verifierat underlag finns.
 */

usePageSeo({
  title: 'Byggservice och entreprenad för fastigheter',
  description: 'Byggservice och entreprenad för bostadsrättsföreningar, fastighetsägare och förvaltare. Från enskilda reparationer till större renoveringar, från Halmstad till Falsterbo.',
  path: sitePages.home.path,
})

const { actions, hasBooking } = useSiteNavigation()

const services = publishedEntries(serviceAreas.map(area => area.path))

const audiences: EntryItem[] = [
  {
    title: 'Bostadsrättsföreningar',
    description: 'Stöd för styrelsen vid servicebeställningar, renoveringar och större projekt.',
    href: sitePages.housingAssociations.path,
  },
  {
    title: 'Fastighetsförvaltare',
    description: 'Servicebeställningar på flera adresser, med status för varje ärende.',
    href: sitePages.propertyManagers.path,
  },
  {
    title: 'Fastighetsägare',
    description: 'Underhåll och renovering av en eller flera fastigheter.',
    href: sitePages.propertyOwners.path,
  },
]

const faq: FaqItem[] = [
  {
    question: 'Vilka tar ni uppdrag åt?',
    answer: 'Bostadsrättsföreningar, fastighetsförvaltare och fastighetsägare.',
  },
  {
    question: 'Var arbetar ni?',
    answer: 'Från Halmstad i norr till Falsterbo i söder.',
  },
  {
    question: 'Tar ni även mindre arbeten?',
    answer: 'Ja. Reparationer och mindre arbeten beställs som service. Större renoveringar hanteras som projekt.',
  },
  {
    question: 'Vad innebär helhetsansvar?',
    answer: 'Som totalentreprenör ansvarar vi för både utförande och samordning. Ni har en part att vända er till och vid större projekt en personlig projektledare.',
  },
  {
    question: 'Hur följer vi en servicebeställning?',
    answer: 'Varje beställning har en status i ert konto, till exempel "Inväntar material" eller "Inplanerat vecka 46, 2026".',
  },
]
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Från Halmstad till Falsterbo"
      title="Byggservice och entreprenad för bostadsrättsföreningar, fastighetsägare och förvaltare"
      lead="Från enskilda reparationer till större renoveringar. Vi tar helhetsansvar med personlig projektledning från Halmstad till Falsterbo."
      :action="actions.service"
      :secondary-action="actions.project"
      :highlights="['Helhetsansvar', 'Personlig projektledare', 'Status för varje beställning']"
    />

    <TextSection
      eyebrow="Helhetsansvar"
      title="En part som håller ihop arbetet"
      :paragraphs="[
        'Som totalentreprenör ansvarar vi för både utförande och samordning. Det gäller oavsett om uppdraget är en enskild reparation eller en renovering som berör hela fastigheten.',
        'Vid större projekt får ni en personlig projektledare som planerar, samordnar och håller er informerade från första genomgång till färdigt arbete.',
      ]"
    >
      <p>
        <a :href="sitePages.about.path" class="text-link font-semibold">Om BRF Entreprenad</a>
      </p>
    </TextSection>

    <EntryListSection
      eyebrow="Tjänster"
      title="Från servicearbeten till större renoveringar"
      lead="Tjänsterna är grupperade efter område. Varje område beskriver vad som ingår och hur det beställs."
      :entries="services"
      background="subtle"
    />

    <BookingIntroSection
      eyebrow="Servicebokning"
      title="Beställ service och följ arbetet"
      lead="Mindre arbeten beställs direkt, utan ett eget projekt. Ni anger vad som behöver göras och ser sedan var arbetet står."
      :steps="bookingSteps"
      :status-examples="statusExamples"
      :status-caption="statusCaption"
      :action="actions.service"
      :secondary-action="{ label: 'Så fungerar servicebokningen', href: sitePages.bookingGuide.path }"
      :note="hasBooking ? undefined : 'Servicebeställningar tas just nu emot via kontaktformuläret.'"
    />

    <EntryPointsSection
      eyebrow="För er"
      title="Vem vi arbetar för"
      :entries="audiences"
      background="default"
    />

    <ProcessSection
      eyebrow="Så arbetar vi"
      title="Från behov till färdigt arbete"
      lead="Så går ett större projekt till. Servicearbeten har en kortare väg från beställning till utförande."
      :steps="projectSteps"
    />

    <TextSection
      eyebrow="Verksamhetsområde"
      title="Från Halmstad till Falsterbo"
      :paragraphs="['Vi tar uppdrag i området från Halmstad i norr till Falsterbo i söder, både i enskilda fastigheter och i flera fastigheter hos samma beställare.']"
      background="subtle"
    />

    <FaqSection eyebrow="Vanliga frågor" title="Frågor och svar" :items="faq" />

    <CtaSection
      title="Berätta vad ni behöver hjälp med"
      text="Beskriv arbetet och var det ska utföras. För större projekt går vi igenom förutsättningarna tillsammans."
      :primary-action="actions.project"
      :secondary-action="actions.service.href === actions.project.href ? undefined : actions.service"
    />
  </div>
</template>
