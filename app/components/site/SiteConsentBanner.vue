<script setup lang="ts">
import { sitePages } from '#shared/site-structure'

/**
 * Kakbanner. Visas tills besökaren har gjort ett val och igen när valet är
 * äldre än 12 månader eller "Kakinställningar" öppnas.
 *
 * Regler (LEK 9 kap. 28 §, GDPR, IMY/EDPB):
 * - "Neka alla" är lika synlig som "Godkänn alla".
 * - Inga förvalda kategorier utöver nödvändiga.
 * - Sajten går att använda utan att välja (ingen kakvägg).
 */
const { choice, loaded, settingsOpen, load, save, acceptAll, rejectAll } = useConsent()

const analytics = ref(false)
const marketing = ref(false)

const visible = computed(() => loaded.value && (!choice.value || settingsOpen.value))

const headingId = useId()

watch(settingsOpen, async (open) => {
  if (!open) return
  // Visa nuvarande val i inställningarna och flytta fokus dit.
  analytics.value = choice.value?.analytics ?? false
  marketing.value = choice.value?.marketing ?? false
  await nextTick()
  document.getElementById(headingId)?.focus()
})

function onKeydown(event: KeyboardEvent) {
  // Escape stänger bara inställningarna om ett val redan finns.
  if (event.key === 'Escape' && choice.value && settingsOpen.value) settingsOpen.value = false
}

onMounted(load)
</script>

<template>
  <section
    v-if="visible"
    :aria-labelledby="headingId"
    class="fixed inset-x-0 bottom-0 z-40 max-h-[85vh] overflow-y-auto border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] shadow-card-hover"
    data-consent-banner
    @keydown="onKeydown"
  >
    <UiContainer class="py-5 md:py-6">
      <div class="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-10">
        <div class="space-y-2">
          <UiHeading :id="headingId" :level="2" size="xs" tabindex="-1" class="focus:outline-none">
            Vi använder kakor
          </UiHeading>
          <p class="max-w-prose text-sm text-ink-muted">
            Nödvändiga kakor behövs för att webbplatsen ska fungera. Med ditt samtycke använder vi även
            Google Analytics för att förstå hur webbplatsen används, och Google Ads och Meta för att mäta
            och anpassa våra annonser. Du kan ändra ditt val när som helst under "Kakinställningar" längst ned på sidan.
            <a :href="sitePages.cookies.path" class="text-link">Om kakor</a>
            ·
            <a :href="sitePages.privacy.path" class="text-link">Integritetspolicy</a>
          </p>
        </div>

        <div v-if="!settingsOpen" class="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
          <UiButton size="sm" @click="rejectAll">
            Neka alla
          </UiButton>
          <UiButton size="sm" @click="acceptAll">
            Godkänn alla
          </UiButton>
          <UiButton size="sm" variant="secondary" @click="settingsOpen = true">
            Anpassa
          </UiButton>
        </div>
      </div>

      <form v-if="settingsOpen" class="mt-5 space-y-5 border-t border-line pt-5" @submit.prevent="save({ analytics, marketing })">
        <fieldset class="grid gap-5 md:grid-cols-3">
          <legend class="sr-only">
            Välj vilka kakor du godkänner
          </legend>
          <UiCheckbox
            :model-value="true"
            disabled
            label="Nödvändiga"
            hint="Kommer ihåg ditt val om kakor. Kan inte stängas av."
          />
          <UiCheckbox
            v-model="analytics"
            name="analytics"
            label="Statistik"
            hint="Google Analytics. Visar hur webbplatsen används, till exempel vilka sidor som besöks."
          />
          <UiCheckbox
            v-model="marketing"
            name="marketing"
            label="Marknadsföring"
            hint="Google Ads och Meta (Facebook, Instagram). Mäter och anpassar annonser."
          />
        </fieldset>
        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <UiButton type="submit" size="sm">
            Spara val
          </UiButton>
          <UiButton size="sm" variant="secondary" @click="rejectAll">
            Neka alla
          </UiButton>
          <UiButton size="sm" variant="secondary" @click="acceptAll">
            Godkänn alla
          </UiButton>
        </div>
      </form>
    </UiContainer>
  </section>
</template>
