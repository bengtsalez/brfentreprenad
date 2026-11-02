/**
 * Referensprojekt. Listan är tom tills det finns verkligt underlag:
 * beskrivning, bilder med användningsrätt och beställarens godkännande.
 * Sektioner och sidor för referenser visas bara när listan har innehåll
 * och sidan /referensprojekt/ har status "published" i shared/site-structure.ts.
 *
 * Projekt som utförts av ett annat bolag (t.ex. Byggproffs Skåne) får bara
 * användas om `performedBy` anger det bolaget och relationen mellan bolagen
 * är bekräftad. Se LAUNCH_CHECKLIST.md.
 *
 * Exempel på struktur (påhittat, publicera inte):
 * {
 *   slug: 'fasadrenovering-exempelgatan',
 *   title: 'Fasadrenovering på Exempelgatan',
 *   location: 'Ort',
 *   client: 'Brf Exempel',
 *   clientPublishable: false,
 *   propertyType: 'Flerbostadshus, 32 lägenheter',
 *   assignment: 'Fasadrenovering',
 *   services: ['/tjanster/fasad-balkong-och-tak/fasadrenovering/'],
 *   inquiryService: 'fasadrenovering',
 *   year: '2025',
 *   performedBy: 'BRF Entreprenad',
 *   role: 'Totalentreprenör',
 *   startingPoint: 'Hur fasaden såg ut och varför föreningen behövde göra något.',
 *   scope: ['Omputsning av gatufasad', 'Byte av fönsterbleck'],
 *   execution: 'Hur arbetet planerades och genomfördes.',
 *   result: 'Vad som blev klart.',
 *   images: [{ src: '/images/referenser/exempel-1.webp', alt: 'Gatufasaden efter omputsning, sedd från gatan', width: 1600, height: 1067 }],
 *   testimonial: { quote: '…', name: 'Namn', role: 'Ordförande', approved: false },
 * }
 */
import { isPublished, sitePages } from '#shared/site-structure'
import type { CaseStudy } from '~/types/content'

export const caseStudies: CaseStudy[] = []

/** Referenser som får visas: sidan är publicerad och projektet har bilder. */
export function publishedCaseStudies(): CaseStudy[] {
  if (!isPublished(sitePages.references.path)) return []
  return caseStudies.filter(project => project.images.length > 0)
}

export function caseStudiesForService(path: string): CaseStudy[] {
  return publishedCaseStudies().filter(project => project.services.includes(path))
}

export function caseStudyPath(project: CaseStudy): string {
  return `${sitePages.references.path}${project.slug}/`
}
