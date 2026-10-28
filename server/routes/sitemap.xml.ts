import { publishedPages } from '#shared/site-structure'

/**
 * Teknisk sitemap med publicerade, indexerbara sidor.
 * Kräver produktionsdomänen i NUXT_PUBLIC_SITE_URL och förrenderas bara då
 * (se nuxt.config.ts). Bokningstjänstens vyer ingår aldrig.
 */
export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')

  if (!siteUrl) {
    throw createError({ statusCode: 404, statusMessage: 'Produktionsdomän saknas' })
  }

  const urls = publishedPages()
    .map(page => `  <url><loc>${siteUrl}${page.path}</loc></url>`)
    .join('\n')

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
