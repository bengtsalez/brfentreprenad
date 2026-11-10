import type { InquiryFlow } from '~/types/content'

/**
 * Gemensam mätning av kontakthändelser.
 *
 * Inget analysverktyg är installerat. Händelserna skickas till `window.dataLayer`
 * om ett verktyg (t.ex. Google Tag Manager) läggs till senare, och som
 * DOM-händelsen `brf:track` så att de går att följa och testa. Inga ID:n eller
 * externa skript läggs in här.
 *
 * Skicka aldrig personuppgifter eller fritext: bara tjänst, flöde, sida och
 * landningssida (första sidan i besöket, utan parametrar).
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

const LANDING_KEY = 'brf:landningssida'

/**
 * Första sidan i besöket (sökväg utan query). Sparas i sessionStorage, som
 * töms när fliken stängs. Ingen identitet eller kaka skapas.
 */
export function landingPage(): string {
  if (import.meta.server) return ''
  try {
    const stored = window.sessionStorage.getItem(LANDING_KEY)
    if (stored) return stored
    window.sessionStorage.setItem(LANDING_KEY, window.location.pathname)
  }
  catch {
    // sessionStorage kan vara avstängt. Då används aktuell sida.
  }
  return window.location.pathname
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
    landing_page: landingPage(),
    ...(context.reason ? { reason: context.reason } : {}),
  }

  window.dataLayer?.push(payload)
  window.dispatchEvent(new CustomEvent('brf:track', { detail: payload }))
}
