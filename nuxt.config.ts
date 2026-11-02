// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { allPublicPages, publishedPages } from './shared/site-structure'

// Projektet har inte @types/node, så process deklareras här.
declare const process: { env: Record<string, string | undefined> }

// Produktionsdomänen, bekräftad av beställaren. Kan ersättas med
// NUXT_PUBLIC_SITE_URL, t.ex. för en testmiljö.
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL ?? 'https://www.brfentreprenad.se'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Självhostade typsnitt: bara latin-subset och de vikter som används.
  css: [
    '@fontsource/inter/latin-400.css',
    '@fontsource/inter/latin-600.css',
    '@fontsource/space-grotesk/latin-600.css',
    '~/assets/css/main.css',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Komponenter registreras på filnamn, oavsett undermapp (t.ex. ui/UiButton.vue → <UiButton>).
  components: [{ path: '~/components', pathPrefix: false }],

  app: {
    head: {
      htmlAttrs: { lang: 'sv' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  // Tomma värden betyder att funktionen inte finns ännu. Sätts med
  // NUXT_PUBLIC_SITE_URL, NUXT_PUBLIC_BOOKING_URL och NUXT_PUBLIC_ACCOUNT_URL.
  // Ingen analystjänst är aktiverad. Se app/composables/useTracking.ts.
  runtimeConfig: {
    public: {
      siteUrl,
      /** Den riktiga bokningstjänsten. Utan den visas ingen bokningsknapp. */
      bookingUrl: '',
      /** Kundens ärendeöversikt i bokningstjänsten ("Mina ärenden"). */
      accountUrl: '',
    },
  },

  // Bara publicerade sidor förrenderas. Opublicerade sidor i
  // shared/site-structure.ts byggs inte och ger 404. Nuxt förrenderar annars
  // alla sidfiler utan parametrar, därför undantas opublicerade sökvägar.
  nitro: {
    prerender: {
      ignore: allPublicPages()
        .filter(page => page.status !== 'published')
        .map(page => page.path.replace(/\/$/, '')),
      routes: [
        '/build',
        ...publishedPages().map(page => page.path),
        ...(siteUrl ? ['/sitemap.xml'] : []),
      ],
    },
  },
})
