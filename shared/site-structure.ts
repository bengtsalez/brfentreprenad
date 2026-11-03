/**
 * Webbplatsens informationsarkitektur enligt public/brfentreprenad-sitemap.md.
 *
 * Här finns alla planerade sidor, även de som inte publiceras ännu. Bara sidor
 * med status "published" får byggas, länkas och tas med i sitemap.xml.
 * Filen används både av appen och av servern (sitemap.xml), så den får inte
 * importera något från app/.
 *
 * Så publiceras en sida:
 * 1. Skriv innehållet (för tjänster i app/content/services.ts).
 * 2. Skapa sidfilen om den saknas i app/pages/.
 * 3. Sätt status till "published".
 */

/**
 * - published: byggs och länkas.
 * - planned: ingår i målbilden men saknar innehåll eller underlag.
 * - unconfirmed: erbjudandet eller uppgifterna måste bekräftas innan sidan skrivs.
 */
export type PageStatus = 'published' | 'planned' | 'unconfirmed'

export interface SitePage {
  path: string
  title: string
  /** Kort beskrivning av innehållet. Används i listor och som stöd när sidan skrivs. */
  summary: string
  status: PageStatus
  /** Etapp i publiceringsordningen (avsnitt 11 i underlaget). */
  stage?: 1 | 2 | 3
}

export interface ServiceArea extends SitePage {
  /** Del av URL:en, t.ex. "fastighetsservice" för /tjanster/fastighetsservice/. */
  slug: string
  children: SitePage[]
}

export const sitePages = {
  home: {
    path: '/',
    title: 'Startsida',
    summary: 'Målgrupper, erbjudande, område och vägar vidare.',
    status: 'published',
    stage: 1,
  },
  services: {
    path: '/tjanster/',
    title: 'Våra tjänster',
    summary: 'Samlad tjänsteöversikt.',
    status: 'published',
    stage: 1,
  },
  housingAssociations: {
    path: '/for-bostadsrattsforeningar/',
    title: 'För bostadsrättsföreningar',
    summary: 'Stöd för styrelsens beställningar och projekt.',
    status: 'published',
    stage: 1,
  },
  propertyManagers: {
    path: '/for-fastighetsforvaltare/',
    title: 'För fastighetsförvaltare',
    summary: 'Servicebeställningar, samordning och återkoppling.',
    status: 'published',
    stage: 1,
  },
  propertyOwners: {
    path: '/for-fastighetsagare/',
    title: 'För fastighetsägare',
    summary: 'Underhåll och renovering av en eller flera fastigheter.',
    status: 'published',
    stage: 1,
  },
  process: {
    path: '/sa-arbetar-vi/',
    title: 'Så arbetar vi',
    summary: 'Från behov till färdigt arbete.',
    status: 'published',
    stage: 1,
  },
  // Beskriver konto och statusuppföljning i bokningstjänsten. Publiceras först
  // när tjänsten finns på riktigt (NUXT_PUBLIC_BOOKING_URL).
  bookingGuide: {
    path: '/sa-fungerar-servicebokningen/',
    title: 'Så fungerar servicebokningen',
    summary: 'Bokning, planering och status.',
    status: 'planned',
    stage: 1,
  },
  references: {
    path: '/referensprojekt/',
    title: 'Referensprojekt',
    summary: 'Verifierade uppdrag med utgångsläge, omfattning och resultat.',
    status: 'published',
    stage: 3,
  },
  about: {
    path: '/om-oss/',
    title: 'Om BRF Entreprenad',
    summary: 'Företaget, arbetssättet och helhetsansvaret.',
    status: 'published',
    stage: 1,
  },
  serviceArea: {
    path: '/verksamhetsomrade/',
    title: 'Från Halmstad till Falsterbo',
    summary: 'Geografisk täckning och arbetssätt.',
    status: 'planned',
    stage: 3,
  },
  contact: {
    path: '/kontakt/',
    title: 'Kontakt',
    summary: 'Projektförfrågan och kontaktvägar.',
    status: 'published',
    stage: 1,
  },
  faq: {
    path: '/vanliga-fragor/',
    title: 'Vanliga frågor',
    summary: 'Service, entreprenad, planering och beställning.',
    status: 'planned',
  },
  privacy: {
    path: '/integritetspolicy/',
    title: 'Integritetspolicy',
    summary: 'Hur personuppgifter i förfrågningar hanteras.',
    status: 'published',
    stage: 1,
  },
  cookies: {
    path: '/kakor/',
    title: 'Kakor',
    summary: 'Anpassas till de kakor och mätverktyg som faktiskt används.',
    status: 'unconfirmed',
  },
} satisfies Record<string, SitePage>

