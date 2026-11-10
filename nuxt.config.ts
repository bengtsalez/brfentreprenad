// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { publishedRoutes, unpublishedPaths } from './shared/routes.ts'

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

  // Bara publicerade adresser förrenderas, enligt det gemensamma registret i
  // shared/routes.ts (samma källa som sitemap.xml och länkarna i appen).
  // Dynamiska sidor (referensprojekt, guider, ortssidor) listas uttryckligen och
  // hittas inte bara via länkar. Opublicerade sidor och utkast byggs inte och
  // ger 404. Nuxt förrenderar annars alla sidfiler utan parametrar, därför
  // undantas opublicerade sökvägar.
  nitro: {
    hooks: {
      // 404.html och 200.html är skal som renderas i webbläsaren. noindex läggs
      // in statiskt så att det inte är beroende av JavaScript. Netlify svarar
      // med status 404 för okända adresser och använder 404.html som innehåll.
      'prerender:generate'(route) {
        if ((route.route === '/404.html' || route.route === '/200.html') && typeof route.contents === 'string') {
          route.contents = route.contents.replace('<head>', '<head><meta name="robots" content="noindex">')
        }
      },
    },
    prerender: {
      ignore: [
        ...unpublishedPaths().map(path => path.replace(/\/$/, '')),
        // Byggsidans påhittade referens länkar hit men har ingen projektsida.
        '/referensprojekt/exempelprojekt',
      ],
      routes: [
        '/build',
        ...publishedRoutes().map(route => route.path),
        ...(siteUrl ? ['/sitemap.xml'] : []),
      ],
    },
  },
})
