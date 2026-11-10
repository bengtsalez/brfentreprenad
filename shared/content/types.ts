/**
 * Typer för innehåll som både appen och servern (sitemap.xml, förrendering)
 * behöver. Filen får inte importera något från app/.
 */

/** published: får byggas, länkas och tas med i sitemap.xml. draft: internt utkast. */
export type ContentStatus = 'published' | 'draft'

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
}

/**
 * Referensprojekt. Publiceras bara med verkligt underlag och godkännande.
 * Fält som inte får publiceras lämnas tomma och visas då inte.
 */
export interface CaseStudy {
  slug: string
  /** Bara "published" med minst en bild visas, länkas och tas med i sitemap.xml. */
  status: ContentStatus
  title: string
  location: string
  /** Ortssidans slug i shared/content/locations.ts, om projektet hör till en ort. */
  locationSlug?: string
  /** Beställarens namn. Visas bara om `clientPublishable` är true. */
  client?: string
  clientPublishable: boolean
  /** T.ex. "Flerbostadshus, 48 lägenheter, 1960-tal". */
  propertyType: string
  /** Kort beskrivning av uppdraget, t.ex. "Fasadrenovering, totalentreprenad". */
  assignment: string
  /** Tjänstesidor projektet hör till (sökvägar i site-structure.ts). */
  services: string[]
  /** Formulärets tjänstevärde för "Diskutera ett liknande projekt". */
  inquiryService?: string
  year?: string
  /** Bolaget som utförde arbetet. Måste anges, särskilt för projekt utförda av andra bolag. */
  performedBy: string
  /** Företagets faktiska roll, t.ex. "Totalentreprenör" eller "Underentreprenör för markarbeten". */
  role: string
  startingPoint: string
  scope: string[]
  execution: string
  result: string
  /** Bara bilder med användningsrätt. */
  images: ImageAsset[]
  testimonial?: {
    quote: string
    name: string
    role: string
    /** Godkänt av personen för publicering. Utan godkännande visas inget omdöme. */
    approved: boolean
  }
}

export interface GuideSource {
  title: string
  publisher: string
  url: string
  /** Datum då källan kontrollerades, ÅÅÅÅ-MM-DD. */
  checked: string
}

export interface GuideSection {
  title: string
  paragraphs: string[]
  list?: string[]
}

export interface Contributor {
  name: string
  /** Organisation eller person. En person anges bara när uppdraget är bekräftat. */
  type: 'Organization' | 'Person'
  /** T.ex. "Projektledare". Bara för personer. */
  role?: string
}

/** Guide i kunskapsdelen (/kunskap/[slug]/). */
export interface Guide {
  slug: string
  status: ContentStatus
  /** Rubrik (H1). */
  title: string
  metaTitle: string
  metaDescription: string
  /** Kort beskrivning i översikten. */
  summary: string
  /** Direkt svar överst i guiden. */
  answer: string
  author: Contributor
  /** Faktagranskare. Anges bara när uppdraget är bekräftat. */
  reviewer?: Contributor
  /** Publiceringsdatum, ÅÅÅÅ-MM-DD. Sätts när guiden faktiskt publiceras. */
  published?: string
  /** Senaste innehållsliga uppdatering, ÅÅÅÅ-MM-DD. */
  updated: string
  sections: GuideSection[]
  /** Beslutspunkter för styrelsen. */
  decisions?: { title: string, lead?: string, items: { title: string, description: string }[] }
  sources: GuideSource[]
  /** Relaterade tjänstesidor (sökvägar i site-structure.ts). */
  services: string[]
  /** Förvalt kontaktflöde och tjänst i formuläret. */
  inquiry: { flow: 'service' | 'projekt', service?: string }
  /** Internt: vad som saknas innan ett utkast kan publiceras. Visas aldrig. */
  missing?: string[]
}

/** Ortssida under /verksamhetsomrade/[slug]/. */
export interface LocationPage {
  slug: string
  status: ContentStatus
  name: string
  metaTitle: string
  metaDescription: string
  lead: string
  /** Verifierade lokala uppgifter. Utan dem publiceras inte sidan. */
  sections: GuideSection[]
  /** Tjänstesidor som är relevanta på orten. */
  services: string[]
  /** Internt: vad som saknas innan sidan kan publiceras. Visas aldrig. */
  missing?: string[]
}
