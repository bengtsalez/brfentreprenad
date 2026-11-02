<script setup lang="ts">
import { findPage, isPublished, priorityServices, sitePages } from '#shared/site-structure'
import { companyDetails } from '~/content/company'
import { servicePages } from '~/content/services'
import type { EntryItem, LinkItem } from '~/types/content'

usePageSeo({
  title: 'Tjänster för bostadsrättsföreningar',
  description: 'Fasadrenovering, balkongrenovering, dränering, porttelefoni, fastighetsservice och andra renoveringar för bostadsrättsföreningar och förvaltare från Halmstad till Falsterbo.',
  path: sitePages.services.path,
})

const { actions } = useSiteNavigation()

const breadcrumbs: LinkItem[] = [
  { label: 'Startsida', href: sitePages.home.path },
  { label: 'Tjänster', href: sitePages.services.path },
]

/**
 * Rad för en tjänstesida. Prioriterade sidor visar vad uppdraget kan omfatta,
 * tjänsteområden visar sina undertjänster.
 */
function entries(paths: string[]): EntryItem[] {
  return paths.filter(isPublished).map((path) => {
    const page = findPage(path)!
    const scope = servicePages[path]?.scope
    if (!scope) return publishedEntries([path])[0]!
    return { title: page.title, description: page.summary, href: page.path, items: scope.items.map(item => item.title) }
  })
}

const projectPaths = [
  ...priorityServices.filter(service => service.kind === 'project').map(service => service.path),
  '/tjanster/fasad-balkong-och-tak/',
  '/tjanster/mark-grund-och-utemiljo/',
  '/tjanster/invandig-renovering/',
  '/tjanster/fonster-och-dorrar/',
  '/tjanster/totalentreprenad/',
]

const servicePaths = [
  ...priorityServices.filter(service => service.kind === 'service').map(service => service.path),
  '/tjanster/portar-las-och-passage/',
]

const projects = entries(projectPaths)
const services = entries(servicePaths)
</script>

<template>
  <div>
    <HeroCompactSection
      title="Tjänster för bostadsrättsföreningar och förvaltare"
      lead="Planerade renoveringar och fastighetsservice från Halmstad till Falsterbo. Tjänsterna är uppdelade efter om arbetet är ett projekt som kräver underlag och beslut, eller ett mindre arbete som kan åtgärdas direkt."
      :action="actions.project"
      :secondary-action="actions.service"
    >
      <template #top>
        <SiteBreadcrumbs :items="breadcrumbs" />
      </template>
    </HeroCompactSection>

    <EntryListSection
      eyebrow="Projekt"
      title="Planerade renoveringar"
      lead="Arbeten som berör många boende, kräver flera yrkesgrupper eller behöver beslutas av styrelsen eller stämman. Ni får ett underlag och en personlig projektledare."
      :entries="projects"
    />

    <EntryListSection
      eyebrow="Service"
      title="Fastighetsservice och mindre arbeten"
      lead="Reparationer och avgränsade arbeten som går att beskriva direkt. Ni skickar en serviceförfrågan och får besked om när arbetet kan utföras."
      :entries="services"
      background="subtle"
    />

    <TextSection
      title="Osäkra på om det är service eller projekt?"
      :paragraphs="[
        'Det behöver ni inte veta i förväg. Välj Vet inte ännu i formuläret och beskriv vad ni ser, till exempel sprickor i fasaden eller fukt i källaren.',
        'Visar det sig att ett servicearbete är större än det först såg ut, säger vi det och föreslår hur det kan hanteras som projekt.',
      ]"
    >
      <p>
        <a :href="sitePages.process.path" class="text-link font-semibold">Så arbetar vi</a>
      </p>
    </TextSection>

    <ContactSection
      title="Berätta vad ni behöver hjälp med"
      lead="Välj om det gäller ett servicearbete eller ett planerat projekt."
      :contact-details="companyDetails.filter(detail => detail.href)"
    />
  </div>
</template>
