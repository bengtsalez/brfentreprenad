/**
 * Referensprojekt från avsnitt 6 i UNDERLAG.md. Bilder läggs i
 * public/images/referenser/. Ett projekt visas bara om det har status
 * "published" och minst en bild med användningsrätt. Nya projekt läggs till
 * sist i listan. Publiceringsregeln finns i shared/routes.ts och styr
 * sektioner, länkar, förrendering och sitemap.xml.
 *
 * Projekt som utförts av ett annat bolag får bara användas om `performedBy`
 * anger det bolaget och relationen är bekräftad. BRF Entreprenad är ett
 * varumärke inom Byggproffs Skåne AB (UNDERLAG.md, avsnitt 5).
 *
 * Exempel på struktur (påhittat, publicera inte):
 * {
 *   slug: 'fasadrenovering-exempelgatan',
 *   status: 'draft',
 *   title: 'Fasadrenovering på Exempelgatan',
 *   location: 'Ort',
 *   locationSlug: 'ort',
 *   client: 'Brf Exempel',
 *   clientPublishable: false,
 *   propertyType: 'Flerbostadshus, 32 lägenheter',
 *   assignment: 'Fasadrenovering',
 *   services: ['/tjanster/fasad-balkong-och-tak/fasadrenovering/'],
 *   inquiryService: 'fasadrenovering',
 *   year: '2025',
 *   performedBy: 'Byggproffs Skåne AB',
 *   role: 'Totalentreprenör',
 *   startingPoint: 'Hur fasaden såg ut och varför föreningen behövde göra något.',
 *   scope: ['Omputsning av gatufasad', 'Byte av fönsterbleck'],
 *   execution: 'Hur arbetet planerades och genomfördes.',
 *   result: 'Vad som blev klart.',
 *   images: [{ src: '/images/referenser/exempel-1.webp', alt: 'Gatufasaden efter omputsning, sedd från gatan', width: 1600, height: 1067 }],
 *   testimonial: { quote: '…', name: 'Namn', role: 'Ordförande', approved: false },
 * }
 */
import type { CaseStudy } from './types.ts'

export const caseStudies: CaseStudy[] = [
  {
    slug: 'balkongrenovering-landskrona',
    status: 'published',
    title: 'Balkongrenovering i Landskrona',
    location: 'Landskrona',
    locationSlug: 'landskrona',
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
