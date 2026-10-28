/**
 * Sidtitel, metabeskrivning och kanonisk URL för en publik sida.
 * Kanonisk URL sätts bara när produktionsdomänen är känd (NUXT_PUBLIC_SITE_URL).
 */
export function usePageSeo({ title, description, path }: { title: string, description: string, path: string }) {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogLocale: 'sv_SE',
    ogUrl: siteUrl ? `${siteUrl}${path}` : undefined,
  })

  if (siteUrl) {
    useHead({ link: [{ rel: 'canonical', href: `${siteUrl}${path}` }] })
  }
}
