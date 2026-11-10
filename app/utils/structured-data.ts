import { email, legalEntity, office, phone, serviceAreaText } from '~/content/company'
import type { LinkItem } from '~/types/content'

/**
 * Strukturerad data (JSON-LD). Använd bara uppgifter som också syns på sidan
 * eller i company.ts. Inga betyg, omdömen eller obekräftade fält.
 */

const BRAND = 'BRF Entreprenad'

/** Sidtitel med varumärke. Läggs inte till om titeln redan innehåller det. */
export function brandedTitle(title?: string): string {
  if (!title) return BRAND
  return title.includes(BRAND) ? title : `${title} · ${BRAND}`
}

/**
 * JSON som kan läggas i ett script-element. <, > och & kodas så att innehåll
 * som "</script>" inte kan avsluta elementet.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replaceAll(String.fromCharCode(0x2028), '\\u2028')
    .replaceAll(String.fromCharCode(0x2029), '\\u2029')
}

/** Stabilt @id för företaget på produktionsdomänen. */
export function organizationId(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, '')}/#organization`
}

/** Företagsidentiteten. Samma objekt används på alla sidor som beskriver företaget. */
export function organizationJsonLd(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, '')
  return {
    '@type': 'GeneralContractor',
    ...(base ? { '@id': organizationId(base), 'url': `${base}/` } : {}),
    'name': BRAND,
    'legalName': legalEntity.name,
    'taxID': legalEntity.orgNumber,
    'telephone': phone.href.replace('tel:', ''),
    'email': email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': office.street,
      'postalCode': office.zip,
      'addressLocality': office.city,
      'addressCountry': 'SE',
    },
    'areaServed': serviceAreaText,
  }
}

/** BreadcrumbList från samma länkar som de synliga brödsmulorna. */
export function breadcrumbJsonLd(items: LinkItem[], siteUrl: string) {
  const base = siteUrl.replace(/\/$/, '')
  return {
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': `${base}${item.href}`,
    })),
  }
}

/** FAQPage-data från samma frågor som visas på sidan. */
export function faqJsonLd(items: { question: string, answer: string }[]) {
  return {
    '@type': 'FAQPage',
    'mainEntity': items.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }
}
