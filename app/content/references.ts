/**
 * Referensprojekt. Data och publiceringsregler finns i shared/ så att
 * sitemap.xml och förrenderingen använder samma källa:
 * - projekten: shared/content/references.ts
 * - regeln för vad som får visas: publishedCaseStudies() i shared/routes.ts
 */
import { caseStudyPath, publishedCaseStudies, publishedLocations } from '#shared/routes'
import type { CaseStudy } from '~/types/content'

export { caseStudyPath, publishedCaseStudies }

export function caseStudiesForService(path: string): CaseStudy[] {
  return publishedCaseStudies().filter(project => project.services.includes(path))
}

export function caseStudiesForLocation(slug: string): CaseStudy[] {
  return publishedCaseStudies().filter(project => project.locationSlug === slug)
}

/** Ortssidan projektet hör till, om den är publicerad. */
export function locationForCaseStudy(project: CaseStudy) {
  return project.locationSlug ? publishedLocations().find(location => location.slug === project.locationSlug) : undefined
}
