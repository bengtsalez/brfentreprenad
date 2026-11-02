<script setup lang="ts">
import { inquiryFlows } from '~/content/inquiry'
import type { ContactDetail, InquiryFlow } from '~/types/content'
import type { HeadingLevel, SectionBackground } from '~/types/ui'

/**
 * Förfrågningssektion: rubrik, direktkontakt och formulär.
 * Sektionen har id "forfragan" så att knappar på samma sida kan länka hit,
 * och mobilens kontaktlist döljs när den syns.
 */
const props = withDefaults(defineProps<{
  title: string
  contactDetails: ContactDetail[]
  eyebrow?: string
  lead?: string
  /** Låser formulärets flöde. Utan det väljer besökaren. */
  flow?: InquiryFlow
  /** Förvald tjänst i formuläret. */
  service?: string
  /** Läs och skriv valet i URL:en (används på kontaktsidan). */
  syncUrl?: boolean
  /** Visar formuläret utan att skicka något (byggsidan). */
  demo?: boolean
  /** Valfri anmärkning under kontaktuppgifterna, t.ex. att de är exempel. */
  contactNote?: string
  background?: SectionBackground
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  flow: undefined,
  service: undefined,
  syncUrl: false,
  demo: false,
  contactNote: undefined,
  background: 'subtle',
  headingLevel: 2,
})

const nextSteps = computed(() => (props.flow ? inquiryFlows[props.flow].nextSteps : undefined))
const subHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection id="forfragan" :background="background" data-inquiry-section>
    <div class="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
      <div class="space-y-8">
        <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />

        <div v-if="nextSteps" class="space-y-4 border-t border-line pt-6">
          <UiHeading :level="subHeadingLevel" size="xs">
            När ni har skickat förfrågan
          </UiHeading>
          <ol role="list" class="space-y-3 text-ink-muted">
            <li v-for="(step, index) in nextSteps" :key="step" class="flex gap-3">
              <span class="font-heading font-semibold text-accent" aria-hidden="true">{{ index + 1 }}.</span>
              <span>{{ step }}</span>
            </li>
          </ol>
        </div>

        <div class="space-y-4 border-t border-line pt-6">
          <UiHeading :level="subHeadingLevel" size="xs">
            Hellre direktkontakt?
          </UiHeading>
          <dl class="space-y-4" :data-track-flow="flow" :data-track-service="service">
            <div v-for="detail in contactDetails" :key="detail.label">
              <dt class="text-sm text-ink-muted">
                {{ detail.label }}
              </dt>
              <dd class="font-semibold">
                <a v-if="detail.href" :href="detail.href" class="text-link inline-flex min-h-11 items-center">{{ detail.value }}</a>
                <template v-else>
                  {{ detail.value }}
                </template>
              </dd>
            </div>
          </dl>
        </div>
        <UiBadge v-if="contactNote" variant="outline">
          {{ contactNote }}
        </UiBadge>
        <slot />
      </div>
      <div class="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
        <ContactForm :flow="flow" :service="service" :sync-url="syncUrl" :demo="demo" />
      </div>
    </div>
  </UiSection>
</template>
