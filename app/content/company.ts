/**
 * Bekräftade företagsuppgifter. Organisationsnummer läggs till här
 * när det är bekräftat.
 */
import type { ContactDetail } from '~/types/content'

export const office = {
  street: 'Östergatan 112',
  zip: '261 32',
  city: 'Landskrona',
}

export const officeAddress = `${office.street}, ${office.zip} ${office.city}`

export const phone = {
  display: '010-160 05 06',
  href: 'tel:+46101600506',
}

export const email = 'info@brfentreprenad.se'

export const companyDetails: ContactDetail[] = [
  { label: 'Telefon', value: phone.display, href: phone.href },
  { label: 'E-post', value: email, href: `mailto:${email}` },
  { label: 'Kontor', value: officeAddress },
  { label: 'Verksamhetsområde', value: 'Från Halmstad till Falsterbo' },
]