export const serviceAreas: ServiceArea[] = [
  {
    // Hette tidigare byggservice. netlify.toml omdirigerar de gamla adresserna.
    slug: 'fastighetsservice',
    path: '/tjanster/fastighetsservice/',
    title: 'Fastighetsservice',
    summary: 'Reparationer och mindre arbeten i trapphus, entréer, på fasader, tak och gårdar.',
    status: 'published',
    stage: 1,
    children: [
      { path: '/tjanster/fastighetsservice/snickeri/', title: 'Snickeri', summary: 'Mindre snickerier, lister, foder, panel, förråd och inredning.', status: 'planned', stage: 3 },
      { path: '/tjanster/fastighetsservice/dorrar-och-fonster/', title: 'Dörrar och fönster', summary: 'Justering, tätning, beslag, mindre byten och reparationer.', status: 'planned', stage: 3 },
      { path: '/tjanster/fastighetsservice/maleri-och-ytskikt/', title: 'Måleri och ytskikt', summary: 'Bättringsmålning, spackling, väggar, tak och mindre golvarbeten.', status: 'planned', stage: 3 },
      { path: '/tjanster/fastighetsservice/fasadservice/', title: 'Fasadservice', summary: 'Mindre puts-, fog- och panelreparationer.', status: 'planned', stage: 3 },
      { path: '/tjanster/fastighetsservice/takservice/', title: 'Takservice', summary: 'Mindre takreparationer, hängrännor, stuprör och plåtdetaljer.', status: 'planned', stage: 3 },
      { path: '/tjanster/fastighetsservice/markreparationer/', title: 'Markreparationer', summary: 'Plattor, gångar, trappor, räcken, grindar och staket.', status: 'planned', stage: 3 },
      { path: '/tjanster/fastighetsservice/skadeaterstallning/', title: 'Skadeåterställning', summary: 'Återställning efter läckor, skadegörelse och inbrott.', status: 'planned', stage: 3 },
    ],
  },
  {
    slug: 'portar-las-och-passage',
    path: '/tjanster/portar-las-och-passage/',
    title: 'Portar, lås och passage',
    summary: 'Porttelefoni, passagesystem, lås, dörrstängare och entrépartier.',
    status: 'published',
    stage: 1,
    children: [
      { path: '/tjanster/portar-las-och-passage/porttelefoni-och-passersystem/', title: 'Porttelefoni och passersystem', summary: 'Byte, utbyggnad och service av porttelefoni, taggläsare och behörigheter.', status: 'published', stage: 1 },
      { path: '/tjanster/portar-las-och-passage/las-och-dorrstangare/', title: 'Lås och dörrstängare', summary: 'Lås, beslag, dörrstängare och funktion.', status: 'planned', stage: 3 },
      { path: '/tjanster/portar-las-och-passage/entrepartier-och-portar/', title: 'Entrépartier och portar', summary: 'Entrépartier, portar, dörrautomatik och tillgänglighet.', status: 'planned', stage: 3 },
    ],
  },
  {
    slug: 'fasad-balkong-och-tak',
    path: '/tjanster/fasad-balkong-och-tak/',
    title: 'Fasad, balkong och tak',
    summary: 'Renovering av klimatskalet: fasader, balkonger och tak.',
    status: 'published',
    stage: 1,
    children: [
      { path: '/tjanster/fasad-balkong-och-tak/fasadrenovering/', title: 'Fasadrenovering', summary: 'Renovering av puts-, tegel- och träfasader som ett samlat projekt.', status: 'published', stage: 1 },
      { path: '/tjanster/fasad-balkong-och-tak/putsfasad/', title: 'Putsfasad', summary: 'Omputsning, putslagning och renovering.', status: 'planned', stage: 3 },
      { path: '/tjanster/fasad-balkong-och-tak/tegelfasad-och-omfogning/', title: 'Tegelfasad och omfogning', summary: 'Fogar, tegelbyte och reparationer.', status: 'planned', stage: 3 },
      { path: '/tjanster/fasad-balkong-och-tak/trafasad-och-panelbyte/', title: 'Träfasad och panelbyte', summary: 'Panelbyte, foder, knutar och bakomliggande konstruktion.', status: 'planned', stage: 3 },
      { path: '/tjanster/fasad-balkong-och-tak/fasadmalning/', title: 'Fasadmålning', summary: 'Målning av fasader och tillhörande detaljer.', status: 'planned', stage: 3 },
      { path: '/tjanster/fasad-balkong-och-tak/tillaggsisolering/', title: 'Tilläggsisolering', summary: 'Isolering i samband med fasadåtgärder.', status: 'planned', stage: 3 },
      { path: '/tjanster/fasad-balkong-och-tak/balkongrenovering/', title: 'Balkongrenovering', summary: 'Balkongplattor, tätskikt, räcken och infästningar.', status: 'published', stage: 1 },
      { path: '/tjanster/fasad-balkong-och-tak/takrenovering/', title: 'Takrenovering', summary: 'Takbyte, tätskikt och renovering.', status: 'planned', stage: 2 },
      { path: '/tjanster/fasad-balkong-och-tak/platarbeten-och-taksakerhet/', title: 'Plåtarbeten och taksäkerhet', summary: 'Plåtdetaljer, avvattning och taksäkerhet.', status: 'planned', stage: 3 },
    ],
  },
  {
    slug: 'fonster-och-dorrar',
    path: '/tjanster/fonster-och-dorrar/',
    title: 'Fönster och dörrar',
    summary: 'Enstaka byten och samordnade byten i hela fastigheter.',
    status: 'published',
    stage: 1,
    children: [
      { path: '/tjanster/fonster-och-dorrar/fonsterbyte/', title: 'Fönsterbyte', summary: 'Enstaka fönster och samordnade byten i hela fastigheter.', status: 'planned', stage: 2 },
      { path: '/tjanster/fonster-och-dorrar/fonsterrenovering/', title: 'Fönsterrenovering', summary: 'Renovering, målning och tätning.', status: 'planned', stage: 3 },
      { path: '/tjanster/fonster-och-dorrar/dorrbyte/', title: 'Dörrbyte', summary: 'Lägenhetsdörrar, säkerhetsdörrar och andra dörrbyten.', status: 'planned', stage: 3 },
    ],
  },
  {
    slug: 'mark-grund-och-utemiljo',
    path: '/tjanster/mark-grund-och-utemiljo/',
    title: 'Mark, grund och utemiljö',
    summary: 'Dränering, dagvatten, hårdgjorda ytor och gemensam utemiljö.',
    status: 'published',
    stage: 1,
    children: [
      { path: '/tjanster/mark-grund-och-utemiljo/dranering/', title: 'Dränering', summary: 'Ny dränering och grundisolering runt flerbostadshus.', status: 'published', stage: 1 },
      { path: '/tjanster/mark-grund-och-utemiljo/dagvatten/', title: 'Dagvatten', summary: 'Avledning, ledningar och brunnar.', status: 'planned', stage: 3 },
      { path: '/tjanster/mark-grund-och-utemiljo/fuktatgarder/', title: 'Fuktåtgärder', summary: 'Utredning och föreslagna åtgärder vid fuktproblem.', status: 'planned', stage: 3 },
      { path: '/tjanster/mark-grund-och-utemiljo/stensattning-och-asfalt/', title: 'Stensättning och asfalt', summary: 'Gångar, entréer, parkeringar och hårdgjorda ytor.', status: 'planned', stage: 3 },
      { path: '/tjanster/mark-grund-och-utemiljo/innergardar/', title: 'Innergårdar', summary: 'Upprustning av gårdar och gemensam utemiljö.', status: 'planned', stage: 3 },
      { path: '/tjanster/mark-grund-och-utemiljo/trappor-murar-och-racken/', title: 'Trappor, murar och räcken', summary: 'Stödmurar, utomhustrappor, räcken, staket och grindar.', status: 'planned', stage: 3 },
      { path: '/tjanster/mark-grund-och-utemiljo/tillganglighetsanpassning/', title: 'Tillgänglighetsanpassning', summary: 'Ramper, gångvägar och entrénära anpassningar.', status: 'planned', stage: 3 },
      { path: '/tjanster/mark-grund-och-utemiljo/schakt-och-grundlaggning/', title: 'Schakt och grundläggning', summary: 'Markberedning, schakt och grundarbeten.', status: 'planned', stage: 3 },
    ],
  },
  {
    slug: 'invandig-renovering',
    path: '/tjanster/invandig-renovering/',
    title: 'Invändig renovering',
    summary: 'Trapphus, tvättstugor, källare och andra gemensamma utrymmen.',
    status: 'published',
    stage: 1,
    children: [
      { path: '/tjanster/invandig-renovering/trapphus/', title: 'Trapphus', summary: 'Måleri, golv, snickeri och samordnad upprustning.', status: 'planned', stage: 2 },
      { path: '/tjanster/invandig-renovering/tvattstugor/', title: 'Tvättstugor', summary: 'Ytskikt, inredning och samordning av installationer.', status: 'planned', stage: 3 },
      { path: '/tjanster/invandig-renovering/kallare-och-forrad/', title: 'Källare och förråd', summary: 'Källarutrymmen, förråd och gemensamma ytor.', status: 'planned', stage: 3 },
      { path: '/tjanster/invandig-renovering/miljorum-och-cykelrum/', title: 'Miljörum och cykelrum', summary: 'Ombyggnad och funktionell upprustning.', status: 'planned', stage: 3 },
      { path: '/tjanster/invandig-renovering/lokalanpassning/', title: 'Lokalanpassning', summary: 'Anpassning av lokaler i fastigheten.', status: 'planned', stage: 3 },
    ],
  },
  {
    // Leveransförmåga och ansvar (egen personal eller samarbetspartner) ska bekräftas före publicering.
    slug: 'installationer-och-teknik',
    path: '/tjanster/installationer-och-teknik/',
    title: 'Installationer och teknik',
    summary: 'El, VVS, ventilation, värme och samordnade installationsprojekt.',
    status: 'unconfirmed',
    stage: 3,
    children: [
      { path: '/tjanster/installationer-och-teknik/el-och-belysning/', title: 'El och belysning', summary: 'Elservice, armaturer, trapphusbelysning och utebelysning.', status: 'unconfirmed', stage: 3 },
      { path: '/tjanster/installationer-och-teknik/vvs/', title: 'VVS', summary: 'Reparationer, ventiler, radiatorer och installationer.', status: 'unconfirmed', stage: 3 },
      { path: '/tjanster/installationer-och-teknik/avlopp/', title: 'Avlopp', summary: 'Avloppsservice och åtgärder.', status: 'unconfirmed', stage: 3 },
      { path: '/tjanster/installationer-och-teknik/ventilation/', title: 'Ventilation', summary: 'Service, rengöring och ombyggnadsåtgärder.', status: 'unconfirmed', stage: 3 },
      { path: '/tjanster/installationer-och-teknik/varme-och-energi/', title: 'Värme och energi', summary: 'Värmesystem och energieffektiviserande åtgärder.', status: 'unconfirmed', stage: 3 },
      { path: '/tjanster/installationer-och-teknik/laddplatser/', title: 'Laddplatser', summary: 'Samordning av laddinstallationer.', status: 'unconfirmed', stage: 3 },
      { path: '/tjanster/installationer-och-teknik/stambyte/', title: 'Stambyte', summary: 'Samordnade stambytesprojekt.', status: 'unconfirmed', stage: 3 },
      { path: '/tjanster/installationer-och-teknik/relining/', title: 'Relining', summary: 'Möjligt separat erbjudande efter bekräftelse.', status: 'unconfirmed', stage: 3 },
    ],
  },
  {
    slug: 'totalentreprenad',
    path: '/tjanster/totalentreprenad/',
    title: 'Totalentreprenad och projektledning',
    summary: 'Större renoveringar och ombyggnader med helhetsansvar och personlig projektledare.',
    status: 'published',
    stage: 1,
    children: [
      { path: '/tjanster/totalentreprenad/storre-renoveringar/', title: 'Större renoveringar', summary: 'Samordnade renoveringar med flera yrkesgrupper.', status: 'planned', stage: 3 },
      { path: '/tjanster/totalentreprenad/ombyggnad-och-tillbyggnad/', title: 'Ombyggnad och tillbyggnad', summary: 'Ombyggnader och tillbyggnader.', status: 'planned', stage: 3 },
      { path: '/tjanster/totalentreprenad/projektledning/', title: 'Projektledning', summary: 'Personlig projektledare, tidplan och samordning.', status: 'planned', stage: 3 },
      { path: '/tjanster/totalentreprenad/forstudie-och-projektering/', title: 'Förstudie och projektering', summary: 'Behovsanalys, förstudie, budgetunderlag och projektering.', status: 'planned', stage: 3 },
    ],
  },
]

