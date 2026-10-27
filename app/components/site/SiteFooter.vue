<script setup lang="ts">
import type { ContactDetail, LinkItem } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

withDefaults(defineProps<{
  description: string
  navItems: LinkItem[]
  contactDetails: ContactDetail[]
  legal: string
  /** Valfri anmärkning under kontaktuppgifterna, t.ex. att de är exempel. */
  contactNote?: string
  logoHref?: string
  headingLevel?: HeadingLevel
}>(), {
  contactNote: undefined,
  logoHref: undefined,
  headingLevel: 2,
})
</script>

<template>
  <footer class="theme-dark bg-canvas text-ink">
    <UiContainer class="grid gap-10 py-section-compact md:grid-cols-[2fr_1fr_1fr]">
      <div class="max-w-sm space-y-4">
        <SiteLogo :href="logoHref" />
        <p class="text-ink-muted">
          {{ description }}
        </p>
      </div>

      <nav aria-label="Sidfot">
        <UiHeading :level="headingLevel" size="xs" class="mb-4">
          Genvägar
        </UiHeading>
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.href">
            <a :href="item.href" class="text-ink-muted hover:text-ink hover:underline">{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <div>
        <UiHeading :level="headingLevel" size="xs" class="mb-4">
          Kontakt
        </UiHeading>
        <dl class="space-y-3">
          <div v-for="detail in contactDetails" :key="detail.label">
            <dt class="text-sm text-ink-muted">
              {{ detail.label }}
            </dt>
            <dd>
              <a v-if="detail.href" :href="detail.href" class="text-link">{{ detail.value }}</a>
              <template v-else>
                {{ detail.value }}
              </template>
            </dd>
          </div>
        </dl>
        <p v-if="contactNote" class="mt-4 text-sm text-ink-muted">
          {{ contactNote }}
        </p>
      </div>
    </UiContainer>

    <div class="border-t border-line">
      <UiContainer class="py-6 text-sm text-ink-muted">
        {{ legal }}
      </UiContainer>
    </div>
  </footer>
</template>
