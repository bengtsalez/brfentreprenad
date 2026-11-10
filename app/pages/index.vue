<script setup lang="ts">
import { guidePath, publishedGuides } from '#shared/routes'
import { findPage, isPublished, priorityServices, sitePages } from '#shared/site-structure'
import { boardControl } from '~/content/board-control'
import { companyDetails, office, phone } from '~/content/company'
import { publishedCaseStudies } from '~/content/references'
import { servicePages } from '~/content/services'
import { staff } from '~/content/staff'
import type { ContactDetail, EntryItem, FaqItem, InquiryChoice } from '~/types/content'

/*
 * Startsida. Ordningen följer frågorna en styrelse har: kan ni hjälpa oss,
 * varför ska vi lita på er, hur fungerar samarbetet och vad händer om vi hör av oss.
 * Referenser visas först när verifierat underlag finns (app/content/references.ts).
 */

usePageSeo({
  title: 'Renovering och fastighetsservice för bostadsrättsföreningar',
  description: 'Fasadrenovering, balkongrenovering, dränering, porttelefoni och fastighetsservice för bostadsrättsföreningar från Halmstad till Falsterbo, med en projektledare som samordnar arbetet.',
  path: sitePages.home.path,
  organization: true,
})

const { actions } = useSiteNavigation()

const trustItems: ContactDetail[] = [
  { label: 'Verksamhetsområde', value: 'Halmstad till Falsterbo', href: isPublished(sitePages.serviceArea.path) ? sitePages.serviceArea.path : undefined },
  { label: 'Arbetssätt', value: 'Totalentreprenör med projektledare' },
  { label: 'Kontor', value: `${office.street}, ${office.city}` },
  { label: 'Telefon', value: phone.display, href: phone.href },
]

const choices: InquiryChoice[] = [
  {
    eyebrow: 'Planerad renovering',
    title: 'Föreningen planerar en renovering',
    description: 'För styrelser som står inför ett större arbete och behöver underlag, tidplan och en kontaktperson som håller ihop projektet.',
    examples: ['Fasadrenovering', 'Balkongrenovering', 'Dränering', 'Nytt passersystem i alla entréer'],
    next: 'En projektledare kontaktar er för att gå igenom fastigheten och vad ni planerar. Det förbinder er inte till något.',
    action: actions.project,
    link: { label: 'Så arbetar vi', href: sitePages.process.path },
  },
  {
    eyebrow: 'Fastighetsservice',
    title: 'Något behöver lagas eller åtgärdas',
    description: 'För konkreta reparationer och mindre arbeten som inte kräver ett eget projekt.',
    examples: ['En dörr som inte går i lås', 'Lösa plattor vid entrén', 'Skador i trapphuset', 'En porttelefon som slutat fungera'],
    next: 'Vi går igenom förfrågan, hör av oss om något behöver klargöras och ger besked om när arbetet kan utföras.',
    action: actions.service,
    link: { label: 'Om fastighetsservice', href: '/tjanster/fastighetsservice/' },
  },
]

// Prioriterade tjänster som rader, med det uppdraget kan omfatta som punkter.
const services: EntryItem[] = priorityServices
  .filter(service => isPublished(service.path))
  .map((service) => {
    const page = findPage(service.path)!
    const content = servicePages[service.path]
    return {
      title: page.title,
      description: content?.lead ?? page.summary,
      href: page.path,
      items: content?.scope?.items.map(item => item.title).slice(0, 4),
    }
  })

const references = publishedCaseStudies()

// Guider för styrelser. Sektionen visas bara när minst en guide är publicerad.
const guides: EntryItem[] = publishedGuides().map(guide => ({
  title: guide.title,
  description: guide.summary,
  href: guidePath(guide),
}))

