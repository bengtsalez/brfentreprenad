<script setup lang="ts">
import { sitePages } from '#shared/site-structure'
import { office, officeAddress } from '~/content/company'
import { staff } from '~/content/staff'
import type { BenefitItem } from '~/types/content'

usePageSeo({
  title: 'Om BRF Entreprenad',
  description: 'BRF Entreprenad är totalentreprenör för bostadsrättsföreningar, fastighetsförvaltare och fastighetsägare från Halmstad till Falsterbo.',
  path: sitePages.about.path,
})

const { actions } = useSiteNavigation()

const benefits: BenefitItem[] = [
  {
    title: 'Helhetsansvar',
    description: 'Vi ansvarar för både utförande och samordning, så att ni har en part att vända er till.',
  },
  {
    title: 'Personlig projektledning',
    description: 'Vid större projekt har ni en projektledare som är er kontakt från start till färdigt arbete.',
  },
  {
    title: 'Service och projekt hålls isär',
    description: 'Mindre arbeten skickas som en serviceförfrågan. Planerade renoveringar hanteras som projekt med underlag och projektledare.',
  },
  {
    title: 'Från Halmstad till Falsterbo',
    description: 'Vi tar uppdrag i området från Halmstad i norr till Falsterbo i söder.',
  },
]
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Om oss"
      title="Om BRF Entreprenad"
      lead="Totalentreprenör för bostadsrättsföreningar, fastighetsförvaltare och fastighetsägare från Halmstad till Falsterbo."
    />

    <TextSection
      title="Service och renovering under ett ansvar"
      :paragraphs="[
        'Vi arbetar brett inom bygg, från konkreta servicearbeten till större renoveringar. Samma part kan därför hantera både den enskilda reparationen och det större projektet.',
        'Som totalentreprenör tar vi helhetsansvar för uppdraget. Vid större projekt får ni en personlig projektledare som samordnar arbetet och håller er informerade.',
      ]"
    >
      <p>
        <a :href="sitePages.services.path" class="text-link font-semibold">Se våra tjänster</a>
      </p>
    </TextSection>

    <BenefitsSection title="Det här kan ni förvänta er" :benefits="benefits" />

    <StaffSection
      v-if="staff.length"
      eyebrow="Personerna bakom"
      title="Vilka vi är"
      :members="staff"
      background="subtle"
    />

    <TextSection
      eyebrow="Kontor"
      :title="`Vårt kontor i ${office.city}`"
      :paragraphs="[`Vårt kontor ligger på ${officeAddress}. Därifrån tar vi uppdrag i området från Halmstad i norr till Falsterbo i söder.`]"
    >
      <p>
        <a :href="sitePages.contact.path" class="text-link font-semibold">Kontakta oss</a>
      </p>
    </TextSection>

    <CtaSection
      title="Vill ni veta mer?"
      text="Berätta om er fastighet och vad ni behöver hjälp med."
      :primary-action="actions.project"
      :secondary-action="actions.service"
    />
  </div>
</template>
