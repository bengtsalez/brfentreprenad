<script setup lang="ts">
import { sitePages } from '#shared/site-structure'
import { companyDetails } from '~/content/company'
import { inquiryFlows } from '~/content/inquiry'
import { staff } from '~/content/staff'

/*
 * Kontaktsidan. Flöde och tjänst kan förväljas med ?typ=service|projekt och
 * ?tjanst=<värde> (se app/content/inquiry.ts). Valet skrivs tillbaka i URL:en
 * så att det finns kvar vid omladdning.
 */
usePageSeo({
  title: 'Kontakt',
  description: 'Skicka en serviceförfrågan eller berätta om ett planerat projekt. BRF Entreprenad arbetar med bostadsrättsföreningar och förvaltare från Halmstad till Falsterbo.',
  path: sitePages.contact.path,
})

const { hasBooking, actions } = useSiteNavigation()
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Kontakt"
      title="Kontakta BRF Entreprenad"
      lead="Skicka en förfrågan om ett servicearbete eller ett planerat projekt, eller ring oss direkt. Ni behöver inget konto."
    >
      <template #aside>
        <dl class="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <div v-for="(flow, key) in inquiryFlows" :key="key" class="space-y-2 border-t border-line pt-5">
            <dt class="font-semibold">
              {{ flow.label }}
            </dt>
            <dd class="text-sm text-ink-muted">
              {{ flow.summary }}
            </dd>
          </div>
        </dl>
      </template>
    </HeroCompactSection>

    <ContactSection
      title="Berätta vad ni behöver hjälp med"
      lead="Välj om det gäller ett servicearbete eller ett planerat projekt. Vet ni inte vilken tjänst det gäller går det bra att välja Vet inte ännu."
      :contact-details="companyDetails"
      sync-url
    >
      <div class="space-y-3 border-t border-line pt-6 text-sm text-ink-muted">
        <p v-if="hasBooking">
          Gäller det ett konkret servicearbete kan ni också <a :href="actions.service.href" class="text-link">boka service</a> direkt.
        </p>
        <p>
          Uppgifterna i formuläret används för att besvara er förfrågan.
        </p>
      </div>
    </ContactSection>

    <StaffSection
      v-if="staff.length"
      title="Kontakta oss direkt"
      lead="Ni kan också ringa eller mejla någon av oss."
      :members="staff"
    />
  </div>
</template>