/**
 * Vyer i bokningstjänsten (avsnitt 9.2). De är inte publika innehållssidor:
 * de byggs inte här, ska ha noindex och tas aldrig med i sitemap.xml.
 */
export const bookingAppViews: SitePage[] = [
  { path: '/logga-in/', title: 'Logga in', summary: 'Tillgång till kundens konto.', status: 'planned' },
  { path: '/boka-service/', title: 'Ny servicebeställning', summary: 'Adress, behov och önskad starttid.', status: 'planned' },
  { path: '/boka-service/bekraftelse/', title: 'Mottagningsbekräftelse', summary: 'Bekräftar mottaget ärende, inte bindande starttid.', status: 'planned' },
  { path: '/mina-arenden/', title: 'Mina ärenden', summary: 'Kundens arbeten med adress och status.', status: 'planned' },
  { path: '/mina-arenden/[arende-id]/', title: 'Ärendedetalj', summary: 'Beskrivning, aktuell status och planerad tid.', status: 'planned' },
  { path: '/mitt-konto/', title: 'Kontouppgifter', summary: 'Kontakt- och bolagsuppgifter.', status: 'planned' },
]

export interface BookingStatus {
  label: string
  description: string
  /** Bekräftat av beställaren. Övriga är förslag och visas inte publikt. */
  confirmed: boolean
}

