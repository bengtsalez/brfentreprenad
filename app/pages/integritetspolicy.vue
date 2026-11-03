<script setup lang="ts">
import { sitePages } from '#shared/site-structure'
import { brandRelation, legalEntity, officeAddress } from '~/content/company'

/** Integritetspolicy för förfrågningar via webbplatsen. Uppgifterna kommer från avsnitt 2 i UNDERLAG.md. */
usePageSeo({
  title: 'Integritetspolicy',
  description: 'Så hanterar BRF Entreprenad personuppgifter som du lämnar när du skickar en förfrågan via webbplatsen.',
  path: sitePages.privacy.path,
})

const privacyEmail = 'jonas@byggproffsskane.se'
const updated = '3 november 2026'
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Personuppgifter"
      title="Integritetspolicy"
      lead="Så hanterar vi uppgifterna du lämnar när du skickar en förfrågan via webbplatsen."
    />

    <TextSection
      title="Personuppgiftsansvarig"
      :paragraphs="[
        `${legalEntity.name}, organisationsnummer ${legalEntity.orgNumber}, ${officeAddress}, är personuppgiftsansvarig. ${brandRelation}`,
        `Frågor om hur vi hanterar personuppgifter skickas till ${privacyEmail}.`,
      ]"
    />

    <TextSection
      title="Vilka uppgifter vi samlar in"
      :paragraphs="['När du skickar en service- eller projektförfrågan sparas de uppgifter du fyller i:']"
      :list="[
        'Namn, e-postadress och telefonnummer',
        'Förening eller organisation och ort, om du anger dem',
        'Vilken tjänst förfrågan gäller och ditt meddelande',
        'Vilken sida på webbplatsen förfrågan skickades från',
      ]"
    />

    <TextSection
      title="Varför vi behandlar uppgifterna"
      :paragraphs="[
        'Uppgifterna används för att besvara förfrågan, kontakta dig och vid behov ta fram ett underlag eller en offert. Behandlingen grundar sig på vårt berättigade intresse av att besvara förfrågningar, eller på att den behövs för att ingå ett avtal som du har begärt.',
        'Uppgifterna används inte för marknadsföring och säljs inte vidare.',
      ]"
    />

    <TextSection
      title="Vem som tar del av uppgifterna"
      :paragraphs="[
        `Förfrågningar läses av projektledarna inom BRF Entreprenad och förs vid behov vidare till den projektledare inom ${legalEntity.name} som ansvarar för uppdraget.`,
        'Formulären tas emot via Netlify, som lagrar inskicken åt oss. Netlify är ett amerikanskt företag. Överföringen till USA sker med de skyddsåtgärder som dataskyddsförordningen kräver. Förfrågningar kan även sparas i vår e-post och i vårt eget kundregister.',
      ]"
    />

    <TextSection
      title="Hur länge uppgifterna sparas"
      :paragraphs="[
        'Förfrågningar sparas i 12 månader, både i Netlify och i e-post och övriga system. Därefter raderas de.',
        'Leder förfrågan till ett uppdrag sparas de uppgifter som behövs så länge uppdraget pågår och därefter så länge lagen kräver, till exempel enligt bokföringslagen.',
      ]"
    />

    <TextSection
      title="Dina rättigheter"
      :paragraphs="[`Du har rätt att begära att få veta vilka uppgifter vi har om dig, få felaktiga uppgifter rättade och få uppgifter raderade. Du kan också begära att behandlingen begränsas och invända mot den. Kontakta ${privacyEmail}.`, 'Om du anser att vi behandlar dina uppgifter felaktigt kan du lämna klagomål till Integritetsskyddsmyndigheten (IMY).']"
    >
      <p class="text-sm text-ink-muted">
        Senast uppdaterad {{ updated }}.
      </p>
    </TextSection>
  </div>
</template>
