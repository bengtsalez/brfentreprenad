import type { InquiryFlow } from '~/types/content'

/**
 * Gemensam mätning av kontakthändelser.
 *
 * Inget analysverktyg är installerat. Händelserna skickas till `window.dataLayer`
 * om ett verktyg (t.ex. Google Tag Manager) läggs till senare, och som
 * DOM-händelsen `brf:track` så att de går att följa och testa. Inga ID:n eller
 * externa skript läggs in här.
 *
 * Skicka aldrig personuppgifter eller fritext: bara tjänst, flöde och sida.
 * `lead_submitted` registreras först när formuläret faktiskt tagits emot.
 * `phone_click` betyder bara att länken klickats, inte att ett samtal skett.
 */
export type TrackingEvent =
  | 'phone_click'
  | 'email_click'
  | 'form_start'
  | 'lead_submitted'
  | 'form_error'

export interface TrackingContext {
  service?: string
  flow?: InquiryFlow
  /** Sökväg utan query, t.ex. /tjanster/fastighetsservice/. Sätts automatiskt om den saknas. */
  page?: string
  /** Typ av fel vid form_error, t.ex. "network" eller "server". Aldrig felmeddelanden med inmatning. */
  reason?: string
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvent(event: TrackingEvent, context: TrackingContext = {}) {
  if (import.meta.server) return

  const payload = {
    event,
    service: context.service ?? null,
    flow: context.flow ?? null,
    page: context.page ?? window.location.pathname,
    ...(context.reason ? { reason: context.reason } : {}),
  }

  window.dataLayer?.push(payload)
  window.dispatchEvent(new CustomEvent('brf:track', { detail: payload }))
}
