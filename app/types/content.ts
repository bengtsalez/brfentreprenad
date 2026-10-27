/** Datastrukturer för innehåll som skickas till sektionerna via props. */

export interface LinkItem {
  label: string
  href: string
}

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
}

export interface SelectOption {
  value: string
  label: string
}

export interface ServiceItem {
  title: string
  description: string
  image?: ImageAsset
  link?: LinkItem
}

export interface BenefitItem {
  title: string
  description: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface ReferenceProject {
  title: string
  description: string
  meta: string
  image: ImageAsset
  /** Kort etikett på kortet, t.ex. "Exempelprojekt". */
  badge?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ContactDetail {
  label: string
  value: string
  href?: string
}
