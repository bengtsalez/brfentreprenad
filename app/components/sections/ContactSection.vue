<script setup lang="ts">
import type { ContactDetail, SelectOption } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

withDefaults(defineProps<{
  title: string
  contactDetails: ContactDetail[]
  subjectOptions: SelectOption[]
  eyebrow?: string
  lead?: string
  /** Valfri anmärkning under kontaktuppgifterna, t.ex. att de är exempel. */
  contactNote?: string
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  contactNote: undefined,
  headingLevel: 2,
})
</script>

<template>
  <UiSection background="subtle">
    <div class="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
      <div class="space-y-8">
        <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
        <dl class="space-y-4 border-t border-line pt-6">
          <div v-for="detail in contactDetails" :key="detail.label">
            <dt class="text-sm text-ink-muted">
              {{ detail.label }}
            </dt>
            <dd class="font-semibold">
              <a v-if="detail.href" :href="detail.href" class="text-link">{{ detail.value }}</a>
              <template v-else>
                {{ detail.value }}
              </template>
            </dd>
          </div>
        </dl>
        <UiBadge v-if="contactNote" variant="outline">
          {{ contactNote }}
        </UiBadge>
      </div>
      <div class="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
        <ContactForm :subject-options="subjectOptions" />
      </div>
    </div>
  </UiSection>
</template>
