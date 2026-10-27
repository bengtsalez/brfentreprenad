/**
 * Hårdkodat exempelinnehåll för byggsidan.
 *
 * Kontaktuppgifter och referensprojekt är påhittade och markerade som exempel.
 */
import type {
  BenefitItem,
  ContactDetail,
  FaqItem,
  ImageAsset,
  LinkItem,
  ProcessStep,
  ReferenceProject,
  SelectOption,
  ServiceItem,
} from '~/types/content'

/** Ankare för sektionerna på byggsidan, så att navigation och knappar har mål. */
export const anchors = {
  services: '#tjanster',
  process: '#process',
  references: '#referenser',
  faq: '#faq',
  contact: '#kontakt',
  header: '#sidhuvud',
}

export const images = {
  facade: {
    src: '/images/placeholders/facade.svg',
    alt: 'Platshållarbild: fasad på ett flerbostadshus',
    width: 1200,
    height: 900,
  },
  entrance: {
    src: '/images/placeholders/entrance.svg',
    alt: 'Platshållarbild: entré med porttelefon',
    width: 1200,
    height: 900,
  },
  stairwell: {
    src: '/images/placeholders/stairwell.svg',
    alt: 'Platshållarbild: trapphus',
    width: 1200,
    height: 900,
  },
} satisfies Record<string, ImageAsset>

export const navItems: LinkItem[] = [
  { label: 'Tjänster', href: anchors.services },
  { label: 'Så arbetar vi', href: anchors.process },
  { label: 'Referenser', href: anchors.references },
  { label: 'Vanliga frågor', href: anchors.faq },
]

export const contactLink: LinkItem = { label: 'Kontakta oss', href: anchors.contact }

export const hero = {
  eyebrow: 'Totalentreprenör för bostadsrättsföreningar',
  title: 'En trygg entreprenör för hela föreningens fastighet',
  lead: 'Vi hjälper bostadsrättsföreningar från Halmstad till Falsterbo med allt från servicejobb och porttelefoni till större renoveringar – med helhetsansvar och en personlig projektledare.',
  primaryAction: { label: 'Boka ett inledande samtal', href: anchors.contact },
  secondaryAction: { label: 'Se våra tjänster', href: anchors.services },
  image: images.facade,
  highlights: ['Helhetsansvar', 'Personlig projektledare', 'Halmstad till Falsterbo'],
}

export const heroCompact = {
  eyebrow: 'Tjänst',
  title: 'Porttelefoni och passersystem',
  lead: 'Byte och uppgradering av porttelefoner och passersystem, planerat så att boende och styrelse vet vad som händer och när.',
  action: { label: 'Boka ett inledande samtal', href: anchors.contact },
}

export const intro = {
  eyebrow: 'Om BRF Entreprenad',
  title: 'En långsiktig partner för föreningens underhåll',
  paragraphs: [
    'Som styrelse ska ni kunna lita på att arbetet blir gjort, att boende får rätt information och att någon håller ihop helheten. Därför arbetar vi som totalentreprenör och tar ansvar för projektet från första samtal till överlämning.',
    'Varje förening får en personlig projektledare som är er kontakt genom hela uppdraget, oavsett om det gäller ett mindre servicejobb eller en större renovering.',
  ],
  action: { label: 'Så arbetar vi', href: anchors.process },
  image: images.stairwell,
}

export const services = {
  eyebrow: 'Tjänster',
  title: 'Från servicejobb till större renoveringar',
  lead: 'Vi samlar föreningens behov hos en entreprenör, så att styrelsen slipper samordna flera leverantörer.',
  items: [
    {
      title: 'Service och underhåll',
      description: 'Löpande servicejobb i trapphus, tvättstugor och gemensamma utrymmen. Ni anmäler behovet, vi planerar och utför.',
      image: images.facade,
      link: { label: 'Fråga om service', href: anchors.contact },
    },
    {
      title: 'Porttelefoni och passersystem',
      description: 'Byte och uppgradering av porttelefoner och passersystem, med tydlig information till de boende.',
      image: images.entrance,
      link: { label: 'Fråga om porttelefoni', href: anchors.contact },
    },
    {
      title: 'Renovering',
      description: 'Renovering av trapphus, entréer och andra gemensamma ytor, med helhetsansvar från planering till överlämning.',
      image: images.stairwell,
      link: { label: 'Fråga om renovering', href: anchors.contact },
    },
  ] satisfies ServiceItem[],
}

export const benefits = {
  eyebrow: 'Varför BRF Entreprenad',
  title: 'Tryggt för styrelsen, smidigt för de boende',
  lead: 'Ett exempel på hur fördelarna kan formuleras. Texten ska stämmas av innan den publiceras.',
  items: [
    {
      title: 'Helhetsansvar',
      description: 'Som totalentreprenör samordnar vi alla delar av uppdraget, så att styrelsen har en part att vända sig till.',
    },
    {
      title: 'Personlig projektledare',
      description: 'Samma kontaktperson följer projektet från start till mål och håller styrelsen informerad.',
    },
    {
      title: 'Stora som små uppdrag',
      description: 'Samma partner för det löpande underhållet och för föreningens större projekt.',
    },
    {
      title: 'Lokalt i Halland och Skåne',
      description: 'Vi arbetar med föreningar längs kusten, från Halmstad i norr till Falsterbo i söder.',
    },
  ] satisfies BenefitItem[],
}

