/** Bekräftade företagsuppgifter. */
import type { ContactDetail } from '~/types/content'

/** BRF Entreprenad är ett varumärke inom bolaget. */
export const legalEntity = {
  name: 'Byggproffs Skåne AB',
  orgNumber: '559073-9669',
}

export const brandRelation = `BRF Entreprenad är ett varumärke inom ${legalEntity.name}.`

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

/** Bekräftat verksamhetsområde. */
export const serviceAreaText = 'Från Halmstad till Falsterbo'

export const companyDetails: ContactDetail[] = [
  { label: 'Telefon', value: phone.display, href: phone.href },
  { label: 'E-post', value: email, href: `mailto:${email}` },
  { label: 'Kontor', value: officeAddress },
  { label: 'Verksamhetsområde', value: serviceAreaText },
]
