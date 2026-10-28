<script setup lang="ts">
import { serviceAreas, sitePages } from '#shared/site-structure'
import { companyDetails } from '~/content/company'
import { staff } from '~/content/staff'
import type { SelectOption } from '~/types/content'

usePageSeo({
  title: 'Kontakt',
  description: 'Skicka en förfrågan om servicearbete, renovering eller större projekt till BRF Entreprenad. Vi arbetar från Halmstad till Falsterbo.',
  path: sitePages.contact.path,
})

const { hasBooking, actions } = useSiteNavigation()

const subjectOptions: SelectOption[] = [
  ...serviceAreas
    .filter(area => area.status === 'published')
    .map(area => ({ value: area.slug, label: area.title })),
  { value: 'annat', label: 'Annat' },
]
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Kontakt"
      title="Kontakta BRF Entreprenad"
      lead="Skicka en förfrågan om ett servicearbete, en renovering eller ett större projekt."
    />

    <ContactSection
      title="Berätta vad ni behöver hjälp med"
      lead="Beskriv arbetet, var det ska utföras och när ni önskar att det startar. Vi återkommer för att gå igenom förutsättningarna."
      :contact-details="companyDetails"
      :subject-options="subjectOptions"
      form-name="kontakt"
    >
      <div class="space-y-3 border-t border-line pt-6 text-sm text-ink-muted">
        <p v-if="hasBooking">
          Gäller det ett konkret servicearbete kan ni <a :href="actions.service.href" class="text-link">boka service</a> direkt och följa status i ert konto.
        </p>
        <p>
          Uppgifterna i formuläret används för att besvara er förfrågan.
        </p>
      </div>
    </ContactSection>

    <StaffSection
      v-if="staff.length"
      title="Våra medarbetare"
      lead="Ni når oss också direkt."
      :members="staff"
    />
  </div>
</template>
