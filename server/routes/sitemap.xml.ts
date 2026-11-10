import { sitemapXml } from '#shared/routes'

/**
 * Teknisk sitemap med alla publicerade, indexerbara adresser: statiska sidor,
 * referensprojekt, guider och ortssidor. Listan kommer från shared/routes.ts,
 * samma register som styr förrendering och länkar. Utkast, byggsidan,
 * formulärdefinitioner och bokningstjänstens vyer ingår aldrig.
 * Kräver produktionsdomänen i NUXT_PUBLIC_SITE_URL och förrenderas bara då
 * (se nuxt.config.ts).
 */
export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')

  if (!siteUrl) {
    throw createError({ statusCode: 404, statusMessage: 'Produktionsdomän saknas' })
  }

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return sitemapXml(siteUrl)
})
