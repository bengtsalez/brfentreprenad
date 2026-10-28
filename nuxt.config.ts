// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { publishedPages } from './shared/site-structure'

// Projektet har inte @types/node, så process deklareras här.
declare const process: { env: Record<string, string | undefined> }

// Produktionsdomänen sätts i Netlify, den hittas inte på här.
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL ?? ''

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
  // shared/site-structure.ts byggs inte och ger 404.
  nitro: {
    prerender: {
      routes: [
        '/build',
        ...publishedPages().map(page => page.path),
        ...(siteUrl ? ['/sitemap.xml'] : []),
      ],
    },
  },
})
