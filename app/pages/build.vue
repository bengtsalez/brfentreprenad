<script setup lang="ts">
import * as content from '~/build-page/example-content'
import { componentShowcases as ui, sectionShowcases as sections } from '~/build-page/showcases'

/*
 * Byggsidan: intern katalog över hemsidans byggdelar.
 * Etiketter och beskrivningar kommer från showcases.ts,
 * exempelinnehållet från example-content.ts.
 */

useSeoMeta({
  title: 'Byggsida',
  description: 'Intern katalog över komponenter och sektioner för BRF Entreprenads hemsida.',
  robots: 'noindex, nofollow',
})

const navGroups = [
  { title: 'Grundkomponenter', items: Object.values(ui) },
  { title: 'Sidsektioner', items: Object.values(sections) },
]

const demoForm = reactive({
  text: '',
  email: '',
  phone: '',
  message: '',
  choice: '',
  checked: false,
  invalidEmail: 'namn@',
})
</script>

<template>
  <div class="min-h-screen bg-subtle">
    <a
      href="#innehall"
      class="sr-only rounded-control bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      Hoppa till innehållet
    </a>

    <header class="border-b border-line bg-canvas">
      <div class="space-y-3 px-gutter py-8 sm:py-10">
        <UiBadge variant="outline">
          Internt arbetsverktyg · indexeras inte
        </UiBadge>
        <h1 class="heading-lg">
          Byggsida för BRF Entreprenad
        </h1>
        <p class="lead max-w-prose">
          Katalog över grundkomponenter och sidsektioner. Allt innehåll är exempeltext som skickas in via props och slots.
        </p>
      </div>
    </header>

    <div class="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside class="border-b border-line bg-canvas lg:border-r lg:border-b-0">
        <nav aria-label="Byggsidans innehåll" class="px-gutter py-6 lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto lg:px-6">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div v-for="group in navGroups" :key="group.title">
              <p class="eyebrow mb-2">
                {{ group.title }}
              </p>
              <ul class="space-y-0.5">
                <li v-for="item in group.items" :key="item.id">
                  <a
                    :href="`#${item.id}`"
                    class="block rounded-control px-2 py-1.5 text-sm text-ink-muted hover:bg-subtle hover:text-ink"
                  >
                    {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>

      <main id="innehall" tabindex="-1" class="min-w-0 focus:outline-none">
        <!-- Grundkomponenter -->

        <BuildShowcase v-bind="ui.typography">
          <BuildExample label="Rubriker">
            <div class="space-y-4">
              <p class="heading-xl">
                heading-xl – Sidrubrik
              </p>
              <p class="heading-lg">
                heading-lg – Sektionsrubrik
              </p>
              <p class="heading-md">
                heading-md – Underrubrik
              </p>
              <p class="heading-sm">
                heading-sm – Kortrubrik
              </p>
              <p class="heading-xs">
                heading-xs – Liten rubrik
              </p>
            </div>
          </BuildExample>
          <BuildExample label="Ingress, brödtext och textlänk">
            <div class="max-w-prose space-y-4">
              <p class="lead">
                Ingress: vi hjälper bostadsrättsföreningar med allt från servicejobb till större renoveringar.
              </p>
              <p>
                Brödtext: som totalentreprenör tar vi helhetsansvar för uppdraget och samordnar alla moment. Varje förening får en
                personlig projektledare. Läs mer om <a href="#arbetsprocess" class="text-link">hur vi arbetar</a>.
              </p>
              <p class="text-sm text-ink-muted">
                Liten text för metainformation och hjälptexter.
              </p>
            </div>
          </BuildExample>
        </BuildShowcase>

        <BuildShowcase v-bind="ui.buttons">
          <BuildExample label="Varianter">
            <div class="flex flex-wrap items-center gap-4">
              <UiButton>Primär knapp</UiButton>
              <UiButton variant="secondary">
                Sekundär knapp
              </UiButton>
              <UiButton variant="text">
                Textknapp
                <UiIcon name="arrow-right" size="sm" />
              </UiButton>
            </div>
          </BuildExample>
          <BuildExample label="Liten storlek" note="Används t.ex. i sidhuvudet.">
            <div class="flex flex-wrap items-center gap-4">
              <UiButton size="sm">
                Primär
              </UiButton>
              <UiButton size="sm" variant="secondary">
                Sekundär
              </UiButton>
            </div>
          </BuildExample>
          <BuildExample label="Som länk" note="Med href renderas knappen som en länk. Den här leder till kontaktsektionen.">
            <UiButton :href="content.anchors.contact">
              Boka ett inledande samtal
            </UiButton>
          </BuildExample>
          <BuildExample label="På mörk bakgrund">
            <div class="theme-dark flex flex-wrap items-center gap-4 rounded-card bg-canvas p-6 text-ink">
              <UiButton>Primär knapp</UiButton>
              <UiButton variant="secondary">
                Sekundär knapp
              </UiButton>
              <UiButton variant="text">
                Textknapp
              </UiButton>
            </div>
          </BuildExample>
        </BuildShowcase>

        <BuildShowcase v-bind="ui.buttonStates">
          <BuildExample label="Fokus (simulerad)" note="Samma markering som visas när knappen nås med tangentbordet.">
            <div class="flex flex-wrap items-center gap-4">
              <UiButton class="outline-3 outline-offset-2 outline-focus">
                Primär
              </UiButton>
              <UiButton variant="secondary" class="outline-3 outline-offset-2 outline-focus">
                Sekundär
              </UiButton>
              <UiButton variant="text" class="outline-3 outline-offset-2 outline-focus">
                Textknapp
              </UiButton>
            </div>
          </BuildExample>
          <BuildExample label="Inaktiverad">
            <div class="flex flex-wrap items-center gap-4">
              <UiButton disabled>
                Primär
              </UiButton>
              <UiButton variant="secondary" disabled>
                Sekundär
              </UiButton>
              <UiButton variant="text" disabled>
                Textknapp
              </UiButton>
            </div>
          </BuildExample>
        </BuildShowcase>

        <BuildShowcase v-bind="ui.badges">
          <BuildExample label="Överrubrik (eyebrow)">
            <p class="eyebrow">
              Totalentreprenör för bostadsrättsföreningar
            </p>
          </BuildExample>
          <BuildExample label="Badges">
            <div class="flex flex-wrap gap-3">
              <UiBadge>Neutral</UiBadge>
              <UiBadge variant="accent">
                Exempelprojekt
              </UiBadge>
              <UiBadge variant="outline">
                Kontaktuppgifterna är exempel
              </UiBadge>
            </div>
          </BuildExample>
        </BuildShowcase>

        <BuildShowcase v-bind="ui.formFields">
          <div class="grid max-w-narrow gap-6 sm:grid-cols-2">
            <UiInput v-model="demoForm.text" label="Namn" autocomplete="name" required />
            <UiInput v-model="demoForm.email" label="E-post" type="email" autocomplete="email" required />
            <UiInput v-model="demoForm.phone" label="Telefon" type="tel" autocomplete="tel" />
            <UiSelect
              v-model="demoForm.choice"
              label="Vad gäller ärendet?"
              :options="content.contact.subjectOptions"
            />
            <UiTextarea v-model="demoForm.message" label="Meddelande" class="sm:col-span-2" />
            <UiCheckbox v-model="demoForm.checked" label="Jag godkänner att BRF Entreprenad kontaktar mig." class="sm:col-span-2" />
            <UiInput label="Inaktiverat fält" model-value="Kan inte ändras" disabled />
          </div>
        </BuildShowcase>

        <BuildShowcase v-bind="ui.messages">
          <div class="grid max-w-narrow gap-6 sm:grid-cols-2">
            <UiInput label="Fält med hjälptext" hint="Fyll i om du hellre vill bli uppringd." type="tel" />
            <UiInput
              v-model="demoForm.invalidEmail"
              label="Fält med fel"
              type="email"
              error="Ange en giltig e-postadress, till exempel namn@forening.se."
            />
          </div>
          <div class="max-w-narrow space-y-4">
            <UiAlert title="Information">
              Neutralt meddelande, t.ex. att innehållet är exempel.
            </UiAlert>
            <UiAlert tone="success" title="Bekräftelse">
              Formuläret är korrekt ifyllt. Detta är en demonstration och inget har skickats.
            </UiAlert>
            <UiAlert tone="error" title="Formuläret kunde inte skickas">
              Kontrollera de markerade fälten och försök igen.
            </UiAlert>
          </div>
        </BuildShowcase>

        <BuildShowcase v-bind="ui.cards">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <UiCard
              title="Med bild och länk"
              :image="content.images.entrance"
              :link="{ label: 'Fråga om porttelefoni', href: content.anchors.contact }"
            >
              Används för tjänster. Bilden beskärs till 3:2.
            </UiCard>
            <UiCard
              title="Med etikett och metatext"
              :image="content.images.stairwell"
              badge="Exempelprojekt"
              meta="Exempelort · Renovering"
            >
              Används för referensprojekt.
            </UiCard>
            <UiCard title="Utan bild">
              Ett enklare kort för kortare punkter eller när bild saknas.
            </UiCard>
          </div>
        </BuildShowcase>

        <BuildShowcase v-bind="ui.layout" bleed>
          <UiSection v-for="background in (['default', 'subtle', 'dark'] as const)" :key="background" :background="background" spacing="compact">
            <div class="rounded-card border border-dashed border-line-strong p-6">
              <p class="font-semibold">
                UiSection background="{{ background }}"
              </p>
              <p class="text-ink-muted">
                Den streckade rutan visar UiContainers innehållsbredd (max-w-content).
              </p>
            </div>
          </UiSection>
          <UiSection background="subtle" spacing="compact" width="narrow">
            <div class="rounded-card border border-dashed border-line-strong p-6">
              <p class="font-semibold">
                width="narrow"
              </p>
              <p class="text-ink-muted">
                Smalare container för text och formulär (max-w-narrow).
              </p>
            </div>
          </UiSection>
        </BuildShowcase>

        <!-- Sidsektioner -->

        <BuildShowcase v-bind="sections.header" bleed>
          <SiteHeader :nav-items="content.navItems" :contact-link="content.contactLink" :logo-href="content.anchors.header" />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.mobileMenu">
          <div class="mx-auto max-w-sm overflow-hidden rounded-card border border-line">
            <SiteHeader :nav-items="content.navItems" :contact-link="content.contactLink" :logo-href="content.anchors.header" />
            <div class="space-y-2 bg-subtle p-6 text-sm text-ink-muted">
              <p>Smal ram som motsvarar en mobilskärm.</p>
              <p>Klicka på Meny eller använd Tab, Enter och Escape.</p>
            </div>
          </div>
        </BuildShowcase>

        <BuildShowcase v-bind="sections.hero" bleed>
          <HeroSection v-bind="content.hero" :heading-level="3" />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.heroCompact" bleed>
          <HeroCompactSection v-bind="content.heroCompact" :heading-level="3" />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.intro" bleed>
          <IntroSection
            :eyebrow="content.intro.eyebrow"
            :title="content.intro.title"
            :image="content.intro.image"
            :action="content.intro.action"
            :heading-level="3"
          >
            <p v-for="paragraph in content.intro.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </IntroSection>
        </BuildShowcase>

        <BuildShowcase v-bind="sections.services" bleed>
          <ServicesSection
            id="tjanster"
            :eyebrow="content.services.eyebrow"
            :title="content.services.title"
            :lead="content.services.lead"
            :services="content.services.items"
            :heading-level="3"
          />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.benefits" bleed>
          <BenefitsSection
            :eyebrow="content.benefits.eyebrow"
            :title="content.benefits.title"
            :lead="content.benefits.lead"
            :benefits="content.benefits.items"
            :heading-level="3"
          />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.process" bleed>
          <ProcessSection
            id="process"
            :eyebrow="content.process.eyebrow"
            :title="content.process.title"
            :lead="content.process.lead"
            :steps="content.process.steps"
            :heading-level="3"
          />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.references" bleed>
          <ReferencesSection
            id="referenser"
            :eyebrow="content.references.eyebrow"
            :title="content.references.title"
            :note="content.references.note"
            :projects="content.references.items"
            :heading-level="3"
          />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.faq" bleed>
          <FaqSection
            id="faq"
            :eyebrow="content.faq.eyebrow"
            :title="content.faq.title"
            :lead="content.faq.lead"
            :items="content.faq.items"
            :heading-level="3"
          />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.contact" bleed>
          <ContactSection
            id="kontakt"
            v-bind="content.contact"
            :contact-details="content.contactDetails"
            :heading-level="3"
          />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.cta" bleed>
          <CtaSection v-bind="content.cta" :heading-level="3" />
        </BuildShowcase>

        <BuildShowcase v-bind="sections.footer" bleed>
          <SiteFooter
            v-bind="content.footer"
            :nav-items="content.navItems"
            :contact-details="content.contactDetails"
            :logo-href="content.anchors.header"
            :heading-level="3"
          />
        </BuildShowcase>
      </main>
    </div>
  </div>
</template>