const faq: FaqItem[] = [
  {
    question: 'Vilka tar ni uppdrag åt?',
    answer: 'Främst bostadsrättsföreningar och fastighetsförvaltare, men även fastighetsägare.',
  },
  {
    question: 'Var arbetar ni?',
    answer: 'Från Halmstad i norr till Falsterbo i söder. Kontoret ligger i Landskrona. Hör av er om ni är osäkra på om er fastighet ligger inom området.',
  },
  {
    question: 'Vad är skillnaden mellan service och projekt?',
    answer: 'Service är reparationer och mindre arbeten som går att beskriva direkt, till exempel en dörr som behöver justeras. Ett projekt är en planerad renovering som kräver underlag, beslut och samordning, till exempel en fasad- eller balkongrenovering. Är ni osäkra kan ni välja Vet inte ännu i formuläret.',
  },
  {
    question: 'Vad innebär helhetsansvar?',
    answer: 'Som totalentreprenör ansvarar vi för både utförande och samordning. Ni har en part att vända er till och vid större projekt en personlig projektledare.',
  },
  {
    question: 'Förbinder en förfrågan oss till något?',
    answer: 'Nej. En förfrågan är inte en beställning. Ni bestämmer om ni vill gå vidare när ni har fått besked om vad arbetet omfattar.',
  },
  {
    question: 'Behöver vi skapa ett konto?',
    answer: 'Nej. Ni skickar en förfrågan via formuläret eller ringer oss.',
  },
]
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Från Halmstad till Falsterbo"
      title="Renovering och fastighetsservice för bostadsrättsföreningar"
      lead="Vi hjälper föreningar och förvaltare med allt från reparationer i trapphus och entréer till fasad-, balkong- och dräneringsprojekt. Ni har en kontaktperson som samordnar arbetet och håller styrelsen informerad."
      :action="actions.project"
      :secondary-action="actions.service"
      background-video="/brfentreprenad-banner-video.mp4"
      background-poster="/images/hero-video-poster.jpg"
    >
      <template #aside>
        <div class="rounded-card border border-line bg-surface p-6 sm:p-8">
          <h2 class="heading-xs">
            Vad händer när ni hör av er?
          </h2>
          <dl class="mt-5 space-y-5">
            <div class="space-y-1 border-t border-line pt-5">
              <dt class="font-semibold">
                {{ actions.project.label }}
              </dt>
              <dd class="text-sm text-ink-muted">
                Ni beskriver kort vad föreningen planerar. En projektledare kontaktar er för att gå igenom fastigheten och förutsättningarna.
              </dd>
            </div>
            <div class="space-y-1 border-t border-line pt-5">
              <dt class="font-semibold">
                {{ actions.service.label }}
              </dt>
              <dd class="text-sm text-ink-muted">
                Ni beskriver vad som behöver åtgärdas. Vi hör av oss om något behöver klargöras och ger besked om när arbetet kan utföras. Förfrågan är inte en bokning.
              </dd>
            </div>
          </dl>
        </div>
      </template>
    </HeroCompactSection>

    <TrustSection :items="trustItems" label="Kort om BRF Entreprenad" />

    <InquiryChoiceSection
      eyebrow="Service eller renovering"
      title="Två vägar in, beroende på vad ni behöver"
      lead="Ett mindre arbete och en planerad renovering kräver olika underlag. Välj den väg som passar, eller hör av er om ni är osäkra."
      :choices="choices"
    />

    <EntryListSection
      eyebrow="Tjänster"
      title="Det föreningar oftast frågar efter"
      lead="Varje tjänst beskriver vanliga behov, vad uppdraget kan omfatta, vad som påverkar kostnaden och hur boende berörs."
      :entries="services"
      background="subtle"
    >
      <UiButton :href="sitePages.services.path" variant="text" arrow class="mt-8">
        Alla tjänster
      </UiButton>
    </EntryListSection>

    <CaseStudySection
      eyebrow="Referenser"
      title="Genomförda projekt"
      :projects="references"
    />

    <BoardControlSection
      eyebrow="Samarbete"
      title="Så behåller styrelsen kontroll över projektet"
      lead="Ett renoveringsprojekt kräver beslut, insyn och tydliga besked. Det här är frågorna som behöver vara besvarade, och som projektledaren går igenom med er."
      :items="boardControl"
    >
      <p>
        <a :href="sitePages.process.path" class="text-link font-semibold">Läs mer om hur vi arbetar</a>
      </p>
    </BoardControlSection>

    <EntryListSection
      v-if="guides.length"
      eyebrow="Kunskap"
      title="Guider för styrelser"
      lead="Kortfattade underlag för styrelser som planerar en renovering, med beslutspunkter och källor."
      :entries="guides"
    >
      <UiButton :href="sitePages.knowledge.path" variant="text" arrow class="mt-8">
        Alla guider
      </UiButton>
    </EntryListSection>

    <StaffSection
      v-if="staff.length"
      eyebrow="Personerna bakom"
      title="Ni når oss direkt"
      lead="Vid ett projekt är en av projektledarna er kontaktperson genom hela arbetet."
      :members="staff"
      background="subtle"
    />

    <FaqSection eyebrow="Vanliga frågor" title="Frågor och svar" :items="faq" />

    <ContactSection
      eyebrow="Kontakt"
      title="Berätta vad ni behöver hjälp med"
      lead="Välj om det gäller ett servicearbete eller ett planerat projekt. Ni behöver inte ha ett färdigt underlag."
      :contact-details="companyDetails.filter(detail => detail.href)"
    />
  </div>
</template>
