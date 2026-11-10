/**
 * Ortssidor under /verksamhetsomrade/[slug]/.
 *
 * En ortssida publiceras först när den har ett eget värde för läsaren:
 * verifierad lokal erfarenhet eller andra konkreta lokala förutsättningar,
 * ett relevant erbjudande och en tydlig kontaktväg. Byt aldrig bara ortsnamn i
 * samma text och skapa inga kombinationer av tjänst och ort. Ange aldrig ett
 * kontor på en ort där företaget inte har ett.
 *
 * Utkast byggs inte, länkas inte och tas inte med i sitemap.xml. Det som saknas
 * står i `missing` och i UNDERLAG.md, avsnitt 9.
 */
import type { LocationPage } from './types.ts'

const priorityServices = [
  '/tjanster/fasad-balkong-och-tak/fasadrenovering/',
  '/tjanster/fasad-balkong-och-tak/balkongrenovering/',
  '/tjanster/mark-grund-och-utemiljo/dranering/',
  '/tjanster/fastighetsservice/',
  '/tjanster/portar-las-och-passage/porttelefoni-och-passersystem/',
]

export const locations: LocationPage[] = [
  {
    // Utkast. Kontoret och referensprojektet är bekräftade, men lokal
    // erfarenhet utöver det saknas. Se `missing`.
    slug: 'landskrona',
    status: 'draft',
    name: 'Landskrona',
    metaTitle: 'Renovering och fastighetsservice för föreningar i Landskrona',
    metaDescription: 'BRF Entreprenad har kontor på Östergatan i Landskrona och tar uppdrag åt bostadsrättsföreningar och fastighetsägare i staden.',
    lead: 'Vårt kontor ligger på Östergatan i Landskrona. Härifrån utgår projektledarna när vi arbetar med föreningar och fastighetsägare i staden.',
    sections: [
      {
        title: 'Kontoret i Landskrona',
        paragraphs: [
          'Kontoret ligger på Östergatan 112. Härifrån tar vi uppdrag från Halmstad till Falsterbo.',
        ],
      },
      {
        title: 'Uppdrag i Landskrona',
        paragraphs: [
          'År 2026 renoverade vi balkongerna på ett flerbostadshus från 1948 i Landskrona. En del balkonger reparerades och de mest skadade revs, förstärktes och göts om.',
        ],
      },
    ],
    services: priorityServices,
    missing: [
      'Fler genomförda uppdrag i Landskrona: typ av arbete, år och om de får nämnas.',
      'Vilka delar av staden och vilken typ av bebyggelse ni oftast arbetar med.',
      'Lokala förutsättningar ni har erfarenhet av, till exempel kulturmiljöer, kommunens handläggning av bygglov eller vanliga skador på husen.',
      'Vem på kontoret som är kontaktperson för uppdrag i Landskrona.',
    ],
  },
  {
    slug: 'helsingborg',
    status: 'draft',
    name: 'Helsingborg',
    metaTitle: 'Renovering och fastighetsservice för föreningar i Helsingborg',
    metaDescription: 'Utkast. Publiceras inte förrän lokal erfarenhet är bekräftad.',
    lead: '',
    sections: [],
    services: priorityServices,
    missing: [
      'Genomförda uppdrag i Helsingborg med typ av arbete, år och publiceringsgodkännande.',
      'Projektbilder från Helsingborg med användningsrätt.',
      'Lokala förutsättningar ni har erfarenhet av.',
      'Kontaktperson för uppdrag i Helsingborg. Inget kontor finns där och inget får anges.',
    ],
  },
  {
    slug: 'malmo',
    status: 'draft',
    name: 'Malmö',
    metaTitle: 'Renovering och fastighetsservice för föreningar i Malmö',
    metaDescription: 'Utkast. Publiceras inte förrän lokal erfarenhet är bekräftad.',
    lead: '',
    sections: [],
    services: priorityServices,
    missing: [
      'Genomförda uppdrag i Malmö med typ av arbete, år och publiceringsgodkännande.',
      'Projektbilder från Malmö med användningsrätt.',
      'Lokala förutsättningar ni har erfarenhet av.',
      'Kontaktperson för uppdrag i Malmö. Inget kontor finns där och inget får anges.',
    ],
  },
]
