/**
 * Mäter klick på telefon- och e-postlänkar på hela webbplatsen.
 * Länkar kan ange tjänst och flöde med data-track-service och data-track-flow.
 * Själva numret eller adressen skickas inte med.
 */
import { isInquiryFlow } from '~/content/inquiry'

export default defineNuxtPlugin(() => {
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]')
    if (!(link instanceof HTMLAnchorElement)) return

    const flow = link.closest<HTMLElement>('[data-track-flow]')?.dataset.trackFlow
    trackEvent(link.href.startsWith('tel:') ? 'phone_click' : 'email_click', {
      service: link.closest<HTMLElement>('[data-track-service]')?.dataset.trackService,
      flow: isInquiryFlow(flow) ? flow : undefined,
    })
  }, { capture: true })
})
