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
  {
    slug: 'Dranering-och-markarbeten-Landskrona',
    status: 'published',
    title: 'Dränering och markarbeten i Landskrona',
    location: 'Landskrona',
    locationSlug: 'landskrona',
    client: 'HSB Helgebröten',
    clientPublishable: false,
    propertyType: 'Flerbostadshus',
    assignment: 'Dränering och markarbeten',
    services: ['/tjanster/mark-grund-och-utemiljo/dranering-och-markarbeten/'],
    inquiryService: 'dränering-och-markarbeten',
    year: '2026',
    performedBy: 'Byggproffs Skåne AB',
    role: 'Totalentreprenör',
    startingPoint: 'Vid en översyn av fastigheterna konstaterades att dräneringen var otillräcklig och att marken runt husen behövde åtgärdas för att förhindra fuktskador.',
    scope: [
      'Förstärkning och montering av nya dräneringar',
      'Ny asfaltering av uppfarter och gångvägar',
      'Separering av spill & dagvatten från fastigheterna',
    ],
    execution: 'Arbetet genomfördes med minimal störning för de boende, med tydlig kommunikation och planering.',
    // Förslag, ej bekräftat i UNDERLAG.md.
    result: 'Dräneringen förbättrar källarmiljön och markarbetena har skapat en mer funktionell och estetiskt tilltalande utemiljö.',
    images: [
      { src: '/images/referenser/dranering-landskrona-1.jpg', alt: 'Hantverkare målar ett nytt ytskikt på ett dräneringssystem bakom byggställningen', width: 1080, height: 1080 },
      { src: '/images/referenser/dranering-landskrona-2.jpg', alt: 'Hantverkare knackar bort betong från en rostskadad stålbalk under en dränering', width: 1080, height: 1080 },
    ],
  },

  {
    slug: 'Separering-dagvatten-Landskrona',
    status: 'published',
    title: 'Separering av dagvatten i Landskrona',
    location: 'Landskrona',
    locationSlug: 'landskrona',
    client: 'HSB Landskrona',
    clientPublishable: false,
    propertyType: 'Flerbostadshus',
    assignment: 'Separering av dag- och spillvatten',
    services: ['/tjanster/mark-grund-och-utemiljo/dranering-och-markarbeten/'],
    inquiryService: 'separering-av-dagvatten',
    year: '2026',
    performedBy: 'Byggproffs Skåne AB',
    role: 'Totalentreprenör',
    startingPoint: 'Efter ett föreläggande från NSVA behövde fastigheterna separera dag- och spillvatten för att uppfylla gällande krav.',
    scope: [
      'Åtgärd av felaktiga pumpanslutningar mellan fastigheterna och det kommunala dagvattennätet',
      'Ny asfaltering av uppfarter och gångvägar',
      'Separering av spill & dagvattensystem runt fastigheterna',
    ],
    execution: 'Arbetet genomfördes med minimal störning för de boende, med tydlig kommunikation och planering.',
    // Förslag, ej bekräftat i UNDERLAG.md.
    result: 'Separeringen av dag- och spillvatten har förbättrat källarmiljön och markarbetena har skapat en mer funktionell och estetiskt tilltalande utemiljö.',
    images: [
      { src: '/images/referenser/dagvatten-landskrona-1.jpg', alt: 'Bild av separerat dagvattensystem', width: 1080, height: 1080 },
      { src: '/images/referenser/dagvatten-landskrona-2.jpg', alt: 'Hantverkare kontrollerar lutning på dagvattensystemet', width: 1080, height: 1080 },
      { src: '/images/referenser/dagvatten-landskrona-3.jpg', alt: 'Stuprör kontrolleras och får rätt anslutningspunkt', width: 1080, height: 1080 },
      { src: '/images/referenser/dagvatten-landskrona-4.jpg', alt: 'Bild av en t-anslutning till dagvattensystemet', width: 1080, height: 1080 },
    ],
  },
]