/** Statusar i bokningstjänsten (avsnitt 9.4). */
export const bookingStatuses: BookingStatus[] = [
  { label: 'Mottaget', description: 'Ärendet har kommit in.', confirmed: false },
  { label: 'Under genomgång', description: 'Behov och förutsättningar bedöms.', confirmed: false },
  { label: 'Inväntar godkännande', description: 'Åtgärd eller pris behöver godkännas.', confirmed: false },
  { label: 'Inväntar material', description: 'Material inväntas inför arbetet.', confirmed: true },
  { label: 'Inplanerat', description: 'Arbetet är planerat till en viss vecka.', confirmed: true },
  { label: 'Pågående', description: 'Arbetet har påbörjats.', confirmed: false },
  { label: 'Slutfört', description: 'Arbetet är färdigställt.', confirmed: false },
  { label: 'Pausat', description: 'Arbetet avvaktar, med synlig förklaring.', confirmed: false },
  { label: 'Avbokat', description: 'Ärendet har avslutats utan genomförande.', confirmed: false },
]

/**
 * Tjänster som kräver särskilt beslut (avsnitt 6). De har inga sidor och
 * får inte beskrivas som en del av erbjudandet förrän de är bekräftade.
 */
export const offeringsAwaitingDecision = [
  'Lägenhetsservice och återställning vid avflyttning på förvaltarens beställning',
  'Köks- och badrumsrenovering som separat tjänsteområde',
  'Jour, akututryckning eller garanterad inställelsetid',
  'Fastighetsdrift, rondering och generell felanmälan från boende',
  'Trappstädning, trädgårdsskötsel och snöröjning',
  'Underhållsplaner, besiktningar och formella kontrolluppdrag',
  'Solceller, hissar, brandskydd, sanering och rivning som separata erbjudanden',
]

