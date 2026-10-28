<script setup lang="ts">
import { sitePages } from '#shared/site-structure'
import { companyDetails } from '~/content/company'
import type { ContactDetail } from '~/types/content'

/** Gemensam ram för publika sidor: hoppa-länk, sidhuvud, innehåll och sidfot. */
const { mainNav, footerNav, footerCompanyNav, actions } = useSiteNavigation()

const contactDetails: ContactDetail[] = [
  ...companyDetails,
  { label: 'Förfrågningar', value: 'Skicka en förfrågan', href: sitePages.contact.path },
]
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#innehall"
      class="sr-only rounded-control bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      Hoppa till innehållet
    </a>

    <SiteHeader :nav-items="mainNav" :contact-link="actions.service" logo-href="/" />

    <main id="innehall" tabindex="-1" class="flex-1 focus:outline-none">
      <slot />
    </main>

    <SiteFooter
      description="Byggservice och entreprenad för bostadsrättsföreningar, fastighetsägare och förvaltare från Halmstad till Falsterbo."
      :service-items="footerNav"
      :nav-items="footerCompanyNav"
      :contact-details="contactDetails"
      legal="© BRF Entreprenad"
      logo-href="/"
    />
  </div>
</template>
