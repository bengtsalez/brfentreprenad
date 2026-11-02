/**
 * Sidtitel, metabeskrivning, kanonisk URL och delning för en publik sida.
 * Kanonisk URL sätts bara när produktionsdomänen är känd (NUXT_PUBLIC_SITE_URL).
 * `image` används för delning. Utan egen bild används den generella delningsbilden.
 * `jsonLd` läggs in som strukturerad data. Använd bara verifierbara uppgifter.
 */
export function usePageSeo({ title, description, path, image = '/images/og.jpg', jsonLd }: {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}) {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  const absolute = (value: string) => (siteUrl ? `${siteUrl}${value}` : undefined)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogLocale: 'sv_SE',
    ogSiteName: 'BRF Entreprenad',
    ogUrl: absolute(path),
    ogImage: absolute(image),
    ogImageWidth: image === '/images/og.jpg' ? 1200 : undefined,
    ogImageHeight: image === '/images/og.jpg' ? 630 : undefined,
    ogImageAlt: image === '/images/og.jpg' ? 'BRF Entreprenad. Renovering och fastighetsservice för bostadsrättsföreningar.' : undefined,
    twitterCard: 'summary_large_image',
  })

  useHead({
    link: siteUrl ? [{ rel: 'canonical', href: `${siteUrl}${path}` }] : [],
    script: jsonLd
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }]
      : [],
  })
}

/** FAQPage-data från samma frågor som visas på sidan. */
export function faqJsonLd(items: { question: string, answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }
}
