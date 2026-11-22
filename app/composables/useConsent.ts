import {
  CONSENT_EVENT,
  CONSENT_KEY,
  CONSENT_VERSION,
  type ConsentChoice,
  readStoredConsent,
  toGoogleConsent,
} from '#shared/consent'

/**
 * Besökarens samtycke till kakor. Standardläget ("denied") och ett tidigare
 * sparat val sätts redan i <head> (shared/consent.ts). Här hanteras nya val
 * från kakbannern och ändringar via "Kakinställningar".
 *
 * Meta har inget Consent Mode. Meta-taggarna i GTM ska därför bara köras på
 * händelsen consent_update med consent_marketing = true.
 */

/** Kakor som verktygen sätter på vår egen domän och som tas bort när samtycket dras tillbaka. */
const ANALYTICS_COOKIES = ['_ga', '_gid', '_gat']
const MARKETING_COOKIES = ['_gcl', '_fbp', '_fbc']

function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  // Samma format som gtag.js: GTM kräver arguments-objektet, inte en array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments as unknown as Record<string, unknown>)
}

function deleteCookies(prefixes: string[]) {
  const host = window.location.hostname
  const parts = host.split('.')
  // Kakan kan vara satt på värden eller på en överordnad domän (.brfentreprenad.se).
  const domains = ['', ...parts.slice(0, -1).map((_, index) => `.${parts.slice(index).join('.')}`)]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim()
    if (!name || !prefixes.some(prefix => name.startsWith(prefix))) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}

export function useConsent() {
  const choice = useState<ConsentChoice | null>('consent-choice', () => null)
  /** Om inställningarna (andra nivån) visas. */
  const settingsOpen = useState('consent-settings-open', () => false)
  /** Satt när valet har lästs i webbläsaren, så att bannern inte blinkar till. */
  const loaded = useState('consent-loaded', () => false)

  function load() {
    if (import.meta.server || loaded.value) return
    choice.value = readStoredConsent()
    loaded.value = true
  }

  function save(next: { analytics: boolean, marketing: boolean }) {
    const previous = choice.value
    const value: ConsentChoice = { v: CONSENT_VERSION, ts: Date.now(), ...next }
    choice.value = value
    settingsOpen.value = false
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value))
    }
    catch {
      // Utan lagring gäller valet bara den här sidvisningen.
    }

    gtag('consent', 'update', toGoogleConsent(value))
    window.dataLayer?.push({ event: CONSENT_EVENT, consent_analytics: value.analytics, consent_marketing: value.marketing })

    // Landningssidan sparas först när statistik är godkänt (useTracking.ts).
    if (value.analytics) landingPage()
    else {
      deleteCookies(ANALYTICS_COOKIES)
      try {
        window.sessionStorage.removeItem('brf:landningssida')
      }
      catch {
        // sessionStorage kan vara avstängt.
      }
    }
    if (!value.marketing) deleteCookies(MARKETING_COOKIES)

    // Redan laddade skript (t.ex. Meta) kan inte stängas av. Ladda om sidan när
    // ett samtycke dras tillbaka så att de försvinner.
    if (previous && ((previous.analytics && !value.analytics) || (previous.marketing && !value.marketing))) {
      window.location.reload()
    }
  }

  return {
    choice: readonly(choice),
    loaded: readonly(loaded),
    settingsOpen,
    load,
    save,
    acceptAll: () => save({ analytics: true, marketing: true }),
    rejectAll: () => save({ analytics: false, marketing: false }),
    openSettings: () => {
      settingsOpen.value = true
    },
  }
}
