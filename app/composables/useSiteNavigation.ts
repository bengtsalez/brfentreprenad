import { isRoutePublished } from '#shared/routes'
import { findPage, priorityServices, serviceAreas, sitePages, type SitePage } from '#shared/site-structure'
import { inquiryHref } from '~/content/inquiry'
import type { ActionKind, EntryItem, LinkItem, NavItem } from '~/types/content'

function linkTo(page: SitePage, label = page.title): LinkItem {
  return { label, href: page.path }
}

/**
 * Länkar till de sökvägar som är publicerade enligt shared/routes.ts, med
 * sidans titel som etikett. Utkast och tomma översikter filtreras bort.
 */
export function publishedLinks(paths: string[]): LinkItem[] {
  return paths
    .filter(path => isRoutePublished(path) && findPage(path))
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

  const priorityLinks = publishedLinks(priorityServices.map(service => service.path))

  const mainNav: NavItem[] = [
    { label: 'Tjänster', children: [...priorityLinks, linkTo(sitePages.services, 'Alla tjänster')] },
    { label: 'För er', children: audienceLinks },
    linkTo(sitePages.process),
    linkTo(sitePages.references, 'Referenser'),
    linkTo(sitePages.about, 'Om oss'),
    linkTo(sitePages.contact),
  ].filter(item => ('children' in item ? item.children?.length : isRoutePublished(item.href!)))

  if (accountUrl) mainNav.push({ label: 'Mina ärenden', href: accountUrl })

  // Utan bokningstjänst leder service till kontaktformuläret med serviceflödet förvalt.
  const actions: Record<ActionKind, LinkItem> = {
    service: bookingUrl
      ? { label: 'Boka service', href: bookingUrl }
      : { label: 'Skicka serviceförfrågan', href: inquiryHref('service') },
    project: { label: 'Prata med en projektledare', href: inquiryHref('projekt') },
  }

  /** Knappen i sidhuvudet och mobilens kontaktlist. */
  const inquiryLink: LinkItem = { label: 'Skicka förfrågan', href: `${sitePages.contact.path}#forfragan` }

  const footerNav: LinkItem[] = [
    ...priorityLinks,
    ...serviceAreas
      .filter(area => area.status === 'published' && !priorityLinks.some(link => link.href === area.path))
      .map(area => linkTo(area)),
    linkTo(sitePages.services, 'Alla tjänster'),
  ]

  const footerCompanyNav: LinkItem[] = publishedLinks([
    ...audienceLinks.map(link => link.href),
    sitePages.process.path,
    sitePages.bookingGuide.path,
    sitePages.knowledge.path,
    sitePages.serviceArea.path,
    sitePages.about.path,
    sitePages.contact.path,
    sitePages.privacy.path,
  ])

  return {
    mainNav,
    footerNav,
    footerCompanyNav,
    actions,
    inquiryLink,
    priorityLinks,
    hasBooking: Boolean(bookingUrl),
  }
}

/**
 * Rader för EntryListSection från publicerade sidor. För tjänsteområden
 * visas undertjänsterna som punkter (utan länk tills de publiceras).
 */
export function publishedEntries(paths: string[]): EntryItem[] {
  return paths.filter(path => isRoutePublished(path)).map((path) => {
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
