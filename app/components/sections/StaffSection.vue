<script setup lang="ts">
import type { StaffMember } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

const props = withDefaults(defineProps<{
  title: string
  members: StaffMember[]
  eyebrow?: string
  lead?: string
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  headingLevel: 2,
})

const cardHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))

/** "070-123 45 67" blir "tel:+46701234567". */
function phoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '')
  return `tel:${digits.startsWith('0') ? `+46${digits.slice(1)}` : digits}`
}

function initials(name: string) {
  return name.split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase()
}
</script>

<template>
  <UiSection>
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="member in members" :key="member.name" class="reveal">
        <article class="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card">
          <div v-if="member.image" class="overflow-hidden">
            <img
              :src="member.image.src"
              :alt="member.image.alt"
              :width="member.image.width"
              :height="member.image.height"
              loading="lazy"
              class="aspect-square w-full object-cover motion-safe:transition-[scale] motion-safe:duration-500 motion-safe:ease-premium motion-safe:group-hover:scale-[1.03]"
            >
          </div>
          <div v-else class="flex aspect-square w-full items-center justify-center bg-subtle" aria-hidden="true">
            <span class="heading-lg text-ink-muted">{{ initials(member.name) }}</span>
          </div>
          <div class="flex flex-1 flex-col gap-1 p-6">
            <UiHeading :level="cardHeadingLevel" size="sm">
              {{ member.name }}
            </UiHeading>
            <p class="text-ink-muted">
              {{ member.title }}
            </p>
            <dl v-if="member.phone || member.email" class="mt-4 space-y-1">
              <div v-if="member.phone">
                <dt class="sr-only">
                  Telefon
                </dt>
                <dd>
                  <a :href="phoneHref(member.phone)" class="text-link font-semibold">{{ member.phone }}</a>
                </dd>
              </div>
              <div v-if="member.email">
                <dt class="sr-only">
                  E-post
                </dt>
                <dd>
                  <a :href="`mailto:${member.email}`" class="text-link font-semibold break-all">{{ member.email }}</a>
                </dd>
              </div>
            </dl>
          </div>
        </article>
      </li>
    </ul>
  </UiSection>
</template>
