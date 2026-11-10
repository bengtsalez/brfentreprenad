/**
 * Gemensamt register för publicerade adresser.
 *
 * Samma regler styr länkar i appen, förrendering (nuxt.config.ts) och
 * sitemap.xml (server/routes/sitemap.xml.ts), så att de inte kan glida isär.
 * Filen får inte importera något från app/. Funktionerna tar listorna som
 * parametrar så att reglerna kan testas med testdata (scripts/routes.test.ts)
 * utan att testdata hamnar i bygget.
 */
import { caseStudies as allCaseStudies } from './content/references.ts'
import { guides as allGuides } from './content/guides.ts'
import { locations as allLocations } from './content/locations.ts'
import type { CaseStudy, Guide, LocationPage } from './content/types.ts'
import { allPublicPages, normalizePath, sitePages, type SitePage } from './site-structure.ts'

export interface PublishedRoute {
  path: string
  /** Verkligt ändringsdatum (ÅÅÅÅ-MM-DD) när det finns. Annars utelämnas lastmod. */
  lastmod?: string
}

export interface ContentLists {
  pages: SitePage[]
  caseStudies: CaseStudy[]
  guides: Guide[]
  locations: LocationPage[]
}

export const defaultContent: ContentLists = {
  pages: allPublicPages(),
  caseStudies: allCaseStudies,
  guides: allGuides,
  locations: allLocations,
}

function pageStatus(path: string, pages: SitePage[]) {
  return pages.find(page => page.path === path)?.status
}

/** Referensprojekt som får visas: översikten är publicerad, projektet är publicerat och har bilder. */
export function publishedCaseStudies(content: ContentLists = defaultContent): CaseStudy[] {
  if (pageStatus(sitePages.references.path, content.pages) !== 'published') return []
  return content.caseStudies.filter(project => project.status === 'published' && project.images.length > 0)
}

/** Guider som får visas. Kräver att /kunskap/ är publicerad. */
export function publishedGuides(content: ContentLists = defaultContent): Guide[] {
  if (pageStatus(sitePages.knowledge.path, content.pages) !== 'published') return []
  return content.guides.filter(guide => guide.status === 'published')
}

/** Ortssidor som får visas. Kräver att /verksamhetsomrade/ är publicerad och att sidan har innehåll. */
export function publishedLocations(content: ContentLists = defaultContent): LocationPage[] {
  if (pageStatus(sitePages.serviceArea.path, content.pages) !== 'published') return []
  return content.locations.filter(location => location.status === 'published' && location.sections.length > 0)
}

export function caseStudyPath(project: Pick<CaseStudy, 'slug'>): string {
  return `${sitePages.references.path}${project.slug}/`
}

export function guidePath(guide: Pick<Guide, 'slug'>): string {
  return `${sitePages.knowledge.path}${guide.slug}/`
}

export function locationPath(location: Pick<LocationPage, 'slug'>): string {
  return `${sitePages.serviceArea.path}${location.slug}/`
}

/**
 * Alla publicerade adresser: statiska sidor och dynamiskt innehåll.
 * Översikter utan innehåll (referenser, kunskap) tas bort, eftersom de ger 404.
 */
export function publishedRoutes(content: ContentLists = defaultContent): PublishedRoute[] {
  const projects = publishedCaseStudies(content)
  const guideList = publishedGuides(content)
  const locationList = publishedLocations(content)

  const emptyOverviews = new Set<string>([
    ...(projects.length ? [] : [sitePages.references.path]),
    ...(guideList.length ? [] : [sitePages.knowledge.path]),
  ])

  const latest = (dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1)

  const routes: PublishedRoute[] = [
    ...content.pages
      .filter(page => page.status === 'published' && !emptyOverviews.has(page.path))
      .map(page => ({
        path: page.path,
        ...(page.path === sitePages.knowledge.path ? { lastmod: latest(guideList.map(guide => guide.updated)) } : {}),
      })),
    ...projects.map(project => ({ path: caseStudyPath(project) })),
    ...guideList.map(guide => ({ path: guidePath(guide), lastmod: guide.updated })),
    ...locationList.map(location => ({ path: locationPath(location) })),
  ]

  // En post per adress, även om samma sökväg skulle förekomma två gånger.
  const seen = new Set<string>()
  return routes.filter((route) => {
    if (seen.has(route.path)) return false
    seen.add(route.path)
    return true
  })
}

/** Om en sökväg är publicerad enligt registret. Används för alla internlänkar. */
export function isRoutePublished(path: string, content: ContentLists = defaultContent): boolean {
  const normalized = normalizePath(path.split(/[?#]/)[0] ?? path)
  return publishedRoutes(content).some(route => route.path === normalized)
}

/**
 * Sökvägar som inte får förrenderas: opublicerade statiska sidor, utkast och
 * översikter utan innehåll. Används i nitro.prerender.ignore.
 */
export function unpublishedPaths(content: ContentLists = defaultContent): string[] {
  const published = new Set(publishedRoutes(content).map(route => route.path))
  return [
    ...content.pages.map(page => page.path),
    ...content.caseStudies.map(caseStudyPath),
    ...content.guides.map(guidePath),
    ...content.locations.map(locationPath),
  ].filter(path => !published.has(path))
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;')
}

/** sitemap.xml med absoluta adresser. `siteUrl` utan avslutande snedstreck. */
export function sitemapXml(siteUrl: string, routes: PublishedRoute[] = publishedRoutes()): string {
  const base = siteUrl.replace(/\/$/, '')
  const urls = routes
    .map(route => [
      '  <url>',
      `    <loc>${escapeXml(`${base}${route.path}`)}</loc>`,
      ...(route.lastmod ? [`    <lastmod>${escapeXml(route.lastmod)}</lastmod>`] : []),
      '  </url>',
    ].join('\n'))
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
