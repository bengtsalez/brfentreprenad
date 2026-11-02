<script setup lang="ts">
import type { ContactDetail } from '~/types/content'

/**
 * Kort rad med verifierbara uppgifter direkt under heron, t.ex. kontor,
 * telefon och verksamhetsområde. Använd bara bekräftade uppgifter.
 */
defineProps<{
  items: ContactDetail[]
  /** Etikett för skärmläsare. */
  label?: string
}>()
</script>

<template>
  <section :aria-label="label ?? 'Om företaget'" class="border-b border-line bg-canvas text-ink">
    <UiContainer>
      <dl class="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        <div v-for="item in items" :key="item.label" class="py-5 sm:py-6 lg:px-6 lg:first:pl-0">
          <dt class="text-sm text-ink-muted">
            {{ item.label }}
          </dt>
          <dd class="font-heading text-lg font-semibold">
            <a v-if="item.href" :href="item.href" class="-my-3 inline-block py-3 hover:text-accent hover:underline">{{ item.value }}</a>
            <template v-else>
              {{ item.value }}
            </template>
          </dd>
        </div>
      </dl>
    </UiContainer>
  </section>
</template>
