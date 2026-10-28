<script setup lang="ts">
import type { LinkItem, ProcessStep, StatusExample } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

/**
 * Presentation av bokningstjänsten: steg till vänster och en illustration
 * av ärendestatus till höger. Illustrationen är märkt som exempel.
 */
const props = withDefaults(defineProps<{
  title: string
  steps: ProcessStep[]
  statusExamples: StatusExample[]
  statusCaption: string
  eyebrow?: string
  lead?: string
  action?: LinkItem
  secondaryAction?: LinkItem
  /** Kort text under knapparna, t.ex. om bokningstjänsten ännu inte är länkad. */
  note?: string
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  action: undefined,
  secondaryAction: undefined,
  note: undefined,
  headingLevel: 2,
})

const stepHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))

/*
 * När illustrationen scrollas in i bild spelas en statusuppdatering upp en
 * gång: exempel med previousStatus tonar in med den gamla statusen och byter
 * sedan till den nya. Sluttillståndet är detsamma som den förrenderade HTML:en.
 * Raden har kvar sin plats under tiden, så inget innehåll flyttas.
 */
const figure = useTemplateRef<HTMLElement>('figure')
const demoPhase = ref<'waiting' | 'previous' | 'done'>('done')
let observer: IntersectionObserver | undefined
const timers: ReturnType<typeof setTimeout>[] = []

function displayedStatus(example: StatusExample) {
  return example.previousStatus && demoPhase.value !== 'done' ? example.previousStatus : example.status
}

onMounted(() => {
  if (!figure.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Redan i bild vid laddning: visa sluttillståndet direkt.
  if (figure.value.getBoundingClientRect().top < window.innerHeight) return
  demoPhase.value = 'waiting'
  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    observer?.disconnect()
    timers.push(setTimeout(() => (demoPhase.value = 'previous'), 300))
    timers.push(setTimeout(() => (demoPhase.value = 'done'), 2300))
  }, { threshold: 0.6 })
  observer.observe(figure.value)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  timers.forEach(clearTimeout)
})
</script>

<template>
  <UiSection background="subtle">
    <div class="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div class="space-y-8">
        <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
        <ol role="list" class="space-y-6">
          <li v-for="(step, index) in steps" :key="step.title" class="flex gap-4">
            <span
              class="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-heading font-semibold text-on-accent"
              aria-hidden="true"
            >
              {{ index + 1 }}
            </span>
            <div class="space-y-1">
              <UiHeading :level="stepHeadingLevel" size="xs">
                <span class="sr-only">Steg {{ index + 1 }}: </span>{{ step.title }}
              </UiHeading>
              <p class="text-ink-muted">
                {{ step.description }}
              </p>
            </div>
          </li>
        </ol>
        <div v-if="action || secondaryAction" class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <UiButton v-if="action" :href="action.href">
            {{ action.label }}
          </UiButton>
          <UiButton v-if="secondaryAction" :href="secondaryAction.href" variant="secondary">
            {{ secondaryAction.label }}
          </UiButton>
        </div>
        <p v-if="note" class="max-w-prose text-sm text-ink-muted">
          {{ note }}
        </p>
      </div>

      <figure ref="figure" class="reveal rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
        <p class="eyebrow mb-4" aria-hidden="true">
          Mina ärenden
        </p>
        <ul class="divide-y divide-line border-y border-line">
          <li
            v-for="example in statusExamples"
            :key="example.work"
            class="flex flex-col gap-2 py-4 transition-[opacity,translate] duration-500 ease-premium sm:flex-row sm:items-center sm:justify-between"
            :class="example.previousStatus && demoPhase === 'waiting' && 'translate-y-2 opacity-0'"
          >
            <span class="flex items-center gap-2.5 font-semibold">
              <span v-if="example.previousStatus" class="relative flex size-2" aria-hidden="true">
                <span v-if="demoPhase === 'previous'" class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span class="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {{ example.work }}
            </span>
            <!-- Skärmläsare får sluttillståndet, den synliga badgen kan byta text. -->
            <span class="sr-only">{{ example.status }}</span>
            <Transition
              mode="out-in"
              enter-active-class="transition-[opacity,translate] duration-200 ease-premium"
              leave-active-class="transition-[opacity,translate] duration-200 ease-premium"
              enter-from-class="translate-y-1 opacity-0"
              leave-to-class="-translate-y-1 opacity-0"
            >
              <UiBadge :key="displayedStatus(example)" variant="accent" aria-hidden="true">
                {{ displayedStatus(example) }}
              </UiBadge>
            </Transition>
          </li>
        </ul>
        <figcaption class="mt-4 text-sm text-ink-muted">
          {{ statusCaption }}
        </figcaption>
      </figure>
    </div>
  </UiSection>
</template>
