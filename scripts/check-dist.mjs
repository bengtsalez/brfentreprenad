/**
 * Kontrollerar det statiska bygget i dist/ efter `npm run generate`.
 * Körs med `npm run check:dist`. Inga beroenden, bara Node.
 *
 * Kontrollerar:
 * - robots.txt pekar på produktionens sitemap och blockerar inte sökrobotar
 * - sitemap.xml: unika absoluta adresser som alla finns som statiska sidor
 * - varje indexerbar sida finns i sitemap.xml, och inga utkast finns i bygget
 * - titel, metabeskrivning och canonical per sida (unika, självpekande)
 * - exakt en h1 per sida
 * - JSON-LD går att tolka, och BreadcrumbList stämmer med synliga brödsmulor
 * - internlänkar leder till sidor eller filer som finns
 * - inga platshållare eller exempeluppgifter på publicerade sidor
 * - interna sidor (byggsidan, 404) har noindex och ingen SPA-fallback finns
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { unpublishedPaths } from '../shared/routes.ts'

const DIST = new URL('../dist/', import.meta.url).pathname
const SITE = (process.env.NUXT_PUBLIC_SITE_URL ?? 'https://www.brfentreprenad.se').replace(/\/$/, '')
const PLACEHOLDERS = [/exempelprojekt/i, /påhittat/i, /Exempelbolaget/, /070-123 45 67/, /Exempelort/, /Lorem ipsum/i]

const errors = []
const fail = (message) => errors.push(message)
const read = (file) => readFileSync(join(DIST, file), 'utf8')

function fileForPath(path) {
  const clean = decodeURIComponent(path.split(/[?#]/)[0])
  const candidates = [join(DIST, clean), join(DIST, clean, 'index.html')]
  return candidates.find(candidate => existsSync(candidate) && statSync(candidate).isFile())
}

const decode = text => text
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&#x27;/g, '\'')

const attr = (html, pattern) => {
  const match = html.match(pattern)
  return match ? decode(match[1]) : undefined
}

// robots.txt
const robots = read('robots.txt')
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('robots.txt pekar inte på produktionens sitemap.xml')
if (/^Disallow:\s*\/\s*$/m.test(robots)) fail('robots.txt blockerar hela webbplatsen')

// Ingen global 200-fallback (t.ex. /* /200.html 200) som döljer 404.
if (existsSync(join(DIST, '_redirects')) && /\s200!?\s*$/m.test(read('_redirects'))) {
  fail('_redirects innehåller en 200-fallback')
}

// sitemap.xml
const sitemap = read('sitemap.xml')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]))
if (!locs.length) fail('sitemap.xml saknar adresser')
if (new Set(locs).size !== locs.length) fail('sitemap.xml har dubbletter')
const sitemapPaths = locs.map((loc) => {
  if (!loc.startsWith(`${SITE}/`)) fail(`sitemap.xml: adressen är inte absolut på ${SITE}: ${loc}`)
  return loc.slice(SITE.length)
})
for (const path of sitemapPaths) {
  if (!fileForPath(path)) fail(`sitemap.xml: ${path} finns inte som statisk sida`)
}
for (const match of sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(match[1])) fail(`sitemap.xml: ogiltigt lastmod ${match[1]}`)
}

// Utkast och opublicerade sidor får inte finnas i bygget.
for (const path of unpublishedPaths()) {
  if (fileForPath(path)) fail(`Opublicerad sida finns i bygget: ${path}`)
}

// Interna sidor ska ha noindex.
for (const file of ['build/index.html', '404.html']) {
  if (existsSync(join(DIST, file)) && !/<meta name="robots" content="noindex/.test(read(file))) {
    fail(`${file} saknar noindex`)
  }
}

// Kontroll per publicerad sida.
const titles = new Map()
const descriptions = new Map()
let linkCount = 0
let jsonLdCount = 0

for (const path of sitemapPaths) {
  const file = fileForPath(path)
  if (!file) continue
  const html = readFileSync(file, 'utf8')
  const where = `${path}:`

  const title = attr(html, /<title>([^<]*)<\/title>/)
  const description = attr(html, /<meta name="description" content="([^"]*)"/)
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/)
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]*)"/)

  if (!title) fail(`${where} titel saknas`)
  else titles.set(title, [...(titles.get(title) ?? []), path])
  if (!description) fail(`${where} metabeskrivning saknas`)
  else descriptions.set(description, [...(descriptions.get(description) ?? []), path])
  if (title && /BRF Entreprenad.*BRF Entreprenad/.test(title)) fail(`${where} varumärket upprepas i titeln: ${title}`)
  if (canonical !== `${SITE}${path}`) fail(`${where} canonical ${canonical} pekar inte på ${SITE}${path}`)
  if (ogUrl !== `${SITE}${path}`) fail(`${where} og:url ${ogUrl} stämmer inte med canonical`)
  if ((html.match(/<link rel="canonical"/g) ?? []).length !== 1) fail(`${where} ska ha exakt en canonical`)
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) fail(`${where} har noindex men finns i sitemap.xml`)

  const h1s = (html.match(/<h1[\s>]/g) ?? []).length
  if (h1s !== 1) fail(`${where} har ${h1s} h1`)

  for (const pattern of PLACEHOLDERS) {
    if (pattern.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) fail(`${where} innehåller platshållare (${pattern})`)
  }

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1])
  const nodes = []
  for (const block of blocks) {
    try {
      const data = JSON.parse(block)
      jsonLdCount++
      nodes.push(...(data['@graph'] ?? [data]))
    }
    catch (error) {
      fail(`${where} JSON-LD går inte att tolka: ${error.message}`)
    }
  }
  for (const node of nodes) {
    if (node['@type'] === 'GeneralContractor' && node['@id'] !== `${SITE}/#organization`) fail(`${where} organisationen saknar stabilt @id`)
    if (node['@type'] === 'AggregateRating' || node.aggregateRating || node.review) fail(`${where} JSON-LD innehåller betyg eller omdömen`)
  }

  // Brödsmulor: synliga länkar och BreadcrumbList ska stämma.
  const nav = html.match(/<nav aria-label="Brödsmulor"[\s\S]*?<\/nav>/)?.[0]
  const breadcrumbList = nodes.find(node => node['@type'] === 'BreadcrumbList')
  if (nav && !breadcrumbList) fail(`${where} synliga brödsmulor saknar BreadcrumbList`)
  if (breadcrumbList && !nav) fail(`${where} BreadcrumbList utan synliga brödsmulor`)
  if (nav && breadcrumbList) {
    const visible = [...nav.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map(match => ({
      href: attr(match[1], /href="([^"]*)"/),
      name: decode(match[1].replace(/<span aria-hidden="true">\/<\/span>/, '').replace(/<[^>]+>/g, '').trim()),
    }))
    const items = breadcrumbList.itemListElement
    if (items.length !== visible.length) fail(`${where} BreadcrumbList har ${items.length} led, synliga har ${visible.length}`)
    items.forEach((item, index) => {
      const shown = visible[index]
      if (!shown) return
      if (item.name !== shown.name) fail(`${where} brödsmula ${index + 1}: "${item.name}" ≠ "${shown.name}"`)
      const expected = shown.href ? `${SITE}${shown.href}` : `${SITE}${path}`
      if (item.item !== expected) fail(`${where} brödsmula ${index + 1}: ${item.item} ≠ ${expected}`)
    })
    if (items.at(-1)?.item !== `${SITE}${path}`) fail(`${where} sista brödsmulan är inte sidan själv`)
  }

  // Internlänkar
  for (const match of html.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    const href = decode(match[1])
    if (!href.startsWith('/') || href.startsWith('//')) continue
    linkCount++
    if (!fileForPath(href)) fail(`${where} bruten internlänk ${href}`)
    if (href.startsWith('/build')) fail(`${where} länkar till byggsidan`)
  }
}

for (const [title, paths] of titles) if (paths.length > 1) fail(`Samma titel "${title}" på ${paths.join(', ')}`)
for (const [description, paths] of descriptions) if (paths.length > 1) fail(`Samma metabeskrivning på ${paths.join(', ')}: ${description.slice(0, 60)} …`)

if (errors.length) {
  console.error(`check-dist: ${errors.length} fel\n${errors.map(error => `  ✗ ${error}`).join('\n')}`)
  process.exit(1)
}
console.log(`check-dist: OK. ${sitemapPaths.length} sidor, ${linkCount} internlänkar och ${jsonLdCount} JSON-LD-block kontrollerade.`)
