/**
 * Tester för publiceringsreglerna i shared/routes.ts.
 * Körs med `npm test` (Node:s inbyggda testkörare och typstrippning, inga beroenden).
 * Testdatan nedan finns bara här och kommer aldrig med i bygget.
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  defaultContent,
  isRoutePublished,
  publishedCaseStudies,
  publishedGuides,
  publishedLocations,
  publishedRoutes,
  sitemapXml,
  unpublishedPaths,
  type ContentLists,
} from '../shared/routes.ts'
import type { CaseStudy, Guide, LocationPage } from '../shared/content/types.ts'

const image = { src: '/images/test.jpg', alt: 'Test', width: 10, height: 10 }

const fixtureProject = (overrides: Partial<CaseStudy>): CaseStudy => ({
  slug: 'testprojekt',
  status: 'published',
  title: 'Testprojekt',
  location: 'Testort',
  clientPublishable: false,
  propertyType: 'Test',
  assignment: 'Test',
  services: [],
  performedBy: 'Test AB',
  role: 'Test',
  startingPoint: 'Test',
  scope: [],
  execution: 'Test',
  result: 'Test',
  images: [image],
  ...overrides,
})

const fixtureGuide = (overrides: Partial<Guide>): Guide => ({
  slug: 'testguide',
  status: 'published',
  title: 'Testguide',
  metaTitle: 'Testguide',
  metaDescription: 'Test',
  summary: 'Test',
  answer: 'Test',
  author: { name: 'Test', type: 'Organization' },
  updated: '2026-01-02',
  sections: [],
  sources: [],
  services: [],
  inquiry: { flow: 'projekt' },
  ...overrides,
})

const fixtureLocation = (overrides: Partial<LocationPage>): LocationPage => ({
  slug: 'testort',
  status: 'published',
  name: 'Testort',
  metaTitle: 'Test',
  metaDescription: 'Test',
  lead: 'Test',
  sections: [{ title: 'Lokalt', paragraphs: ['Verifierad uppgift.'] }],
  services: [],
  ...overrides,
})

const withContent = (overrides: Partial<ContentLists>): ContentLists => ({ ...defaultContent, ...overrides })
const paths = (content: ContentLists) => publishedRoutes(content).map(route => route.path)

describe('publicerade adresser', () => {
  it('är unika, börjar och slutar med snedstreck', () => {
    const list = paths(defaultContent)
    assert.equal(new Set(list).size, list.length)
    for (const path of list) assert.match(path, /^\/(?:[a-z0-9-]+\/)*$/)
  })

  it('innehåller inga utkast i det riktiga innehållet', () => {
    const list = new Set(paths(defaultContent))
    for (const guide of defaultContent.guides.filter(item => item.status === 'draft')) {
      assert.ok(!list.has(`/kunskap/${guide.slug}/`), guide.slug)
    }
    for (const location of defaultContent.locations.filter(item => item.status === 'draft')) {
      assert.ok(!list.has(`/verksamhetsomrade/${location.slug}/`), location.slug)
    }
    for (const page of defaultContent.pages.filter(item => item.status !== 'published')) {
      assert.ok(!list.has(page.path), page.path)
    }
  })

  it('exkluderar interna sidor och parametrar', () => {
    for (const path of paths(defaultContent)) {
      assert.ok(!path.startsWith('/build'))
      assert.ok(!path.includes('__forms'))
      assert.ok(!path.includes('?'))
    }
  })

  it('överlappar inte med listan över opublicerade sökvägar', () => {
    const published = new Set(paths(defaultContent))
    for (const path of unpublishedPaths(defaultContent)) assert.ok(!published.has(path), path)
  })
})

describe('referensprojekt', () => {
  it('visar bara publicerade projekt med bilder', () => {
    const content = withContent({
      caseStudies: [
        fixtureProject({ slug: 'klar' }),
        fixtureProject({ slug: 'utkast', status: 'draft' }),
        fixtureProject({ slug: 'utan-bild', images: [] }),
      ],
    })
    assert.deepEqual(publishedCaseStudies(content).map(project => project.slug), ['klar'])
    assert.ok(paths(content).includes('/referensprojekt/klar/'))
    assert.ok(!paths(content).includes('/referensprojekt/utkast/'))
    assert.ok(unpublishedPaths(content).includes('/referensprojekt/utkast/'))
  })

  it('döljer översikten när inget projekt är publicerat', () => {
    const content = withContent({ caseStudies: [fixtureProject({ status: 'draft' })] })
    assert.ok(!paths(content).includes('/referensprojekt/'))
    assert.ok(!isRoutePublished('/referensprojekt/', content))
  })
})

describe('guider', () => {
  it('tar med publicerade guider med verkligt ändringsdatum', () => {
    const content = withContent({ guides: [fixtureGuide({ slug: 'a', updated: '2026-03-01' }), fixtureGuide({ slug: 'b', status: 'draft' })] })
    assert.deepEqual(publishedGuides(content).map(guide => guide.slug), ['a'])
    const routes = publishedRoutes(content)
    assert.equal(routes.find(route => route.path === '/kunskap/a/')?.lastmod, '2026-03-01')
    assert.equal(routes.find(route => route.path === '/kunskap/')?.lastmod, '2026-03-01')
    assert.ok(!routes.some(route => route.path === '/kunskap/b/'))
  })

  it('döljer kunskapsöversikten utan publicerade guider', () => {
    const content = withContent({ guides: [fixtureGuide({ status: 'draft' })] })
    assert.ok(!paths(content).includes('/kunskap/'))
  })
})

describe('ortssidor', () => {
  it('publicerar bara orter med status published och lokalt innehåll', () => {
    const content = withContent({
      locations: [
        fixtureLocation({ slug: 'klar' }),
        fixtureLocation({ slug: 'tom', sections: [] }),
        fixtureLocation({ slug: 'utkast', status: 'draft' }),
      ],
    })
    assert.deepEqual(publishedLocations(content).map(location => location.slug), ['klar'])
    assert.ok(paths(content).includes('/verksamhetsomrade/klar/'))
    assert.ok(!paths(content).includes('/verksamhetsomrade/tom/'))
  })
})

describe('sitemap.xml', () => {
  it('har absoluta, escapade adresser och lastmod bara där det finns', () => {
    const xml = sitemapXml('https://example.se/', [{ path: '/a&b/' }, { path: '/c/', lastmod: '2026-01-01' }])
    assert.ok(xml.includes('<loc>https://example.se/a&amp;b/</loc>'))
    assert.ok(xml.includes('<lastmod>2026-01-01</lastmod>'))
    assert.equal(xml.match(/<lastmod>/g)?.length, 1)
  })
})