/** Alla publika sidor i målbilden, oavsett status. */
export function allPublicPages(): SitePage[] {
  return [
    ...Object.values(sitePages),
    ...serviceAreas.flatMap(area => [area, ...area.children]),
  ]
}

/** Sidor som får byggas, länkas och tas med i sitemap.xml. */
export function publishedPages(): SitePage[] {
  return allPublicPages().filter(page => page.status === 'published')
}

/** Lägger till avslutande snedstreck så att sökvägar kan jämföras. */
export function normalizePath(path: string): string {
  return path.endsWith('/') ? path : `${path}/`
}

export function findPage(path: string): SitePage | undefined {
  const normalized = normalizePath(path)
  return allPublicPages().find(page => page.path === normalized)
}

export function isPublished(path: string): boolean {
  return findPage(path)?.status === 'published'
}

/**
 * Prioriterade tjänstesidor. Visas först i menyn, på startsidan och i
 * tjänsteöversikten. `kind` skiljer servicearbeten från planerade projekt.
 */
export const priorityServices: { path: string, kind: 'service' | 'project' }[] = [
  { path: '/tjanster/fasad-balkong-och-tak/fasadrenovering/', kind: 'project' },
  { path: '/tjanster/fasad-balkong-och-tak/balkongrenovering/', kind: 'project' },
  { path: '/tjanster/mark-grund-och-utemiljo/dranering/', kind: 'project' },
  { path: '/tjanster/fastighetsservice/', kind: 'service' },
  { path: '/tjanster/portar-las-och-passage/porttelefoni-och-passersystem/', kind: 'service' },
]
