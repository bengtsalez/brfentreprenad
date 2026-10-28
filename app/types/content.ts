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

export interface StaffMember {
  name: string
  title: string
  /** Visningsformat, t.ex. "070-123 45 67". Länken byggs automatiskt. */
  phone?: string
  email?: string
  /** Utan bild visas initialerna. */
  image?: ImageAsset
}

/** Menyval. Med `children` blir valet en undermeny utan egen sida. */
export interface NavItem {
  label: string
  href?: string
  children?: LinkItem[]
}

/** Rad i en redaktionell lista, t.ex. ett tjänsteområde med exempel på arbeten. */
export interface EntryItem {
  title: string
  description: string
  href?: string
  /** Korta punkter som visas bredvid beskrivningen. */
  items?: string[]
}

export interface TextBlock {
  title: string
  paragraphs: string[]
  /** Valfri punktlista efter styckena. */
  list?: string[]
}

/** Typ av huvudhandling: servicebokning eller projektförfrågan. */
export type ActionKind = 'service' | 'project'

export interface ServicePageContent {
  /** Unik sidtitel och metabeskrivning. */
  metaTitle: string
  metaDescription: string
  title: string
  lead: string
  intro: TextBlock
  /** Rubrik för exempel på arbeten. Listan byggs av undersidorna i site-structure.ts om `examples` saknas. */
  examplesTitle: string
  examples?: EntryItem[]
  /** Samordning och påverkan på boende. */
  coordination?: TextBlock
  faq: FaqItem[]
  /** Sökvägar till relaterade tjänster och målgruppssidor. Opublicerade sidor filtreras bort. */
  related: string[]
  audiences: string[]
  primaryAction: ActionKind
}

export interface AudiencePageContent {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  needs: TextBlock
  servicesTitle: string
  servicesLead: string
  /** Sökvägar till relevanta tjänsteområden. */
  services: string[]
  collaboration: TextBlock
  faq: FaqItem[]
  primaryAction: ActionKind
}

/** Exempel på ett ärende och dess status i bokningstjänsten. */
export interface StatusExample {
  work: string
  status: string
  /** Status före uppdateringen. Exemplet animeras då från den till `status`. */
  previousStatus?: string
}
