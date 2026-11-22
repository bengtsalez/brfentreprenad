<script setup lang="ts">
import { CONSENT_MAX_AGE_DAYS } from '#shared/consent'
import { sitePages } from '#shared/site-structure'
import { legalEntity } from '~/content/company'

/**
 * Information om kakor och samtycke. Ska stämma med taggarna i Google Tag
 * Manager (GTM-W6DPW3DJ) och med shared/consent.ts. Läggs ett nytt verktyg
 * till: uppdatera tabellen och höj CONSENT_VERSION så att alla tillfrågas igen.
 */
usePageSeo({
  title: 'Kakor',
  description: 'Vilka kakor BRF Entreprenad använder på webbplatsen, varför, hur länge de sparas och hur du ändrar ditt samtycke.',
  path: sitePages.cookies.path,
})

const { openSettings } = useConsent()
const updated = '22 november 2026'

interface CookieRow {
  name: string
  provider: string
  purpose: string
  lifetime: string
}

const groups: { title: string, description: string, rows: CookieRow[] }[] = [
  {
    title: 'Nödvändiga',
    description: 'Behövs för att webbplatsen ska fungera och för att ditt val om kakor ska respekteras. Kräver inte samtycke.',
    rows: [
      { name: 'brf:samtycke', provider: 'BRF Entreprenad (lokal lagring)', purpose: 'Sparar ditt val om kakor.', lifetime: `${Math.round(CONSENT_MAX_AGE_DAYS / 30)} månader` },
    ],
  },
  {
    title: 'Statistik',
    description: 'Hjälper oss att förstå hur webbplatsen används, till exempel vilka sidor som besöks och hur många som skickar en förfrågan. Används bara om du godkänner statistik.',
    rows: [
      { name: '_ga', provider: 'Google Analytics', purpose: 'Skiljer besökare åt.', lifetime: '2 år' },
      { name: '_ga_<id>', provider: 'Google Analytics', purpose: 'Håller ordning på besöket (sessionen).', lifetime: '2 år' },
      { name: 'brf:landningssida', provider: 'BRF Entreprenad (sessionslagring)', purpose: 'Kommer ihåg första sidan i besöket, så att vi ser vilka sidor som leder till förfrågningar.', lifetime: 'Tills fliken stängs' },
    ],
  },
  {
    title: 'Marknadsföring',
    description: 'Används för att mäta om våra annonser leder till besök och förfrågningar, och för att visa annonser som är relevanta för dig. Används bara om du godkänner marknadsföring.',
    rows: [
      { name: '_gcl_au', provider: 'Google Ads', purpose: 'Mäter konverteringar från annonser.', lifetime: '90 dagar' },
      { name: '_gcl_aw', provider: 'Google Ads', purpose: 'Kommer ihåg vilken annons du klickade på.', lifetime: '90 dagar' },
      { name: 'IDE, test_cookie', provider: 'Google (doubleclick.net)', purpose: 'Annonsvisning och mätning av annonser.', lifetime: '15 minuter till 13 månader' },
      { name: '_fbp', provider: 'Meta', purpose: 'Skiljer besökare åt för mätning av annonser på Facebook och Instagram.', lifetime: '90 dagar' },
      { name: '_fbc', provider: 'Meta', purpose: 'Kommer ihåg vilken annons du klickade på.', lifetime: '90 dagar' },
      { name: 'fr', provider: 'Meta (facebook.com)', purpose: 'Annonsvisning och mätning av annonser.', lifetime: '90 dagar' },
    ],
  },
]
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Personuppgifter"
      title="Kakor"
      lead="Vilka kakor vi använder, varför, och hur du ändrar ditt val."
    />

    <TextSection
      title="Vad kakor är"
      :paragraphs="[
        'Kakor (cookies) är små textfiler som sparas i din webbläsare. Liknande tekniker, som lokal lagring i webbläsaren, räknas på samma sätt och tas upp här.',
        'Enligt lagen om elektronisk kommunikation (9 kap. 28 §) får vi bara spara eller läsa sådan information om den behövs för att webbplatsen ska fungera, eller om du har samtyckt. Samtycket är frivilligt och du kan ändra det när som helst.',
      ]"
    >
      <UiButton @click="openSettings">
        Ändra dina val
      </UiButton>
    </TextSection>

    <TextSection
      v-for="group in groups"
      :key="group.title"
      :title="group.title"
      :paragraphs="[group.description]"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[32rem] text-left text-sm">
          <thead class="border-b border-line-strong">
            <tr>
              <th scope="col" class="py-2 pr-4 font-semibold">
                Namn
              </th>
              <th scope="col" class="py-2 pr-4 font-semibold">
                Leverantör
              </th>
              <th scope="col" class="py-2 pr-4 font-semibold">
                Syfte
              </th>
              <th scope="col" class="py-2 font-semibold">
                Livslängd
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in group.rows" :key="row.name" class="border-b border-line align-top">
              <td class="py-2 pr-4 font-mono text-xs">
                {{ row.name }}
              </td>
              <td class="py-2 pr-4">
                {{ row.provider }}
              </td>
              <td class="py-2 pr-4 text-ink-muted">
                {{ row.purpose }}
              </td>
              <td class="py-2 whitespace-nowrap">
                {{ row.lifetime }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </TextSection>

    <TextSection
      title="Om du nekar"
      :paragraphs="[
        'Nekar du sätts inga kakor för statistik eller marknadsföring, och Metas verktyg laddas inte alls.',
        'Google Tag Manager laddas ändå. Googles verktyg kan då skicka signaler utan kakor, till exempel att en sida har visats, tillsammans med teknisk information som webbläsare och IP-adress. Ingenting sparas eller läses i din webbläsare och signalerna kopplas inte till dig. Google använder dem för att uppskatta statistik i sammanställd form.',
      ]"
    />

    <TextSection
      title="Överföring till USA"
      :paragraphs="[
        'Google och Meta är amerikanska företag. Uppgifter som samlas in med kakorna kan därför föras över till USA. Båda företagen är anslutna till EU-US Data Privacy Framework, som enligt EU-kommissionen ger en adekvat skyddsnivå.',
        `${legalEntity.name} är personuppgiftsansvarig för behandlingen. Den rättsliga grunden är ditt samtycke (artikel 6.1 a i dataskyddsförordningen). Läs mer om dina rättigheter i vår integritetspolicy.`,
      ]"
    >
      <p>
        <a :href="sitePages.privacy.path" class="text-link">Integritetspolicy</a>
      </p>
      <p class="text-sm text-ink-muted">
        Senast uppdaterad {{ updated }}.
      </p>
    </TextSection>
  </div>
</template>
