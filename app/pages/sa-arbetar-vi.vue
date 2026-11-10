<script setup lang="ts">
import { sitePages } from '#shared/site-structure'
import { boardControl } from '~/content/board-control'
import { companyDetails } from '~/content/company'
import { projectSteps, serviceSteps } from '~/content/processes'
import { staff } from '~/content/staff'
import type { FaqItem } from '~/types/content'

const faq: FaqItem[] = [
  {
    question: 'Vem är vår kontaktperson under ett projekt?',
    answer: 'Vid större projekt får ni en personlig projektledare som är er kontakt från första genomgång till överlämning.',
  },
  {
    question: 'Är önskad starttid en bekräftad tid?',
    answer: 'Nej. Ni kan ange när ni önskar att arbetet startar, men tiden är bekräftad först när arbetet är planerat och ni har fått besked om det.',
  },
  {
    question: 'Vad händer om arbetet visar sig vara större än vi trodde?',
    answer: 'Då säger vi det och beskriver vad som behöver göras. Ett servicearbete kan behöva hanteras som ett projekt, och dolda skador i ett projekt behöver beskrivas och godkännas av er innan de åtgärdas.',
  },
  {
    question: 'Hur informeras de boende?',
    answer: 'Hur och när boende informeras bestäms med styrelsen innan arbetet startar, så att det är tydligt vem som skickar vad.',
  },
]

usePageSeo({
  title: 'Så arbetar vi med service och renoveringsprojekt',
  description: 'Så går servicearbeten och renoveringsprojekt till hos BRF Entreprenad, och hur styrelsen behåller kontroll över omfattning, tidplan, information till boende och överlämning.',
  path: sitePages.process.path,
  jsonLd: faqJsonLd(faq),
})

const { actions } = useSiteNavigation()
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Arbetssätt"
      title="Så arbetar vi med föreningar och förvaltare"
      lead="Ett servicearbete och en renovering kräver olika arbetssätt. Här beskriver vi båda, och hur styrelsen behåller insyn och kontroll när arbetet är större."
      :action="actions.project"
      :secondary-action="actions.service"
    />

    <ProcessSection
      eyebrow="Planerade renoveringar"
      title="Från första samtal till överlämning"
      lead="Renoveringar och ombyggnader planeras som projekt med en personlig projektledare."
      :steps="projectSteps"
    />

    <BoardControlSection
      eyebrow="Styrelsens insyn"
      title="Så behåller styrelsen kontroll över projektet"
      lead="Det här är frågorna som behöver vara besvarade innan och under ett projekt. Projektledaren går igenom dem med er."
      :items="boardControl"
      background="subtle"
    />

    <ProcessSection
      eyebrow="Fastighetsservice"
      title="Från förfrågan till utfört arbete"
      lead="Reparationer och mindre arbeten har en kortare väg. Ni beskriver vad som behöver göras och får besked om när det kan utföras."
      :steps="serviceSteps"
    />

    <TextSection
      title="Helhetsansvar och personlig projektledning"
      background="subtle"
      :paragraphs="[
        'Som totalentreprenör ansvarar vi för både utförande och samordning av de yrkesgrupper som behövs. Ni har en part att vända er till.',
        'Vid större projekt får ni en personlig projektledare. Projektledaren tar fram tidplan, samordnar arbetet och håller er informerade, och är er kontakt genom hela projektet.',
      ]"
      :list="[
        'En part ansvarar för helheten',
        'En namngiven kontakt vid större projekt',
        'Tidplan och återkoppling under arbetet',
        'Avstämning om information till boende',
      ]"
    />

    <StaffSection
      v-if="staff.length"
      eyebrow="Personerna bakom"
      title="Projektledare och kontaktpersoner"
      :members="staff"
    />

    <FaqSection eyebrow="Vanliga frågor" title="Frågor om samarbetet" :items="faq" />

    <ContactSection
      title="Vill ni gå igenom ett kommande arbete?"
      lead="Berätta vad som behöver göras, så föreslår vi hur det kan läggas upp."
      :contact-details="companyDetails.filter(detail => detail.href)"
    />
  </div>
</template>
