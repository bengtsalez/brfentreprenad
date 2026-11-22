<script setup lang="ts">
import { brandRelation, companyDetails, legalEntity, phone } from '~/content/company'

/** Gemensam ram för publika sidor: hoppa-länk, sidhuvud, innehåll, sidfot och mobilens kontaktlist. */
const { mainNav, footerNav, footerCompanyNav, inquiryLink } = useSiteNavigation()
const { openSettings } = useConsent()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#innehall"
      class="sr-only rounded-control bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      Hoppa till innehållet
    </a>

    <SiteHeader :nav-items="mainNav" :contact-link="inquiryLink" logo-href="/" />

    <main id="innehall" tabindex="-1" class="flex-1 focus:outline-none">
      <slot />
    </main>

    <SiteFooter
      description="Renovering och fastighetsservice för bostadsrättsföreningar och fastighetsförvaltare från Halmstad till Falsterbo."
      :service-items="footerNav"
      :nav-items="footerCompanyNav"
      :contact-details="[...companyDetails, { label: 'Förfrågningar', value: 'Skicka en förfrågan', href: inquiryLink.href }]"
      :legal="`© BRF Entreprenad. ${brandRelation} Org.nr ${legalEntity.orgNumber}.`"
      logo-href="/"
    >
      <template #legal-extra>
        <button type="button" class="self-start text-ink-muted underline-offset-4 hover:text-ink hover:underline" @click="openSettings">
          Kakinställningar
        </button>
      </template>
    </SiteFooter>

    <SiteConsentBanner />

    <!-- Plats för kontaktlisten, så att den inte täcker sidfotens sista rad. -->
    <div class="theme-dark h-[calc(4.5rem+env(safe-area-inset-bottom))] bg-canvas md:hidden" aria-hidden="true" />
    <SiteMobileActionBar :inquiry-link="inquiryLink" :phone="phone" />
  </div>
</template>
