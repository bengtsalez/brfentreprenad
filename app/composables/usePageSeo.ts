import { normalizePath } from '#shared/site-structure'

const DEFAULT_IMAGE = {
  src: '/images/og.jpg',
  alt: 'BRF Entreprenad. Renovering och fastighetsservice för bostadsrättsföreningar.',
  width: 1200,
  height: 630,
}

/**
 * Sidtitel, metabeskrivning, kanonisk URL, delning och strukturerad data för en publik sida.
 *
 * - Titeln får varumärket som ändelse via brandedTitle(), utan dubblering.
 * - Kanonisk URL är alltid produktionsdomänen + sidans sökväg med avslutande
 *   snedstreck. Parametrar (?typ=, utm_ …) ingår aldrig.
 * - `image` används för delning. Utan egen bild används den generella delningsbilden.
 * - `organization` lägger till företagsidentiteten (med stabilt @id).
 * - `jsonLd` läggs till i samma @graph. Använd bara verifierbara uppgifter.
 * - Brödsmulornas BreadcrumbList läggs till av SiteBreadcrumbs.
 * Alla script-element har en fast `key`, så att de ersätts i stället för att
 * dupliceras vid navigering.
 */
export function usePageSeo({ title, description, path, image, type = 'website', organization = false, jsonLd }: {
  title: string
  description: string
  path: string
  image?: { src: string, alt: string, width?: number, height?: number }
  type?: 'website' | 'article'
  organization?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}) {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  const canonicalPath = normalizePath(path)
  const absolute = (value: string) => (siteUrl ? `${siteUrl}${value}` : undefined)
  const shareImage = image ?? DEFAULT_IMAGE
  const fullTitle = brandedTitle(title)

  useSeoMeta({
    title,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: type,
    ogLocale: 'sv_SE',
    ogSiteName: 'BRF Entreprenad',
    ogUrl: absolute(canonicalPath),
    ogImage: absolute(shareImage.src),
    ogImageWidth: shareImage.width,
    ogImageHeight: shareImage.height,
    ogImageAlt: shareImage.alt,
    twitterCard: 'summary_large_image',
  })

  const graph = [
    ...(organization ? [organizationJsonLd(siteUrl)] : []),
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
  ]

  useHead({
    link: siteUrl ? [{ key: 'canonical', rel: 'canonical', href: `${siteUrl}${canonicalPath}` }] : [],
    script: graph.length
      ? [{
          key: 'ld-page',
          type: 'application/ld+json',
          innerHTML: serializeJsonLd({ '@context': 'https://schema.org', '@graph': graph }),
        }]
      : [],
  })
}
