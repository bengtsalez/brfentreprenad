<script setup lang="ts">
import type { ProcessStep } from '~/types/content'
import type { HeadingLevel } from '~/types/ui'

const props = withDefaults(defineProps<{
  title: string
  steps: ProcessStep[]
  eyebrow?: string
  lead?: string
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  headingLevel: 2,
})

const stepHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
const columnClass = computed(() => (props.steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'))

/*
 * Varje steg tonar in och linjen fylls när steget syns. Starttillståndet sätts
 * först när JS körs (isAnimated), så förrenderad HTML visar allt direkt.
 * På lg visas stegen på en rad och fylls i tur och ordning.
 */
const list = useTemplateRef<HTMLOListElement>('list')
const isAnimated = ref(false)
const visibleSteps = ref<boolean[]>([])
let observer: IntersectionObserver | undefined

function isHidden(index: number) {
  return isAnimated.value && !visibleSteps.value[index]
}

onMounted(() => {
  if (!list.value) return
  isAnimated.value = true
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      visibleSteps.value[Number((entry.target as HTMLElement).dataset.step)] = true
      observer?.unobserve(entry.target)
    }
  }, { threshold: 0.6 })
  for (const item of list.value.children) observer.observe(item)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <UiSection>
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <!-- role="list" behåller listsemantiken i Safari när list-style tas bort. -->
    <ol ref="list" role="list" class="mt-12 grid gap-8 md:grid-cols-2" :class="columnClass">
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        :data-step="index"
        :style="{ '--step': index }"
        class="space-y-3"
      >
        <div class="flex items-center gap-4">
          <span
            class="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-accent font-heading text-lg font-semibold text-accent motion-safe:transition-[opacity,scale] motion-safe:duration-500 motion-safe:ease-premium lg:delay-[calc(var(--step)*200ms)]"
            :class="isHidden(index) && 'motion-safe:scale-90 motion-safe:opacity-0'"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <span class="relative h-px flex-1 bg-line" aria-hidden="true">
            <span
              class="absolute inset-0 origin-left bg-accent motion-safe:transition-[scale] motion-safe:duration-700 motion-safe:ease-premium delay-150 lg:delay-[calc(var(--step)*200ms_+_150ms)]"
              :class="isHidden(index) && 'motion-safe:scale-x-0'"
            />
          </span>
        </div>
        <UiHeading :level="stepHeadingLevel" size="sm">
          <span class="sr-only">Steg {{ index + 1 }}: </span>{{ step.title }}
        </UiHeading>
        <p class="text-ink-muted">
          {{ step.description }}
        </p>
      </li>
    </ol>
  </UiSection>
</template>
