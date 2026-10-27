// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

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

  // Projektet har bara byggsidan, så den förrenderas explicit.
  nitro: {
    prerender: {
      routes: ['/build'],
    },
  },
})
