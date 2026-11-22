/**
 * Samtycke till kakor (Google Consent Mode v2, advanced).
 *
 * Besökarens val sparas i localStorage under CONSENT_KEY. Det räknas som
 * nödvändig lagring, eftersom valet annars inte kan respekteras. Valet gäller i
 * CONSENT_MAX_AGE_DAYS dagar. Höj CONSENT_VERSION när nya verktyg eller
 * leverantörer läggs till, så frågas alla besökare igen.
 *
 * Samma regler används av skriptet i <head> (consentBootstrapScript, körs före
 * Google Tag Manager) och av app/composables/useConsent.ts.
 */

export const CONSENT_KEY = 'brf:samtycke'
export const CONSENT_VERSION = 1
export const CONSENT_MAX_AGE_DAYS = 365

/** Händelsen som skickas till dataLayer när samtycket är känt eller ändras. */
export const CONSENT_EVENT = 'consent_update'

export interface ConsentChoice {
  /** CONSENT_VERSION när valet gjordes. */
  v: number
  /** Tidpunkt för valet, millisekunder sedan 1970. */
  ts: number
  /** Statistik: Google Analytics. */
  analytics: boolean
  /** Marknadsföring: Google Ads och Meta. */
  marketing: boolean
}

export type GoogleConsentState = 'granted' | 'denied'

export function toGoogleConsent(choice: Pick<ConsentChoice, 'analytics' | 'marketing'>) {
  const state = (value: boolean): GoogleConsentState => (value ? 'granted' : 'denied')
  return {
    analytics_storage: state(choice.analytics),
    ad_storage: state(choice.marketing),
    ad_user_data: state(choice.marketing),
    ad_personalization: state(choice.marketing),
  }
}

/** Ett sparat val som gäller: rätt version och inte äldre än CONSENT_MAX_AGE_DAYS. */
export function parseConsent(raw: string | null, now = Date.now()): ConsentChoice | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw) as Partial<ConsentChoice>
    if (value?.v !== CONSENT_VERSION || typeof value.ts !== 'number') return null
    if (now - value.ts > CONSENT_MAX_AGE_DAYS * 86_400_000 || value.ts > now + 86_400_000) return null
    return { v: value.v, ts: value.ts, analytics: value.analytics === true, marketing: value.marketing === true }
  }
  catch {
    return null
  }
}

/** Läser sparat val i webbläsaren. null om inget giltigt val finns eller lagringen är avstängd. */
export function readStoredConsent(): ConsentChoice | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY))
  }
  catch {
    return null
  }
}

/**
 * Inline-skript som måste ligga före gtm.js i <head>. Sätter allt till
 * "denied" som standard, och läser sedan ett tidigare val så att återkommande
 * besökare inte behöver vänta på Vue. Samtycket uppdateras före händelsen
 * gtm.js, så att sidvisningstaggar ser rätt läge. consent_update skickas efter,
 * så att GTM:s sidvisningsläge redan finns när Meta-taggarna triggas.
 */
export function consentBootstrapScript(): string {
  const maxAge = CONSENT_MAX_AGE_DAYS * 86_400_000
  return `window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
(function(){var c=null;try{
c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_KEY)})||'null');var n=Date.now();
if(!(c&&c.v===${CONSENT_VERSION}&&typeof c.ts==='number'&&n-c.ts<=${maxAge}&&c.ts<=n+86400000))c=null;
}catch(e){c=null}
var a=!!c&&c.analytics===true,m=!!c&&c.marketing===true,s=function(v){return v?'granted':'denied'};
if(c)gtag('consent','update',{analytics_storage:s(a),ad_storage:s(m),ad_user_data:s(m),ad_personalization:s(m)});
dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
if(c)dataLayer.push({event:${JSON.stringify(CONSENT_EVENT)},consent_analytics:a,consent_marketing:m});
})();`
}
