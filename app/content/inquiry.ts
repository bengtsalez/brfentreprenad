/**
 * Förfrågningar: tjänster i formuläret och texter för de två kontaktflödena.
 *
 * Service är konkreta reparationer och mindre arbeten. Projekt är planerade
 * renoveringar där styrelsen behöver underlag och en projektledare.
 * Båda flödena använder samma formulär (ContactForm.vue) men skickas till
 * olika formulär i Netlify så att de kan hanteras av olika personer.
 * Fältnamnen måste stämma med public/__forms.html.
 */
import type { InquiryFlow, InquiryService } from '~/types/content'

export const UNKNOWN_SERVICE = 'vet-inte'

export const inquiryServices: InquiryService[] = [
  { value: 'fastighetsservice', label: 'Fastighetsservice eller reparation', flow: 'service' },
  { value: 'porttelefoni-och-passersystem', label: 'Porttelefoni och passersystem' },
  { value: 'fasadrenovering', label: 'Fasadrenovering', flow: 'projekt' },
  { value: 'balkongrenovering', label: 'Balkongrenovering', flow: 'projekt' },
  { value: 'dranering', label: 'Dränering', flow: 'projekt' },
  { value: 'fonster-och-dorrar', label: 'Fönster och dörrar' },
  { value: 'tak', label: 'Tak', flow: 'projekt' },
  { value: 'invandig-renovering', label: 'Trapphus och gemensamma utrymmen', flow: 'projekt' },
  { value: 'mark-och-utemiljo', label: 'Mark och utemiljö' },
  { value: 'annan-renovering', label: 'Annan renovering eller ombyggnad', flow: 'projekt' },
  { value: UNKNOWN_SERVICE, label: 'Vet inte ännu' },
]

export function isInquiryService(value: unknown): value is string {
  return typeof value === 'string' && inquiryServices.some(service => service.value === value)
}

export function isInquiryFlow(value: unknown): value is InquiryFlow {
  return value === 'service' || value === 'projekt'
}

/** Flödet en tjänst hör till, eller undefined om den passar båda. */
export function flowForService(value: string): InquiryFlow | undefined {
  return inquiryServices.find(service => service.value === value)?.flow
}

export interface InquiryFlowText {
  /** Namn i Netlify Forms. */
  formName: string
  label: string
  /** Kort förklaring vid flödesvalet. */
  summary: string
  messageLabel: string
  messageHint: string
  submitLabel: string
  /** Vad som händer efter att förfrågan skickats. Inga löften om svarstid. */
  nextSteps: string[]
}

export const inquiryFlows: Record<InquiryFlow, InquiryFlowText> = {
  service: {
    formName: 'serviceforfragan',
    label: 'Servicearbete',
    summary: 'En reparation eller ett mindre arbete som går att beskriva, till exempel en dörr som inte går i lås eller lösa plattor.',
    messageLabel: 'Vad behöver åtgärdas?',
    messageHint: 'Beskriv felet eller arbetet och var i fastigheten det finns. Skriv gärna om det brådskar eller om ni önskar en viss tid. Skriv inte portkoder här.',
    submitLabel: 'Skicka serviceförfrågan',
    nextSteps: [
      'Förfrågan kommer till oss som ett serviceärende.',
      'Vi hör av oss om något behöver klargöras, till exempel tillträde eller om arbetet behöver ses på plats.',
      'Ni får besked om när arbetet kan utföras. Inget är bokat förrän tiden är bekräftad.',
    ],
  },
  projekt: {
    formName: 'projektforfragan',
    label: 'Planerat projekt',
    summary: 'En renovering som styrelsen planerar, till exempel fasad, balkonger eller dränering, där ni behöver underlag och en kontaktperson.',
    messageLabel: 'Vad planerar ni?',
    messageHint: 'Berätta kort om fastigheten och vad ni funderar på. Nämn gärna om det finns en underhållsplan, besiktning eller tidigare utredning och ungefär när ni vill genomföra arbetet.',
    submitLabel: 'Skicka projektförfrågan',
    nextSteps: [
      'Förfrågan går till en projektledare.',
      'Projektledaren kontaktar er för att gå igenom fastigheten och vad ni planerar.',
      'Ni bestämmer därefter om och hur ni vill gå vidare. En förfrågan förbinder er inte till något.',
    ],
  },
}

/** Länk till kontaktsidan med förvalt flöde och tjänst. */
export function inquiryHref(flow: InquiryFlow, service?: string): string {
  const params = new URLSearchParams({ typ: flow })
  if (service) params.set('tjanst', service)
  return `/kontakt/?${params.toString()}#forfragan`
}
