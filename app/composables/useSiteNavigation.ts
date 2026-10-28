import { findPage, isPublished, serviceAreas, sitePages, type SitePage } from '#shared/site-structure'
import type { ActionKind, EntryItem, LinkItem, NavItem } from '~/types/content'

function linkTo(page: SitePage, label = page.title): LinkItem {
  return { label, href: page.path }
}

/** Länkar till de sökvägar som är publicerade, med sidans titel som etikett. */
export function publishedLinks(paths: string[]): LinkItem[] {
  return paths
    .filter(isPublished)
    .map(path => linkTo(findPage(path)!))
}

/**
 * Menyer och huvudhandlingar för hela webbplatsen.
 * Opublicerade sidor tas bort, så att inga länkar leder till tomma sidor.
 * Bokning och "Mina ärenden" visas bara när den riktiga tjänstens URL är satt.
 */
export function useSiteNavigation() {
  const { bookingUrl, accountUrl } = useRuntimeConfig().public

  const audienceLinks = [sitePages.housingAssociations, sitePages.propertyManagers, sitePages.propertyOwners]
    .filter(page => page.status === 'published')
    .map(page => linkTo(page))

  const mainNav: NavItem[] = [
    linkTo(sitePages.services, 'Tjänster'),
    { label: 'För er', children: audienceLinks },
    linkTo(sitePages.process),
    linkTo(sitePages.references),
    linkTo(sitePages.about, 'Om oss'),
    linkTo(sitePages.contact),
  ].filter(item => ('children' in item ? item.children?.length : isPublished(item.href!)))

  if (accountUrl) mainNav.push({ label: 'Mina ärenden', href: accountUrl })

  const actions: Record<ActionKind, LinkItem> = {
    service: bookingUrl
      ? { label: 'Boka service', href: bookingUrl }
      : { label: 'Beställ ett servicearbete', href: sitePages.contact.path },
    project: { label: 'Diskutera ett projekt', href: sitePages.contact.path },
  }

  const footerNav: LinkItem[] = [
    linkTo(sitePages.services, 'Tjänster'),
    ...serviceAreas.filter(area => area.status === 'published').map(area => linkTo(area)),
  ]

  const footerCompanyNav: LinkItem[] = publishedLinks([
    ...audienceLinks.map(link => link.href),
    sitePages.process.path,
    sitePages.bookingGuide.path,
    sitePages.about.path,
    sitePages.contact.path,
  ])

  return {
    mainNav,
    footerNav,
    footerCompanyNav,
    actions,
    hasBooking: Boolean(bookingUrl),
  }
}

/**
 * Rader för EntryListSection från publicerade sidor. För tjänsteområden
 * visas undertjänsterna som punkter (utan länk tills de publiceras).
 */
export function publishedEntries(paths: string[]): EntryItem[] {
  return paths.filter(isPublished).map((path) => {
    const page = findPage(path)!
    const area = serviceAreas.find(item => item.path === page.path)
    return {
      title: page.title,
      description: page.summary,
      href: page.path,
      items: area?.children.filter(child => child.status !== 'unconfirmed').map(child => child.title),
    }
  })
}
