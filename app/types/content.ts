/** Datastrukturer för innehåll som skickas till sektionerna via props. */

// Innehåll som även servern behöver (sitemap.xml, förrendering) definieras i shared/.
import type { ImageAsset } from '#shared/content/types'

export type { CaseStudy, ContentStatus, Guide, GuideSection, GuideSource, ImageAsset, LocationPage } from '#shared/content/types'

export interface LinkItem {
  label: string
  href: string
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
  /** Vad personen ansvarar för. Visas bara när det är bekräftat. */
  responsibility?: string
  /** Visningsformat, t.ex. "070-123 45 67". Länken byggs automatiskt. */
  phone?: string
  email?: string
  /** Utan bild visas initialerna. */
  image?: ImageAsset & {
    /** Mindre variant för srcset, t.ex. 400 px bred. */
    srcSmall?: string
  }
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

/** Kontaktflöde i formuläret. Värdet syns i URL:en (?typ=) och i inskicket. */
export type InquiryFlow = 'service' | 'projekt'

/** Tjänst eller ärendetyp som kan väljas i formuläret. */
export interface InquiryService {
  /** Värdet i URL:en (?tjanst=) och i inskicket. */
  value: string
  label: string
  /** Flödet tjänsten normalt hör till. Saknas när den passar båda. */
  flow?: InquiryFlow
}

/** Ingång till ett av kontaktflödena, t.ex. service eller projekt. */
export interface InquiryChoice {
  eyebrow: string
  title: string
  description: string
  /** Exempel på ärenden som hör hit. */
  examples: string[]
  /** Vad som händer när besökaren hör av sig. */
  next: string
  action: LinkItem
  /** Valfri länk till mer information. */
  link?: LinkItem
}

/** Rad med rubrik och förklaring, t.ex. ett vanligt problem eller en kostnadsfaktor. */
export interface DetailItem {
  title: string
  description: string
}

/** Ett område där styrelsen behöver insyn under ett projekt. */
export interface BoardControlItem {
  title: string
  /** Frågan styrelsen behöver få besvarad. */
  question: string
  description: string
  /**
   * Vad styrelsen får i steget. Visas bara när rutinen är bekräftad av
   * företaget (verified). Obekräftade rutiner listas i LAUNCH_CHECKLIST.md.
   */
  deliverable?: string
  verified: boolean
}

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
  /** Kort ingress till behovsavsnittet. */
  needsTitle?: string
  /** Vanliga behov eller problem som leder till uppdraget. */
  needs?: DetailItem[]
  /** Vad uppdraget kan omfatta. */
  scope?: { title: string, lead?: string, items: DetailItem[] }
  /**
   * Avvägningar som styrelsen behöver göra, t.ex. lagning eller större
   * renovering. Leaden ger ett kort svar, raderna utvecklar det.
   */
  decisions?: { title: string, lead?: string, items: DetailItem[] }
  /** Kort checklista, t.ex. vad som är bra att ha med i förfrågan. */
  checklist?: { title: string, lead?: string, items: string[] }
  /** Hur arbetet planeras och genomförs, specifikt för tjänsten. */
  planning?: { title: string, lead?: string, steps: ProcessStep[] }
  /** Vad som påverkar omfattning och kostnad. */
  costFactors?: { title: string, lead: string, items: DetailItem[] }
  /** Hur boende och styrelse påverkas. */
  residents?: { title: string, board: TextBlock, residents: TextBlock }
  /** Formulärets förvalda tjänst (värde i app/content/inquiry.ts). */
  inquiryService?: string
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
