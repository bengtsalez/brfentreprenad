/**
 * Referensprojekt från avsnitt 6 i UNDERLAG.md. Bilder läggs i
 * public/images/referenser/. Ett projekt visas bara om det har minst en bild
 * med användningsrätt. Nya projekt läggs till sist i listan.
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

export const caseStudies: CaseStudy[] = [
  {
    slug: 'balkongrenovering-landskrona',
    title: 'Balkongrenovering i Landskrona',
    location: 'Landskrona',
    client: 'Brinova AB',
    clientPublishable: false,
    propertyType: 'Flerbostadshus med 20 balkonger, byggt 1948',
    assignment: 'Balkongrenovering som totalentreprenad',
    services: ['/tjanster/fasad-balkong-och-tak/balkongrenovering/'],
    inquiryService: 'balkongrenovering',
    year: '2026',
    performedBy: 'Byggproffs Skåne AB',
    role: 'Totalentreprenör',
    startingPoint: 'Vid en översyn av fastigheterna konstaterades att balkongerna hade nått slutet av sin livslängd, både utseendemässigt och konstruktivt.',
    scope: [
      'Reparation av skadade balkonger',
      'Rivning av de mest skadade balkongerna',
      'Förstärkning och gjutning av nya balkongplattor',
      'Borttagning av rostskadade stålbalkar',
      'Nytt ytskikt på balkonggolven',
    ],
    execution: 'Arbetet genomfördes etappvis, en fastighet i taget.',
    // Förslag, ej bekräftat i UNDERLAG.md.
    result: 'Balkongerna är reparerade och de som inte gick att laga är rivna, förstärkta och nygjutna.',
    images: [
      { src: '/images/referenser/balkong-landskrona-1.jpg', alt: 'Hantverkare målar ett nytt ytskikt på ett balkonggolv bakom byggställningen', width: 1080, height: 1080 },
      { src: '/images/referenser/balkong-landskrona-2.jpg', alt: 'Hantverkare knackar bort betong från en rostskadad stålbalk under en balkong', width: 1080, height: 1080 },
    ],
  },
]

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
