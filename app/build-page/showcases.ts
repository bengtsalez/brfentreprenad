/**
 * Byggsidans egna etiketter: namn, ankare och beskrivning för varje del.
 * Hålls separat från exempelinnehållet som skickas till komponenterna.
 */

export interface ShowcaseMeta {
  id: string
  title: string
  description: string
}

export const componentShowcases = {
  typography: {
    id: 'typografi',
    title: 'Typografi',
    description: 'Rubrikstorlekar, ingress, brödtext och textlänkar. Storleken styrs av utilities (heading-xl, lead …) oberoende av rubriknivå.',
  },
  buttons: {
    id: 'knappar',
    title: 'Knappar',
    description: 'UiButton i tre varianter. Primär för huvudhandlingen, sekundär för alternativ, text för mindre framträdande länkar.',
  },
  buttonStates: {
    id: 'knapptillstand',
    title: 'Knapptillstånd',
    description: 'Fokus visas vid tangentbordsnavigering (prova Tab). Inaktiverat läge används när en handling inte är tillgänglig ännu.',
  },
  badges: {
    id: 'etiketter',
    title: 'Etiketter och badges',
    description: 'Överrubrik (eyebrow) ovanför rubriker och UiBadge för korta statusmarkeringar, t.ex. "Exempelprojekt".',
  },
  formFields: {
    id: 'formularfalt',
    title: 'Formulärfält',
    description: 'UiInput, UiTextarea, UiSelect och UiCheckbox. Alla har kopplad etikett och stöd för hjälptext och fel.',
  },
  messages: {
    id: 'meddelanden',
    title: 'Hjälptext, fel och bekräftelse',
    description: 'Hjälptext och felmeddelanden kopplas till fältet med aria-describedby. UiAlert används för meddelanden till användaren.',
  },
  cards: {
    id: 'kort',
    title: 'Kort',
    description: 'UiCard med eller utan bild. Används i tjänsteöversikt och referensprojekt.',
  },
  layout: {
    id: 'container-och-sektion',
    title: 'Container och sektion',
    description: 'UiSection ger bakgrund och vertikalt avstånd, UiContainer ger konsekvent innehållsbredd och sidmarginal.',
  },
} satisfies Record<string, ShowcaseMeta>

export const sectionShowcases = {
  header: {
    id: 'sidhuvud',
    title: 'Sidhuvud',
    description: 'SiteHeader med logotyp, huvudnavigation och kontaktknapp. Navigationen fälls ihop till en meny när utrymmet är smalt.',
  },
  mobileMenu: {
    id: 'mobilmeny',
    title: 'Mobilmeny',
    description: 'Samma SiteHeader i en smal ram. Menyn öppnas med knappen, stängs med Escape och följer knappens aria-expanded.',
  },
  hero: {
    id: 'hero',
    title: 'Hero',
    description: 'HeroSection överst på en startsida: rubrik, ingress, två knappar och bild.',
  },
  heroCompact: {
    id: 'hero-kompakt',
    title: 'Kompakt hero',
    description: 'HeroCompactSection för undersidor där en bild inte behövs.',
  },
  intro: {
    id: 'introduktion',
    title: 'Introduktion',
    description: 'IntroSection med text och bild. Bilden kan placeras till vänster eller höger.',
  },
  services: {
    id: 'tjansteoversikt',
    title: 'Tjänsteöversikt',
    description: 'ServicesSection visar tjänster som kort i ett responsivt rutnät.',
  },
  benefits: {
    id: 'fordelar',
    title: 'Fördelar',
    description: 'BenefitsSection för att beskriva varför man väljer BRF Entreprenad.',
  },
  process: {
    id: 'arbetsprocess',
    title: 'Arbetsprocess',
    description: 'ProcessSection beskriver arbetet i numrerade steg.',
  },
  references: {
    id: 'referensprojekt',
    title: 'Referensprojekt',
    description: 'ReferencesSection visar projekt som kort. Exemplen nedan är påhittade och tydligt markerade.',
  },
  faq: {
    id: 'vanliga-fragor',
    title: 'FAQ',
    description: 'FaqSection med expanderbara svar. Fungerar med tangentbord och har aria-expanded och aria-controls.',
  },
  contact: {
    id: 'kontaktsektion',
    title: 'Kontakt',
    description: 'ContactSection med kontaktuppgifter och formulär. Formuläret validerar i webbläsaren men skickar ingenting.',
  },
  cta: {
    id: 'cta',
    title: 'CTA',
    description: 'CtaSection för att uppmana till ett inledande samtal, t.ex. längst ned på en sida.',
  },
  footer: {
    id: 'sidfot',
    title: 'Sidfot',
    description: 'SiteFooter med kort beskrivning, genvägar och kontaktuppgifter.',
  },
} satisfies Record<string, ShowcaseMeta>