export const process = {
  eyebrow: 'Så arbetar vi',
  title: 'Ett tydligt arbetssätt i fyra steg',
  lead: 'Styrelsen ska alltid veta var projektet står och vad som är nästa steg.',
  steps: [
    {
      title: 'Inledande samtal',
      description: 'Vi går igenom föreningens behov, förutsättningar och önskemål.',
    },
    {
      title: 'Platsbesök och offert',
      description: 'Vi besöker fastigheten och tar fram ett förslag med omfattning, tidplan och pris.',
    },
    {
      title: 'Genomförande',
      description: 'Projektledaren planerar arbetet, samordnar alla moment och håller styrelsen informerad.',
    },
    {
      title: 'Överlämning',
      description: 'Vi går igenom det utförda arbetet tillsammans med styrelsen och lämnar över dokumentation.',
    },
  ] satisfies ProcessStep[],
}

export const references = {
  eyebrow: 'Referensprojekt',
  title: 'Exempel på uppdrag',
  note: 'Projekten nedan är påhittade exempel som visar hur referenser kan presenteras. De ska ersättas med verkliga projekt.',
  items: [
    {
      title: 'Byte av porttelefoni i tre entréer',
      meta: 'Exempelort · Porttelefoni',
      description: 'Påhittat exempel: ny porttelefoni med information till de boende inför och under bytet.',
      image: images.entrance,
      badge: 'Exempelprojekt',
    },
    {
      title: 'Renovering av trapphus',
      meta: 'Exempelort · Renovering',
      description: 'Påhittat exempel: nya ytskikt och belysning i föreningens trapphus, utfört i etapper.',
      image: images.stairwell,
      badge: 'Exempelprojekt',
    },
    {
      title: 'Löpande service i gemensamma utrymmen',
      meta: 'Exempelort · Service',
      description: 'Påhittat exempel: återkommande servicejobb samlade hos en kontaktperson.',
      image: images.facade,
      badge: 'Exempelprojekt',
    },
  ] satisfies ReferenceProject[],
}

export const faq = {
  eyebrow: 'Vanliga frågor',
  title: 'Frågor från styrelser',
  lead: 'Hittar ni inte svaret här är ni välkomna att kontakta oss.',
  items: [
    {
      question: 'Vilka områden arbetar ni i?',
      answer: 'Vi arbetar med bostadsrättsföreningar längs kusten från Halmstad till Falsterbo.',
    },
    {
      question: 'Tar ni även mindre servicejobb?',
      answer: 'Ja. Vi hjälper föreningar med allt från enskilda servicejobb till större renoveringar.',
    },
    {
      question: 'Vad innebär det att ni är totalentreprenör?',
      answer: 'Det innebär att vi tar helhetsansvar för uppdraget och samordnar alla moment, så att föreningen har en part att vända sig till.',
    },
    {
      question: 'Vem har styrelsen kontakt med under ett projekt?',
      answer: 'Ni får en personlig projektledare som är er kontakt genom hela projektet.',
    },
    {
      question: 'Hur går ett inledande samtal till?',
      answer: 'Vi går igenom vad föreningen behöver hjälp med och föreslår ett lämpligt nästa steg, till exempel ett platsbesök.',
    },
  ] satisfies FaqItem[],
}

export const contactDetails: ContactDetail[] = [
  { label: 'Telefon (exempel)', value: '040-000 00 00' },
  { label: 'E-post (exempel)', value: 'kontakt@example.com', href: 'mailto:kontakt@example.com' },
  { label: 'Verksamhetsområde', value: 'Halmstad till Falsterbo' },
]

export const contact = {
  eyebrow: 'Kontakt',
  title: 'Berätta vad föreningen behöver',
  lead: 'Skicka en förfrågan så återkommer en projektledare för att boka ett inledande samtal.',
  contactNote: 'Kontaktuppgifterna är exempel',
  subjectOptions: [
    { value: 'service', label: 'Service och underhåll' },
    { value: 'porttelefoni', label: 'Porttelefoni och passersystem' },
    { value: 'renovering', label: 'Renovering' },
    { value: 'annat', label: 'Annat' },
  ] satisfies SelectOption[],
}

export const cta = {
  title: 'Vill ni prata om föreningens nästa projekt?',
  text: 'Boka ett inledande samtal så går vi igenom era behov och föreslår ett lämpligt nästa steg.',
  primaryAction: { label: 'Boka ett inledande samtal', href: anchors.contact },
  secondaryAction: { label: 'Läs vanliga frågor', href: anchors.faq },
}

export const footer = {
  description: 'Totalentreprenör för bostadsrättsföreningar från Halmstad till Falsterbo. Servicejobb, porttelefoni och renoveringar med helhetsansvar.',
  contactNote: 'Kontaktuppgifterna är exempel och ska ersättas.',
  legal: '© BRF Entreprenad',
}
